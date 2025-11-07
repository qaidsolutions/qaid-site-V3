
import { store, addActivity } from '../../utils/fake-db';
export default function handler(req,res){
  if(req.method==='POST'){
    const { plan } = req.body;
    store.insurance.push({ id: store.insurance.length+1, plan, created_at: Date.now() });
    addActivity({ user: 'public', role: 'Public', action: 'Insurance purchase: ' + (plan.title || 'unknown') });
    return res.json({ ok:true });
  }
  res.json({ insurance: store.insurance });
}
