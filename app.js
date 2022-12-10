//------------ ---------------------------------------les import------------------------------------------------//

const expess = require("express");
const NM=require('./Outil/Mail');
const bodyparser=require("body-parser");
let session =require('express-session');
const modele=require('./Modele/Modeles')
var MidelWare= require('./Outil/MidelWare');




// -----------------------------------------------------les donnée----------------------------------------------//
var app = expess();
const port=3000;

//------------------------------------------------------ principale--------------------------------------------//

//------------------------------------ dependance------------------------------//

app.use(bodyparser.urlencoded({extended :false}));
app.use(expess.static('public'))
.use('/css',expess.static(__dirname+'public/css'))
.use('/js',expess.static(__dirname+'public/js'))
.use('/image',expess.static(__dirname+'public/images'));
app.use(expess.json({limit:'1mb'}));
app.use(session({ secret:'my secret',resave:false,saveUninitialized:true}))
app.set('views','./views');
app.set('view engine','ejs');



//---------------- ------------------------route---------------------------------------------------------------//

//------------------------- -------------Medecin ---------------------------------//

app.get('/rendoc/med',MidelWare.checklogin, function(req,res){


    if(req.session.type==="medecin"){
        let rdv= new modele.Render_vous();
        var list=rdv.listRdvMed(req.session.num);
        console.log(list)
         res.render('MedViews/index-médecin',{tu : list ,nomMed:req.session.nom , prenomMed:req.session.prenom});
        }else{
            res.render('index');
        }

});
app.post('/rendoc/rechercheDate',MidelWare.checklogin,function(req,res){

    console.log(""+req.body.dateRech);
    let dateRech=""+req.body.dateRech;
    if(req.session.type==="medecin"&& dateRech==""){
        let rdv= new modele.Render_vous();
        var list=rdv.listRdvMed(req.session.num);
        console.log(list)
         res.render('MedViews/index-médecin',{tu : list ,nomMed:req.session.nom , prenomMed:req.session.prenom});
        }else if(req.session.type==="medecin"&& dateRech!=""){
            let rdv= new modele.Render_vous();
            var list=rdv.listRdvMedRech(req.session.num,dateRech);
            console.log(list)
             res.render('MedViews/index-médecin',{tu : list ,nomMed:req.session.nom , prenomMed:req.session.prenom});
            
        }else{
            res.render('index');
        }
    
});
app.post('/rendoc/rechercheDate2',MidelWare.checklogin,function(req,res){

    console.log(""+req.body.dateRech);
    let dateRech=""+req.body.dateRech;
    if(req.session.type==="medecin" && dateRech==""){
        let rdv= new modele.Render_vous();
        var list=rdv.listRdvMedDispo(req.session.num);
        console.log(list);
         res.render('MedViews/MédecinTB/ListRDV',{tu : list ,nomMed:req.session.nom , prenomMed:req.session.prenom});
        }else  if(req.session.type==="medecin" && dateRech!=""){
            let rdv= new modele.Render_vous();
        var list=rdv.listRdvMedDispoRech(req.session.num,dateRech);
        console.log(list)
         res.render('MedViews/MédecinTB/ListRDV',{tu : list ,nomMed:req.session.nom , prenomMed:req.session.prenom});
            
        }else{
            res.render('index');
        }
    
});
app.post('/rendoc/rechercheDate3',MidelWare.checklogin,function(req,res){

    console.log(""+req.body.idpatient);
    let idpatient=""+req.body.idpatient;
    if(req.session.type==="medecin" && idpatient==""){
        let rdv= new modele.Patient();
        var list=rdv.listPatMed(req.session.num);
        console.log(list)
        res.render('MedViews/MédecinTB/Patientslist',{tu : list ,nomMed:req.session.nom , prenomMed:req.session.prenom});
        }else  if(req.session.type==="medecin" && idpatient!=""){
            let rdv= new modele.Patient();
            var list=rdv.listPatMedRech(req.session.num,idpatient);
            console.log(list)
            res.render('MedViews/MédecinTB/Patientslist',{tu : list ,nomMed:req.session.nom , prenomMed:req.session.prenom});
            
        }else{
            res.render('index');
        }
    
});
app.post('/rendoc/rechercheDate4',MidelWare.checklogin,function(req,res){

    console.log(""+req.body.emailpat);
    let emailpat=""+req.body.emailpat;
    if(req.session.type==="medecin" && emailpat==""){
      
        let med =new modele.Medcin();
        let listavi = med.avis.listAvisMed(req.session.num);
        console.log(listavi);
        res.render('MedViews/MédecinTB/pub', {tu : listavi , nomMed : req.session.nom , prenomMed : req.session.prenom});
        }else  if(req.session.type==="medecin" && emailpat!=""){
            
        let med =new modele.Medcin();
        let listavi = med.avis.listAvisMedRech(req.session.num,emailpat);
        console.log(listavi);
        res.render('MedViews/MédecinTB/pub', {tu : listavi , nomMed : req.session.nom , prenomMed : req.session.prenom});
           
        }else{
            res.render('index');
        }
    
});

