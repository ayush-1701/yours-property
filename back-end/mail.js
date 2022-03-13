      //  implemented by Shubham
 const dotenv = require('dotenv');
 const nodemailer=require('nodemailer');
const { db } = require('../firebaseAws');
    dotenv.config();
    exports.nodeMailer=(req,res)=>{
    const {email,message}=req.body;
    if (!email.length) {
            return res.json({ 'alert': 'enter your email' });
        }
        else if (ValidateEmail(email)) {
            res.json({'alert':'You have entered an invalid email address!'});
        }
        else if(!message.length){
            return res.json({ 'alert': 'enter message' });
        }
    else{    
    let transporter =nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    });
    const mailOption={
        from: 'valid sender email id',
        to: process.env.EMAIL,
        subject: 'YoursProperty Feedback',
        html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                body{
                    min-height: 90vh;
                    background: #f5f5f5;
                    font-family: sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                }
                .heading{
                    text-align: center;
                    font-size: 40px;
                    width: 50%;
                    display: block;
                    line-height: 50px;
                    margin: 30px auto 60px;
                    text-transform: capitalize;
                }
                .heading span{
                    font-weight: 300;
                }
            </style>
        </head>
        <body>

            <div>
                <h1 class="heading">Message From ${email.split('@')[0]}<span> ${message}</span></h1>
            </div>
            
        </body>
        </html>
        `
    }
    let docName=email+Math.floor(Math.random() * 1237192874192824);
      db.collection('feedback').doc(docName).set(req.body).then(data=>{ transporter.sendMail(mailOption, (err,info)=>{
           if(err){
               console.log(err);
               res.json({'alert':'opps! its seems like err occured. Try again'});
           }
           else{
               res.json({'alert':'Feedback is Submitted'})
           }
       })})}
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