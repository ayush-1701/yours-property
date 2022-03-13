//  implemented by Shubham
const fire=require("../firebaseAws") 

exports.profile=(req, res) => {
   let {email,name,number,edit,isSubscribe} =req.body
   if(edit){
       if(isSubscribe){
        fire.db.collection('users').doc(email).update({
                isSubscribe:isSubscribe
            }).then(data=>{
                res.json({'name':name,'isSubscribe':isSubscribe})
            })
       }
       else{
       if (name.length < 3) {
            return res.json({ 'alert': 'name must be 3 letters long' });
        }else if (!number.length) {
            return res.json({ 'alert': 'enter your phone number' });
        } else if (!Number(number) || number.length < 10) {
            return res.json({ 'alert': 'invalid number, please enter valid one' });
        }
        else{
    fire.db.collection('users').doc(email).update({
                name:name,
                mobile:number
            }).then(data=>{
                res.json({'name':name})
            })
        }
    }
   }
   else
   {fire.db.collection('users').doc(email).get().then(data=>{
     res.json(data.data());
   })}
}