app.get('/rendoc/med/valide/:id',MidelWare.checklogin, function(req,res){
    if(req.session.type==="medecin"){
        let rdv= new modele.Render_vous();
       rdv.valideTerlinerRDV(req.params.id , req.session.num);
    res.redirect('http://localhost:3000/rendoc/med')
}
});
app.get('/rendoc/med/supprimer/:id',MidelWare.checklogin, function(req,res){
    if(req.session.type==="medecin"){
        let rdv= new modele.Render_vous();
       rdv.suppRDV(req.params.id , req.session.num);
    res.redirect('http://localhost:3000/rendoc/med')
}
});

app.get('/rendoc/medListRDV',MidelWare.checklogin,function(req,res){

    if(req.session.type==="medecin"){
        let rdv= new modele.Render_vous();
        var list=rdv.listRdvMedDispo(req.session.num);
        console.log(list)
         res.render('MedViews/MédecinTB/ListRDV',{tu : list ,nomMed:req.session.nom , prenomMed:req.session.prenom});
        }else{
            res.render('index');
        }
    });
app.get('/rendoc/medListRDV/supprimer/:id',MidelWare.checklogin,function(req,res){
        if(req.session.type==="medecin"){
            let rdv= new modele.Render_vous();
           rdv.suppRDV(req.params.id, req.session.num);
        res.redirect('http://localhost:3000/rendoc/medListRDV');
    }
    });
app.post('/rendoc/medListRDV',MidelWare.checklogin,function(req,res){
       
    let rdv = new modele.Render_vous();
    rdv.date=req.body.date;
    rdv.heure=req.body.appt;
    rdv.idMed=req.session.num;
    rdv.ajouterRDV();
    res.redirect('http://localhost:3000/rendoc/medListRDV');
    })
app.get('/rendoc/medListPat',MidelWare.checklogin,function(req,res){
    if(req.session.type==="medecin"){
        let rdv= new modele.Patient();
        var list=rdv.listPatMed(req.session.num);
        console.log(list)
        res.render('MedViews/MédecinTB/Patientslist',{tu : list ,nomMed:req.session.nom , prenomMed:req.session.prenom});
        }else{
            res.render('index');
        }
       
        });

app.get('/rendoc/medPub',MidelWare.checklogin,function(req,res){
    //--ici
    if(req.session.type==="medecin"){
    let med =new modele.Medcin();
    let listavi = med.avis.listAvisMed(req.session.num);
    console.log(listavi);
    res.render('MedViews/MédecinTB/pub', {tu : listavi , nomMed : req.session.nom , prenomMed : req.session.prenom});
}else{
    res.render('index');
}

});
app.post('/rendoc/medPub',MidelWare.checklogin, function(req,res){
 
    if(req.session.type==="medecin"){
    console.log(req.body.message+" "+req.body.idpub)
      if(req.body.message!=''){
          let med = new modele.Medcin();
          med.avis.reponseAvis(req.body.idpub,req.session.num,req.body.message);
         res.redirect('http://localhost:3000/rendoc/medpub');

       }else{
        res.redirect('http://localhost:3000/rendoc/medpub');
       }
    }else{
        res.render('index');
    }
});

