
import { store, addActivity } from '../../utils/fake-db';
export default function handler(req,res){
  if(req.method==='POST'){
    const { item } = req.body;
    store.orders.push({ id: store.orders.length+1, item, created_at: Date.now() });
    addActivity({ user: (item && item.title) ? item.title : 'public', role: 'Public', action: 'Placed order: ' + (item.title || 'unknown') });
    return res.json({ ok:true });
  }
  res.json({ orders: store.orders });
}
