
import { store, addActivity } from '../../utils/fake-db';
export default function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const { username, password } = req.body;
  const user = store.users.find(u=>u.username===username && u.password===password);
  if(!user) return res.status(401).json({ ok:false, message:'Invalid credentials' });
  addActivity({ user: user.username, role: user.role, action: 'Logged in' });
  res.json({ ok:true, user:{ username:user.username, role:user.role, name:user.name } });
}
