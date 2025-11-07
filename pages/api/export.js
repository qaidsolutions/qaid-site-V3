
import { store, addActivity } from '../../utils/fake-db';

function toCsv(rows) {
  if (!rows || rows.length === 0) return '';
  const keys = Array.from(new Set(rows.flatMap(r => Object.keys(r))));
  const escape = v => {
    if (v === null || v === undefined) return '';
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = keys.join(',');
  const body = rows.map(r => keys.map(k => escape(r[k] ?? '')).join(',')).join('\n');
  return header + '\n' + body;
}

export default function handler(req, res) {
  const { type, start, end, user } = req.query;
  if (!type) return res.status(400).json({ ok: false, message: 'Missing type' });

  const map = {
    orders: store.orders,
    contacts: store.contacts,
    maintenance: store.maintenance,
    insurance: store.insurance,
    ads: store.ads,
    activity: store.activity,
    kiosks: store.kiosks || []
  };

  const rows = map[type];
  if (!rows) return res.status(400).json({ ok: false, message: 'Unknown type' });

  // filter by date range if provided (expects ISO date strings yyyy-mm-dd)
  let filtered = rows;
  if (start || end) {
    const s = start ? new Date(start).getTime() : -8640000000000000;
    const e = end ? new Date(end).getTime() + 24*60*60*1000 - 1 : 8640000000000000;
    filtered = rows.filter(r => {
      const t = r.created_at || r.ts || 0;
      return t >= s && t <= e;
    });
  }

  const normalized = filtered.map(r => {
    const copy = { ...r };
    if (copy.created_at) copy.created_at = new Date(copy.created_at).toISOString();
    if (copy.ts) copy.ts = new Date(copy.ts).toISOString();
    return copy;
  });

  // log export action (if user provided, else anonymous)
  addActivity({ user: user || 'manager', role: 'Manager', action: `Exported ${type} (${normalized.length} rows)` });

  const csv = toCsv(normalized);
  const filename = `qaid-${type}-${new Date().toISOString().slice(0,10)}.csv`;

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.status(200).send(csv);
}
