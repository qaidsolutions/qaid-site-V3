
import { store, addActivity } from '../../utils/fake-db';
const forbidden = ['tobacco','cigarette','alcohol','beer','wine'];
export default function handler(req,res){
  if(req.method==='POST'){
    const { company, content, email } = req.body;
    const low = content.toLowerCase();
    for(const f of forbidden) if(low.includes(f)) return res.json({ ok:false, reason: 'Forbidden content' });
    store.ads.push({ id: store.ads.length+1, company, content, email, created_at: Date.now(), status: 'pending' });
    addActivity({ user: email, role: 'Public', action: 'Submitted ad' });
    return res.json({ ok:true });
  }
  res.json({ ads: store.ads });
}