app.get('/rendoc/medProfil',MidelWare.checklogin,function(req,res){
    
    if(req.session.type==="medecin"){
    let med= new modele.Medcin();
    med.getMedecinProf(req.session.num);
    res.render('MedViews/MédecinTB/Profile',{nom : med.nom , prenom : med.prenom , tel : med.Tel ,email : med.Email,
    adresse : med.cabinet.adresse, wilaya : med.cabinet.wilaya , psw : med.MotdePasse , specialite : med.specialite});
    }else{
        res.render('index');
    }
    });


app.post('/rendoc/medProfil',MidelWare.checklogin,function(req,res){
    if(req.session.type==="medecin"){
        let med= new modele.Medcin();
        med.modifProfil(req.session.num,req.body.nom,req.body.prenom,req.body.tel,req.body.email,
            req.body.psw,req.body.adresse,req.body.wilaya);
       res.redirect('http://localhost:3000/rendoc/medProfil');
        }else{
            res.render('index');
        }
});
app.get('/rendoc/medStat',MidelWare.checklogin,function(req,res){
    if(req.session.type==="medecin"){
    let med = new modele.Medcin();
    res.render('MedViews/MédecinTB/Stat',{ tu:[],nom:req.session.nom,prenom:req.session.prenom});
    }else{
        res.redirect('http://localhost:3000/rendoc');
    }
    });

app.post('/rendoc/medStat',MidelWare.checklogin,function(req,res){
    if(req.session.type==="medecin"){
        let date1=""+req.body.iddate1;
        let date2=""+req.body.iddate2;
    if(date1!=""&&date2!=""){
    let med = new modele.Medcin();
    let js=med.statRdv(req.session.num,date1,date2);
    console.log(js);
    res.render('MedViews/MédecinTB/Stat',{ tu:js,nom:req.session.nom,prenom:req.session.prenom});
    }else if(date1!=""&&date2==""){
        let med = new modele.Medcin();
    let js=med.statRdv(req.session.num,date1,date1);
    console.log(js);
    res.render('MedViews/MédecinTB/Stat',{ tu:js,nom:req.session.nom,prenom:req.session.prenom});
    }else if(date1==""&&date2!=""){
        let med = new modele.Medcin();
    let js=med.statRdv(req.session.num,date2,date2);
    res.render('MedViews/MédecinTB/Stat',{ tu:js,nom:req.session.nom,prenom:req.session.prenom});
    }else {
        res.render('MedViews/MédecinTB/Stat',{ tu:[],nom:req.session.nom,prenom:req.session.prenom});
    }
}else{
    res.redirect('http://localhost:3000/rendoc');
}
    });




//----------------------- Patient -----------------------------------//

app.get('/rendoc/Pat',MidelWare.checklogin,function(req,res){
    if(req.session.type==='patient'){
      res.render('index-patient');
    }else{
        res.render('index');
    }
    
});

app.get('/rendoc/recherche',MidelWare.checklogin,function(req,res){
    if(req.session.type==='patient'){
    var listMed=[];
    res.render('Pat/recherche',{tu : listMed });
    }else{
        res.render('index');
    }
    
});
app.post('/rendoc/recherche',MidelWare.checklogin,function(req,res){
    if(req.session.type==='patient'){
        console.log("vale rech "+req.body.recherche+" null"+null);
        console.log(req.body.Spécialité);
        console.log(req.body.Wilaya);

        var rech=""+req.body.recherche;
        
        if( rech=="" &&req.body.Spécialité!="Selectionner" && !req.body.Wilaya!="Selectionner"){
            console.log(req.body.Wilaya+" , "+req.body.Spécialité);
            var med= new modele.Medcin();
            var listMed=med.getMedecinPat(req.body.Wilaya,req.body.Spécialité);
            console.log(listMed);
            res.render('Pat/recherche',{tu : listMed });
        }else  if( rech!="" && req.body.Spécialité!="Selectionner" && !req.body.Wilaya!="Selectionner") {
            var med= new modele.Medcin();
            var listMed=med.getMedecinPatRech(req.body.recherche,req.body.Wilaya,req.body.Spécialité);
            res.render('Pat/recherche',{tu : listMed });
            
        }else{
            var med= new modele.Medcin();
            var listMed=med.getMedecinPatRech2(req.body.recherche);
            res.render('Pat/recherche',{tu : listMed });
        }
    }else{
        res.render('index');
    }
   
});


