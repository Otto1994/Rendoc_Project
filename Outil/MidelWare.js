var checklogin=function (req,res,next){
    if(req.session.num > 0) 
    {
        console.log('la session check')
        return next();
    }else{
        res.redirect('http://localhost:3000/rendoc/Authentification');
    }

}
var notchecklogin=function (req,res,next){
    if(req.session.num > 0) 
    {
        if(req.session.type==="medecin"){

            res.redirect("http://localhost:3000/rendoc/med");
           } else if(req.session.type==="patient"){
            res.redirect("http://localhost:3000/rendoc/Pat") ;
           }else if(req.session.type==="admin"){
            res.redirect("http://localhost:3000/rendoc/admin") ;
           }
        
        
    }else{
        return next();
        

    }

}

module.exports={checklogin,notchecklogin}