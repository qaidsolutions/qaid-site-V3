
import { store, addActivity } from '../../utils/fake-db';
export default function handler(req,res){
  if(req.method!=='POST') return res.json({ contacts: store.contacts });
  const { name, email, message } = req.body;
  store.contacts.push({ id: store.contacts.length+1, name, email, message, created_at: Date.now() });
  addActivity({ user: email, role: 'Public', action: 'Contact form' });
  return res.json({ ok:true });
}