app.get('/rendoc/rendez/:id',MidelWare.checklogin, function(req,res){
    if(req.session.type==='patient'){
    var rdv = new modele.Render_vous();
    var list=rdv.listRDVPatDispo(req.params.id);
    console.log(req.session.num);
    res.render('Pat/rendez',{ tu : list});
    }else{
        res.render('index');
    }
    
});
app.post('/rendoc/rendez/:id',MidelWare.checklogin, function(req,res){
    if(req.session.type==='patient'){
    var pat= new modele.Patient();
    pat.prendreRDV(req.body.val,req.session.num,req.params.id);
    res.redirect('http://localhost:3000/rendoc/rendez/'+req.params.id);
    }else{
        res.render('index');
    }

   
});
app.get('/rendoc/mesRDV',MidelWare.checklogin,function(req,res){
    if(req.session.type==='patient'){
    var pat= new modele.Render_vous();
    var list= pat.listRdvPat(req.session.num)
    res.render('Pat/mes-rendez-v',{tu : list});
    }else{
        res.render('index');
    }
    
});

app.post('/rendoc/mesRDV',MidelWare.checklogin,function(req,res){
    if(req.session.type==='patient'){
    let rdv = new modele.Render_vous();
    rdv.annulerRDV(req.session.num,req.body.val);
    res.redirect('http://localhost:3000/rendoc/mesRDV');
    }else{
        res.render('index');
    }

});
app.get('/rendoc/avisPat',MidelWare.checklogin,function(req,res){
    if(req.session.type==='patient'){
    let avis= new modele.avis_medical();
    let list =avis.listAvisPat(req.session.num);
    let list2 =[];
    res.render('Pat/avis',{tu : list[0],tup : list[1],tur : list2,tupr : list2});
    }else{
        res.render('index');
    }
    
});
app.post('/rendoc/avisPat',MidelWare.checklogin,function(req,res){
    if(req.session.type==='patient'){
    let pat= new modele.Patient();
    pat.avis.publierAvis(req.session.num,req.body.message);
    res.redirect('http://localhost:3000/rendoc/avisPat');
    }else{
        res.render('index');
    }
    
    
    
});
app.post('/rendoc/recherecheAvis',MidelWare.checklogin,function(req,res){
    if(req.session.type==='patient'){
    let avis= new modele.avis_medical();
    let list =avis.listAvisPat(req.session.num);
    let list2 =avis.rechercheAvis(req.body.recherche);
    res.render('Pat/avis',{tu : list[0],tup : list[1],tur : list2[0],tupr : list2[1]});
    }else{
        res.render('index');
    }
   
});
app.get('/rendoc/profilPat',MidelWare.checklogin,function(req,res){

    if(req.session.type==='patient'){
        let pat= new modele.Patient();
    pat.getPatientProf(req.session.num);
    res.render('Pat/profile-patient',{idP : pat.id , nom: pat.nom,prenom:pat.prenom,tel:pat.Tel,email:pat.Email,psw:pat.MotdePasse});
    }else{
        res.render('index');
    }
    
});
app.post('/rendoc/profilPat',MidelWare.checklogin,function(req,res){

    if(req.session.type==='patient'){
        let pat= new modele.Patient();
    pat.modifProfil(req.body.idP,req.body.nom,req.body.prenom,req.body.tel,req.body.email,req.body.psw);
    res.redirect('http://localhost:3000/rendoc/profilPat');
    }else{
        res.render('index');
    }});
