    //  implemented by Shubham
    const db=require('../firebaseAws').db
    exports.getProperty=(req,res) => {
    let {email,id,all}=req.body;
    let docRef ;
   if(id){
      docRef= db.collection('properties').doc(id)
   }else if(all){
    docRef=db.collection('properties').where('draft','==',false);
   }
   else{
    docRef=db.collection('properties').where('email','==',email);
   }
    docRef.get().then(property => {
        if(property.empty){
            return res.json('no property');
        }
        let propertyArr=[];
        if(id){
            return res.json(property.data());
        }
        else{property.forEach(item=>{
            let data=item.data(); 
            data.id = item.id;
            propertyArr.push(data);
        })
         res.json(propertyArr);
    // console.log(propertyArr[0])
}
    })
}
 exports.contactedproperties=(req,res) => {
    let {email}=req.body;
    let docRef ;
    docRef=db.collection('contactedproperties').doc(email);
    docRef.get().then(property => {
        if(property.data()==undefined){
            
            return res.json('no property');
        }
      
         res.json(property.data());

    })
}