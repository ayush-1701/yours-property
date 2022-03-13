    //  implemented by Shubham
const fire=require("../firebaseAws") 
    exports.signup=(req,res)=>{
        let { name, email, password,confirmpassword, number, tac,seller} = req.body;
        // console.log(req.body)
        if (name.length < 3) {
            return res.json({ 'alert': 'name must be 3 letters long' });
        } else if (!email.length) {
            return res.json({ 'alert': 'enter your email' });
        }
        else if (ValidateEmail(email)) {
            res.json({'alert':'You have entered an invalid email address!'});
        }
        else if (password.length < 8) {
            return res.json({ 'alert': 'password should be 8 letters long' });
        }
         else if (confirmpassword.length < 8) {
            return res.json({ 'alert': 'Confirm password should be 8 letters long' });
        }
         else if (password!=confirmpassword) {
            return res.json({ 'alert': 'password and confirm password should be same' });
        }
        else if (!number.length) {
            return res.json({ 'alert': 'enter your phone number' });
        } else if (!Number(number) || number.length < 10) {
            return res.json({ 'alert': 'invalid number, please enter valid one' });
        } else if (!tac) {
            return res.json({ 'alert': 'you must agree to our terms and conditions' });
        }
        else{
            fire.auth.createUserWithEmailAndPassword(fire.auth.getAuth(),email,password).then(
                (e)=>{
                    
                    fire.db.collection('users').doc(email).set({
                        name:req.body.name,
                        email: req.body.email,
                        isSeller:req.body.seller,
                        isAdmin:false,
                        isSubscribe:false,
                        mobile:req.body.number
                    }).then(value=>{
                                e.user.getIdToken().then(data=>{
                res.json({
                email: req.body.email,
                seller: req.body.seller,
                admin:false,
                authToken:data.toString(),
                isSubscribe:false,

            })
            })
                        })
                 
                }
            ).catch((e)=>{
                return res.json({'alert':e.message})
            })
        }
    }
    exports.login=(req,res)=>{
        let { email, password } = req.body;
    if (!email.length || !password.length) {
        return res.json({ 'alert': 'fill all the inputs' });
    }
    else if (ValidateEmail(email)) {
        return res.json({ 'alert': 'You have entered an invalid email address!' });
    }
    else{
        fire.auth.signInWithEmailAndPassword(fire.auth.getAuth(),email,password).then((e)=>{
            fire.db.collection('users').doc(email).get().then(user=>{
                e.user.getIdToken().then(data=>{
                res.json({
                email:email,
                authToken:data.toString(),
                isAdmin:user.data().isAdmin,
                isSeller:user.data().isSeller,
                isSubscribe:user.data().isSubscribe,
            })
            })
            })
            
        }).catch((e)=>{
            return res.json({'alert':e.message})
        })
    }

    }

    function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
        return false;
    }
    else {
        return true;
    }
}