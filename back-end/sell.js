//  implemented by Shubham

const fire=require("../firebaseAws") 
exports.sell=(req,res)=>{
    // console.log(req.body)
    let { name,
        address,
        city,
        zipCode,
        type,
        carpetArea,
        builtUpArea,
        sellPrice,
        des,
        email,
        isSeller,
    draft,id} = req.body;//geting data from post method

    // validation
        if(!draft){
          if (!name.length) {
        return res.json({'alert':'enter product name'});
    }else if (!address.length) {
        return res.json({'alert':'Please Enter Property Address'});
    }else if (!city.length) {
        return res.json({'alert':'Please Enter City'});
    }
    else if (!zipCode.length) {
        return res.json({'alert':'Please Enter Zip Code'});
    } else if (!type.length) { // apartment type
        return res.json({'alert':'Please Select Apartment Type'});
    }  else if (!builtUpArea.length) { // Build Up Area
        return res.json({'alert':'Please Enter Build Up Area'});
    }
     else if (!carpetArea.length) { // apartment type
        return res.json({'alert':'Please Enter Carpet Area'});
    }
    else if (!des.length) {
        return res.json({'alert':'Enter Detail description about the property'});
    }else if (!sellPrice.length) {
        return res.json({'alert':'Please Enter Price'});
    } 
    else if (des.length > 400 || des.length < 10) {
        return res.json({'alert':'Detail description must be between 10 to 400 letters long'});
    } 
        }
    // sell property
    let docName = id == undefined?`${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}`:id;
   fire.db.collection('properties').doc(docName).set(req.body)
    .then(data => {
        if(!isSeller){
            fire.db.collection('users').doc(email).update({
            isSeller:true
            }).then(data=>{
            })
        res.json({'property': name,'isSeller':true});
        }
        else
        res.json({'property': name});
    })
    .catch(err => {
        return res.json({'alert': 'some error occurred. Try again'});
    })

}
exports.rent=(req,res)=>{
    let { name,
        address,
        city,
        zipCode,
        type,
        imageUrls,
        carpetArea,
        builtUpArea,
        downPayment,
        monthly,
        des,
        email,
        isSeller,
    draft} = req.body;
         if(!draft){
          if (!name.length) {
        return res.json({'alert':'enter product name'});
    }else if (!address.length) {
        return res.json({'alert':'Please Enter Property Address'});
    }else if (!city.length) {
        return res.json({'alert':'Please Enter City'});
    }
    else if (!zipCode.length) {
        return res.json({'alert':'Please Enter Zip Code'});
    } 
    else if(!imageUrls.length){
        return res.json({'alert':'Please Enter Images'})
    }
    else if (!type.length) { // apartment type
        return res.json({'alert':'Please Select Apartment Type'});
    }  else if (!builtUpArea.length) { // Build Up Area
        return res.json({'alert':'Please Enter Build Up Area'});
    }
     else if (!carpetArea.length) { // apartment type
        return res.json({'alert':'Please Enter Carpet Area'});
    }
    else if (!des.length) {
        return res.json({'alert':'Enter Detail description about the property'});
    }else if (!downPayment.length) {
        return res.json({'alert':'Please Enter Down Payment'});
    } else if (!monthly.length) {
        return res.json({'alert':'Please Enter Monthly Payment'});
    } 
    else if (des.length > 400 || des.length < 10) {
        return res.json({'alert':'Detail description must be between 10 to 400 letters long'});
    } 
        }
    // rent property
    let docName =  `${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}`;
    
   fire.db.collection('rent').doc(docName).set(req.body).then(data => {
        if(!isSeller){
            fire.db.collection('users').doc(email).update({
            isSeller:true
            }).then(data=>{
            })
        res.json({'property': name,'isSeller':true});
        }
        else
        res.json({'property': name});
    })
    .catch(err => {
        return res.json({'alert': 'some error occurred. Try again'});
    })
}