//--------------------------------------admin-------------------------------------------//
app.get('/rendoc/admin',MidelWare.checklogin,function(req,res){
    
    if(req.session.type=="admin"){
        let admi=new modele.Admin();
        let list=admi.listMed();
        console.log(list);
        res.render('Admin/Medlist',{ tu:list , nom :req.session.nom , prenom:req.session.prenom });
    }else{
        res.redirect('http://localhost:3000/rendoc/admin');
    }  

});
app.post('/rendoc/admin',MidelWare.checklogin,function(req,res){
    let email = ""+req.body.emailRech
    if(req.session.type=="admin"){
        if(email!=""){
        let admi=new modele.Admin();
        let list=admi.listMedRech(email);
        console.log(list);
        res.render('Admin/Medlist',{ tu:list , nom :req.session.nom , prenom:req.session.prenom });
    }else{
        let admi=new modele.Admin();
        let list=admi.listMed();
        console.log(list);
        res.render('Admin/Medlist',{ tu:list , nom :req.session.nom , prenom:req.session.prenom });
    }
    }else{
        res.redirect('http://localhost:3000/rendoc');

    }  

});
app.post('/rendoc/ajoutMed',MidelWare.checklogin,function(req,res){
    var nom= ""+req.body.nom,
        prenom=""+req.body.prenom,
        tel=""+req.body.tel,
        email=""+req.body.email,
        adresse=""+req.body.adresse,
        wilaya=""+req.body.wilaya,
        psw=""+req.body.psw,
        spec=""+req.body.spec;
    if(req.session.type=="admin"){
        if(nom!=""&&prenom!=""&&tel!=""&&email!=""&&adresse!=""&&wilaya!="Wilaya"&&psw!=""&&spec!="Spécialité"){

        let admi=new modele.Admin();
        admi.ajoutMed(nom,prenom,tel,email,psw,spec,adresse,wilaya);
        let list=admi.listMed();
        console.log(list);
        res.render('Admin/Medlist',{ tu:list , nom :req.session.nom , prenom:req.session.prenom });
    }
    }else{
        res.redirect('http://localhost:3000/rendoc');
    }  

});
app.get('/rendoc/admin/actif/:id',MidelWare.checklogin,function(req,res){
    
    if(req.session.type=="admin"){
        let admi=new modele.Admin();
        admi.actifMed(req.params.id);
        let list=admi.listMed();
        console.log(list);
        res.render('Admin/Medlist',{ tu:list , nom :req.session.nom , prenom:req.session.prenom });
    }else{
        res.redirect('http://localhost:3000/rendoc');
    }
});
app.get('/rendoc/admin/suppMed/:id',MidelWare.checklogin,function(req,res){
    
    if(req.session.type=="admin"){
        let admi=new modele.Admin();
        admi.suppMed(req.params.id);
        let list=admi.listMed();
        console.log(list);
        res.render('Admin/Medlist',{ tu:list , nom :req.session.nom , prenom:req.session.prenom });
    }else{
        res.redirect('http://localhost:3000/rendoc');
    }
});
app.get('/rendoc/adminPat',MidelWare.checklogin,function(req,res){
    if(req.session.type=="admin"){
    let admi= new modele.Admin();
    let list=admi.listPat();
    res.render('Admin/Patientslist',{tu :list,nom:req.session.nom,prenom:req.session.prenom});
    }else{
        res.redirect('http://localhost:3000/rendoc');
    }

});
app.get('/rendoc/admin/suppPat/:id',MidelWare.checklogin,function(req,res){
    
    if(req.session.type=="admin"){
        let admi=new modele.Admin();
        admi.suppPat(req.params.id);
       res.redirect('http://localhost:3000/rendoc/adminPat');
    }else{
        res.redirect('http://localhost:3000/rendoc');
    }
});
app.get('/rendoc/adminProfil',MidelWare.checklogin,function(req,res){
    
    if(req.session.type=="admin"){
        let admi=new modele.Admin();
        let list=admi.getProfil(req.session.num);
        res.render('Admin/Profile',{nom:list[0].nom,prenom:list[0].prenom,Tel:list[0].Tel,email:list[0].email,psw:list[0].psw});
    }else{
        res.redirect('http://localhost:3000/rendoc');
    }
    


});
app.post('/rendoc/adminProfil',MidelWare.checklogin,function(req,res){
    
    var nom= ""+req.body.nom,
    prenom=""+req.body.prenom,
    tel=""+req.body.tel,
    email=""+req.body.email,
    psw=""+req.body.psw;
if(req.session.type=="admin"){
    if(nom!=""&&prenom!=""&&tel!=""&&email!=""&&psw!=""){

    let admi=new modele.Admin();
    admi.modifProfil(req.session.num,nom,prenom,tel,email,psw);
    res.redirect('http://localhost:3000/rendoc/adminProfil');
}else{
    es.redirect('http://localhost:3000/rendoc/adminProfil');
}
}else{
    res.redirect('http://localhost:3000/rendoc');
}  
    


});
app.post('/rendoc/ajoutPat',MidelWare.checklogin,function(req,res){
    var nom= ""+req.body.nom,
        prenom=""+req.body.prenom,
        tel=""+req.body.tel,
        email=""+req.body.email,
        psw=""+req.body.psw;
    if(req.session.type=="admin"){
        if(nom!=""&&prenom!=""&&tel!=""&&email!=""&&psw!=""){

        let admi=new modele.Admin();
        admi.ajoutPat(nom,prenom,tel,email,psw);
        res.redirect('http://localhost:3000/rendoc/adminPat');
    }else{
        es.redirect('http://localhost:3000/rendoc/adminPat');
    }
    }else{
        res.redirect('http://localhost:3000/rendoc');
    }  

});
app.post('/rendoc/adminPat',MidelWare.checklogin,function(req,res){
    let email = ""+req.body.emailRech
    if(req.session.type=="admin"){
        if(email!=""){
        let admi=new modele.Admin();
        let list=admi.listPatRech(email);
        console.log(list);
        res.render('Admin/Patientslist',{ tu:list , nom :req.session.nom , prenom:req.session.prenom });
    }else{
        let admi=new modele.Admin();
        let list=admi.listPat();
        console.log(list);
        res.render('Admin/Medlist',{ tu:list , nom :req.session.nom , prenom:req.session.prenom });
    }
    }else{
        res.redirect('http://localhost:3000/rendoc');

    }  

});
app.get('/rendoc/adminlist',MidelWare.checklogin,function(req,res){
    if(req.session.type=="admin"){
    let admi= new modele.Admin();
    let list=admi.listAdmin();
    res.render('Admin/Adminlist',{tu :list,nom:req.session.nom,prenom:req.session.prenom});
    }else{
        res.redirect('http://localhost:3000/rendoc');
    }


});
app.post('/rendoc/ajoutAdm',MidelWare.checklogin,function(req,res){
    var nom= ""+req.body.nom,
        prenom=""+req.body.prenom,
        tel=""+req.body.tel,
        email=""+req.body.email,
        psw=""+req.body.psw;
    if(req.session.type=="admin"){
        if(nom!=""&&prenom!=""&&tel!=""&&email!=""&&psw!=""){

        let admi=new modele.Admin();
        console.log(nom);
        admi.ajoutAdmin(nom,prenom,tel,email,psw);
        res.redirect('http://localhost:3000/rendoc/adminlist');
    }else{
        res.redirect('http://localhost:3000/rendoc/adminlist');
    }
    }else{
        res.redirect('http://localhost:3000/rendoc');
    }  

});
app.post('/rendoc/adminlist',MidelWare.checklogin,function(req,res){
    let email = ""+req.body.emailRech
    if(req.session.type=="admin"){
        if(email!=""){
        let admi= new modele.Admin();
        let list=admi.listAdmiRech(email)
        res.render('Admin/Adminlist',{tu :list,nom:req.session.nom,prenom:req.session.prenom});
        }else{
            res.redirect('http://localhost:3000/rendoc/adminlist');
        }
        }else{
            res.redirect('http://localhost:3000/rendoc');
        }
    
});

    
//-------------------- public -------------------//

