const nodemailer=require('nodemailer');
var mail= async function(nom,email,message,type){
    console.log(message)
    const transporteur = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"rendoc.contact.dz@gmail.com",
            pass:"moduleaie2022"

        }
    });
    const mailOption={
        from:"rendoc.contact.dz@gmail.com",
        to:"rendoc.contact.dz@gmail.com",
        subject:"nom : "+nom+" E-Mail :"+email+" type : "+type,
        text : message
    }
   await transporteur.sendMail(mailOption,function(err){
        if (err) {
            console.log(err);
        }else{
            console.log("envoyer");
        }
    });
}
module.exports={mail}