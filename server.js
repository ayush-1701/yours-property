// importing packages
const express = require("express");
const fire=require("./firebaseAws");
const signupLogin=require("./back-end/login_register") 
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const path = require("path");
const sellHelp=require('./back-end/sell');
const { getProperty, contactedproperties } = require("./back-end/buy");
const { profile } = require("./back-end/profile");
const { nodeMailer } = require("./back-end/mail");
const { imageUrl } = require("./back-end/imageUrl");
// declare static path
let staticPath = path.join(__dirname, "public");

// initializing express.js
const app = express();

// middlewares
app.use(express.json())
app.use(express.static(staticPath));
// routes
// home route
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "home.html"));
});

// buy route
app.get("/buy", (req, res) => {
    res.sendFile(path.join(staticPath, "buy.html"));
});

// sell route
app.get("/sell", (req, res) => {
    res.sendFile(path.join(staticPath, "sell.html"));
});
app.get("/sell/:id", (req, res) => {
    res.sendFile(path.join(staticPath, "sell.html"));
});
app.post("/sell",sellHelp.sell);
//single property
app.get("/single-property/:id", (req, res) => {
  res.sendFile(path.join(staticPath, "single-property.html"));
});
// rent route
app.get("/rent", (req, res) => {
  res.sendFile(path.join(staticPath, "rent.html"));
});
app.post("/rent",sellHelp.rent);

// login route
app.get("/login", (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
});
app.post("/login",signupLogin.login);

// signup route
app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
});
app.post("/signup",signupLogin.signup);

// adminlogin route
app.get("/adminlogin", (req, res) => {
    res.sendFile(path.join(staticPath, "adminlogin.html"));
});

// profile route
app.get("/profile", (req, res) => {
    res.sendFile(path.join(staticPath, "profile.html"));
});
app.post("/profile", profile);
app.post("/contactedprofile",contactedproperties);
// adminlogin route
app.get("/adminprofile", (req, res) => {
    res.sendFile(path.join(staticPath, "adminprofile.html"));
});
// get property data
app.post('/get-property',getProperty);
//logout
app.post('/logout',(req,res)=>{
  let {logout}=req.body
    if(logout){fire.auth.signOut(fire.auth.getAuth()).then(e=>{
      res.json({'success':true})
    }).catch(e=>{
      res.json({'alert':'error occured while logout'})
    })}
  
})
// get-imageUrl
app.get('/get-imageurl', imageUrl)
//delete property
app.post('/delete-property',(req,res)=>{
    let {id} =req.body;
    // console.log(id);
    fire.db.collection('properties').doc(id).delete().then(data =>{
        res.json('success');
    }).catch(err=>{
        res.json('err')
    })
})
app.get('/subscribeUser',(req,res)=>{
  res.sendFile(path.join(staticPath, "subscribe.html"))
})
// Feedback-form
app.post('/feedbackUserform',nodeMailer)
// forget Pass
app.post('/forgotUserPass',(req,res)=>{
  fire.auth.sendPasswordResetEmail(fire.auth.getAuth(),req.body.email).then(data=>{
    res.json({'alert':'Email Sent'})
  }).catch(e=>{
    res.json({'alert':'Some Error Occured'})

  })
})
// contact-property
app.post('/contact-property',(req,res)=>{
  let {email,id,selfEmail}=req.body;

  fire.db.collection('properties').doc(id).get().then(prop=>{
    data={}
    let item=prop.data()
    item.id=prop.id
    data[prop.id]=item
fire.db.collection('contactedproperties').doc(selfEmail).get().then(t=>{
  if(!t.exists){
    fire.db.collection('contactedproperties').doc(selfEmail).set(data).then(k=>{
      fire.db.collection('users').doc(email).get().then(data=>{
  res.json(data.data());
});
    })
  }
  else{
    fire.db.collection('contactedproperties').doc(selfEmail).update(data).then(k=>{
      fire.db.collection('users').doc(email).get().then(data=>{
  res.json(data.data());
});
    })
  }


})

  })
})
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.post("/user-profile", urlencodedParser, async (req, res) => {
  // console.log(req.body.name);
  const addata = {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    isSeller: req.body.isSeller,
    isSubscribe: req.body.isSubscribe,
    isAdmin: req.body.isAdmin,
  };
  await fire.db.collection("users").doc(req.body.email).set(addata);
});

app.get("/getuser", async (req, res) => {
  const userref = fire.db.collection("users");
  const snapshot = await userref.get();
  var arr = [];
  snapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  //console.log(arr);
  res.send(arr);
});

app.post('/update',urlencodedParser,async (req,res)=>{
  const data = {
    name: req.body[0],
    email:req.body[1],
    mobile:req.body[2],
    isSeller:req.body[3],
    isSubscribe:req.body[4],
    isAdmin:req.body[5]
  };
   await fire.db.collection('users').doc(req.body[1]).set(data);
  res.send("Updated");
});

//delete user
app.post('/delete',urlencodedParser,async (req,res)=>{
   await fire.db.collection('users').doc(req.body[1]).delete();
  res.send("Deleted");
})

// fetch property
app.get("/getproperty",async(req,res)=>
{
  const userref=fire.db.collection('properties');
    const snapshot = await userref.get();
    var arr = [];
  snapshot.forEach(doc => {
    let data = doc.data();
    data.id=doc.id;
  arr.push(data);
  })
res.send(arr);
});

//property update
app.post('/pupdate',urlencodedParser,async (req,res)=>{
  let id = req.body;
  const data = {
    id: req.body[0],
    // name:req.body[1],
    city:req.body[1],
    zipCode:req.body[2],
    type:req.body[3],
    builtUpArea:req.body[4],
    carpetArea:req.body[5],
    sellPrice:req.body[6],
    email:req.body[7]
  };
   await fire.db.collection('properties').doc(req.body[0]).set(data);
  res.send("Updated");
});

//property delete
app.post('/pdelete',urlencodedParser,async (req,res)=>{
   await fire.db.collection('properties').doc(req.body[0]).delete();
  res.send("Deleted");
});

// 404 route
app.get("/404", (req, res) => {
  res.sendFile(path.join(staticPath, "404.html"));
});

app.use((req, res) => {
  res.redirect("/404");
});


app.listen(process.env.PORT, () => {

  console.log(process.env.PORT);
});
