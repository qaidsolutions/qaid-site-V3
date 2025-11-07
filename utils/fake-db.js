
const store = {
  users:[
    {id:1,username:'manager',password:'qaid123',role:'Manager',name:'Praket'},
    {id:2,username:'moderator',password:'qaid123',role:'Moderator',name:'Abhiram'},
    {id:3,username:'editor',password:'qaid123',role:'Editor',name:'Aryan'}
  ],
  activity:[], orders:[], maintenance:[], insurance:[], ads:[], contacts:[], kiosks:[]
};
function addActivity(entry){ store.activity.push({ id: store.activity.length+1, ts: Date.now(), ...entry }); }
module.exports = { store, addActivity };
