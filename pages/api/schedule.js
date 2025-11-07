
import { store, addActivity } from '../../utils/fake-db';
export default function handler(req,res){
  if(req.method==='POST'){
    const b = req.body;
    store.maintenance.push({ id: store.maintenance.length+1, ...b, created_at: Date.now() });
    addActivity({ user: b.email, role: 'Public', action: 'Scheduled maintenance' });
    return res.json({ ok:true });
  }
  res.json({ maintenance: store.maintenance });
}