app.get('/rendoc/index',MidelWare.notchecklogin,function(req,res){
    
    res.render('index');
});
app.get('/rendoc',MidelWare.notchecklogin,function(req,res){
    
    res.render('index');
});
app.get('/rendoc/contact',function(req,res){

  
    res.render('contact',{err:""});
});
app.post('/rendoc/contact',function(req,res){
    if (req.session.num>0) {
        NM.mail(req.session.nom,req.session.user,req.body.message1,req.session.type);
        res.redirect("http://localhost:3000/rendoc");
    }else{
        if (req.body.nom==""||req.body.email==""||req.body.message1=="") {
            res.render('contact',{err:"   il manque des information"});
        }else{
            NM.mail(req.body.nom,req.body.email,req.body.message1,"Null");
            res.redirect("http://localhost:3000/rendoc");
       }
    
   }

    
      
});
app.get('/rendoc/Authentification',function(req,res){
    req.session.destroy();
    res.render('Authentification',{msg:""});
});
app.post('/rendoc/Authentification',function(req,res){
    
    if(req.body.val==="1"){
    const user = req.body.mail;
    const psw =req.body.psw;
   let utilisateur=new  modele.Utilisateur();
     utilisateur.connexion(user,psw);
    if(user===utilisateur.Email && psw===utilisateur.MotdePasse){
        
        req.session.num=utilisateur.id;
        req.session.nom=utilisateur.nom;
        req.session.prenom=utilisateur.prenom;
        req.session.user=user;
        req.session.tel=utilisateur.Tel;
        req.session.type=utilisateur.type;
        console.log(req.session);
        if(utilisateur.type==="medecin"){
            let med=new modele.Medcin();
            var boll=med.getActive(req.session.num);
            if(boll==true){
        res.redirect("http://localhost:3000/rendoc/med");
         }else{
            req.session.destroy();
            res.render('Authentification',{msg:"Compte non actif !"});
         }
       } else if(utilisateur.type==="patient"){
        
        res.redirect("http://localhost:3000/rendoc/Pat") ;
       }else if(utilisateur.type ==="admin"){
        console.log(utilisateur.type);
        res.redirect("http://localhost:3000/rendoc/adminlist");

    }
    }else{
        req.session.destroy();
        res.redirect("http://localhost:3000/rendoc/Authentification");
    }  
}else{
    if(req.body.val2==="2"){
        const nom=""+req.body.nomc;
        const prenom=""+req.body.prenomc;
        const Tel=""+req.body.telc;
        const email=""+req.body.emailc;
        const pswc=""+req.body.pswc;
        const data=""+req.body.data;
        const cabinet =""+req.body.Cabinet
        const wilaya =""+req.body.Wilaya
        const specialite=""+req.body.MedSpe+"";
        console.log(specialite);
        
        if(nom!="" && prenom!=""&& Tel!="" && email!="" && pswc!="" && data=="non"){
        let Patient = new modele.Patient();
        let bool =Patient.createComptPatient(nom,prenom,Tel,email,pswc,"patient"); 
        if(bool==true){
            res.redirect('http://localhost:3000/rendoc/Authentification');
        }
        }else if(nom!="" && prenom!=""&& Tel!="" && email!="" && pswc!="" && data=="oui" && cabinet!="" && wilaya!="Wilaya" && specialite!="Selectionner"){
            let Medecin = new modele.Medcin();
            let bool=Medecin.createComptMed(nom,prenom,Tel,email,pswc,"medecin",cabinet,wilaya,specialite);
            if(bool==true){
                res.redirect('http://localhost:3000/rendoc/Authentification');
            }
        }else{
            res.redirect('http://localhost:3000/rendoc/Authentification');
        }
    }
}
});


//------------------ Port --------------------//

app.listen(port ,()=>console.log('le serveur a bien demarrée'));
