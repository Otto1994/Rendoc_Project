const { redirect } = require('express/lib/response');
var Synrequette = require('../Outil/SynConnexion');

//--------------------------------------------------------------------
class Utilisateur {
    id;
    nom;
    prenom;
    Tel;
    Email;
    MotdePasse;
    type;

    
    constructor(){
        
    }
    connexion(user,psw){
        let sql="select * from utilisateur where email ='"+user+"' and psw='"+psw+"'";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        if(resultaOJECT.length > 0)
        {
            
        this.id=resultaOJECT[0].id;
        this.nom=resultaOJECT[0].nom;
        this. prenom=resultaOJECT[0].prenom;
        this.Tel=resultaOJECT[0].tel;
        this.Email=resultaOJECT[0].email;
        this.MotdePasse=resultaOJECT[0].psw;
        this.type=resultaOJECT[0].type;
         }else{
             this.Email=null
             this.psw=null
         }

    }
    createCompt(nom,prenom,Tel,Email, MotdePasse ,type){
        
        this.nom=nom;
        this.prenom=prenom;
        this.Tel=Tel;
        this.Email=Email;
        this.MotdePasse=MotdePasse;
        this.type=type;
        let sql="insert into utilisateur (`id`, `nom`, `prenom`, `tel`, `email`, `psw`,`type`) values( null ,'"+nom+"','"+prenom+"','"+Tel+"','"+Email+"','"+MotdePasse+"','"+type+"')";
        Synrequette.executer(sql);


    }
    
    

}
//---------------------------------------------------------------
class Render_vous {
    date;
    heure;
    num;
    dispo;
    status;
    idMed;
    idPat;
    constructor(){

    }
    listRdvMed(idMed){
        let sql="select * from rendez_vous where medecinID="+idMed+" and patientID is not null"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT
        }
    listRdvMedRech(idMed,date){
            let sql="select * from rendez_vous where medecinID="+idMed+" and patientID is not null and dateR='"+date+"'"
            var resultaJSON= Synrequette.requette(sql);
            var resultaOJECT=JSON.parse(resultaJSON);
            return resultaOJECT
        }
    listRdvPat(idPat){
        let sql="select r.numR , r.dateR , r.heureR , c.adresse , c.wilaya , m.nom , m.prenom "+
        "from rendez_vous r , medecin m , cabinet c"+
        " where r.patientID="+idPat+" and r.medecinID=m.id  and c.idMed=m.id and r.statusR='p' group by r.numR"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT
    }
    listRdvMedDispo(idMed){
        let sql="select * from rendez_vous where medecinID="+idMed+" and patientID is null"
        console.log(sql)
        var resultaJSON= Synrequette.requette(sql);
        console.log(resultaJSON);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT
    }
    listRdvMedDispoRech(idMed,date){
        let sql="select * from rendez_vous where medecinID="+idMed+" and patientID is null and dateR='"+date+"'";
        console.log(sql)
        var resultaJSON= Synrequette.requette(sql);
        console.log(resultaJSON);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT
    }
    valideTerlinerRDV(numR,idMed){

        let sql="update rendez_vous set statusR='t' where numR="+numR+" and medecinID="+idMed+"";
        Synrequette.executer(sql);
    }
    suppRDV(numR,idMed){

        let sql="delete from rendez_vous where numR="+numR+" and medecinID="+idMed+"";
        Synrequette.executer(sql);
    }
    ajouterRDV(){
        let sql="insert into rendez_vous values( null,'"+this.date+"','"+this.heure+"','p',"+this.idMed+",null)";
        Synrequette.executer(sql);
    }
    listRDVPatDispo(idMed){
        let sql="select m.nom,m.prenom ,r.dateR,r.heureR,r.numR"+
        " from rendez_vous r ,medecin m where r.medecinID="+idMed+" and r.patientID is null and r.medecinID=m.id "+
        "group by r.numR"
        console.log(sql)
        var resultaJSON= Synrequette.requette(sql);
        console.log(resultaJSON);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT
    }
    annulerRDV(idPat,numR){
        let sql = "UPDATE rendez_vous SET  patientID =null WHERE patientID="+idPat+" AND numR="+numR+" "
        Synrequette.executer(sql);
    }


}
//---------------------------------------------------------------
class avis_medical{
    
    constructor(){

    }
    listAvisMed(idMed){
        let sql="select c.ida,c.message,c.dateMessage,c.reponse,p.nom,p.email,c.reponse"+
       " from avis_medical c, medecin m ,patient p "+
        "where (c.idMed="+idMed+") OR (c.idMed is null and p.id=c.idPat and c.reponse IS null)"+
        " GROUP BY c.ida";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT;

    }
    listAvisMedRech(idMed,email){
        let sql="select c.ida,c.message,c.dateMessage,c.reponse,p.nom,p.email,c.reponse"+
       " from avis_medical c, medecin m ,patient p "+
        "where ((c.idMed="+idMed+") OR (c.idMed is null and p.id=c.idPat and c.reponse IS null)) AND p.email='"+email+
        "' And c.idPat=p.id GROUP BY c.ida";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT;

    }
    listAvisPat(idPat){
        var reponse=[]
        let sql="select c.ida,c.message,c.dateMessage,c.reponse,p.nom,p.email "+
       " from avis_medical c, medecin m ,patient p "+
        "where p.id="+idPat+" AND p.id=c.idPat  GROUP BY c.ida";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        let r= reponse.push(resultaOJECT);
        sql="select c.ida, m.nom , m.email ,c.dateReponse, c.reponse "+
        " from avis_medical c, medecin m "+
        "where c.idPat="+idPat+" and c.idMed=m.id and c.reponse is not null"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
         r= reponse.push(resultaOJECT);
        return reponse;

    }
    reponseAvis(ida,idMed,message){
        if(message!=""){
        var today= new Date();
        var date= today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        console.log(date);
        let sql="update avis_medical set reponse='"+message+"' , idMed="+idMed+" , dateReponse='"+date+"' where ida="+ida+"";
        Synrequette.executer(sql);
        }
    }
    publierAvis(idPat,message){
        var today= new Date();
        var date= today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        console.log(date);
        let sql="INSERT INTO avis_medical VALUES (NULL, '"+message+"', NULL, '"+idPat+"', NULL, '"+date+"', NULL);"
        Synrequette.executer(sql);

    }
    rechercheAvis(recherche){
        var reponse=[]
        let sql="select c.ida,c.message,c.dateMessage,c.reponse,p.nom,p.email "+
       " from avis_medical c, medecin m ,patient p "+
        "where c.message like '%"+recherche+"%' AND p.id=c.idPat  GROUP BY c.ida";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        let r= reponse.push(resultaOJECT);
        sql="select c.ida, m.nom , m.email ,c.dateReponse, c.reponse "+
        " from avis_medical c, medecin m "+
        "where c.reponse like '%"+recherche+"%' and c.idMed=m.id and c.reponse is not null"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
         r= reponse.push(resultaOJECT);
        return reponse;
    }

}
//----------------------------------------------------------------
class Medcin extends Utilisateur{
    specialite;
    cabinet;
    avis=new avis_medical();
    constructor(){
        super()
    }
    modifProfil(idMed,nom,prenom,tel,email,psw,adresse,wilaya,specialitee){
        this.id=idMed;
        this.nom=nom;
        this. prenom=prenom;
        this.Tel=tel;
        this.Email=email;
        this.MotdePasse=psw;
        this.cabinet= new Cabinet("",adresse,wilaya,this);
        this.cabinet.modifCab();
        let sql="update utilisateur set  nom='"+this.nom+"' , prenom='"+this.prenom+"' , "+
        "tel='"+this.Tel+"' , email='"+this.Email+"' , psw='"+this.MotdePasse+", specialitee='"+this.specialitee+"' where  id="+this.id+"";
        Synrequette.executer(sql);
        sql="update medecin set  nom='"+this.nom+"' , prenom='"+this.prenom+"' , "+
        "tel='"+this.Tel+"' , email='"+this.Email+"' , psw='"+this.MotdePasse+"' where  id="+this.id+"";
        Synrequette.executer(sql);

    }
    getMedecinProf(idMed){
        this.id=idMed;
        let sql="select m.id ,m.nom ,m.prenom, m.tel,m.email, m.psw,  m.specialitee, c.adresse ,c.wilaya from medecin m , cabinet c where c.idMed=m.id and m.id="+this.id+" group by m.id";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        if(resultaOJECT.length > 0)
        {
            
        this.id=resultaOJECT[0].id;
        this.nom=resultaOJECT[0].nom;
        this. prenom=resultaOJECT[0].prenom;
        this.Tel=resultaOJECT[0].tel;
        this.Email=resultaOJECT[0].email;
        this.MotdePasse=resultaOJECT[0].psw;
        this.specialite=resultaOJECT[0].specialitee;
        this.cabinet= new Cabinet(0,resultaOJECT[0].adresse,resultaOJECT[0].wilaya,this);
        console.log(resultaOJECT);
         }
    }
    getMedecinPat(wilaya,specialite){
        let sql="select m.id,m.nom,m.prenom,c.adresse,m.tel,m.email "+
        " from medecin m , cabinet c "+
        "where m.id=c.idMed and m.specialitee='"+specialite+"' and c.wilaya='"+wilaya+"' GROUP by m.id"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT
    }
    getMedecinPatRech(nom,wilaya,specialite){
        let sql="select m.id,m.nom,m.prenom,c.adresse,m.tel,m.email "+
        " from medecin m , cabinet c "+
        "where m.id=c.idMed and m.specialitee='"+specialite+"' and c.wilaya='"+wilaya+"' and m.nom='"+nom+"' GROUP by m.id"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT
    }
    getMedecinPatRech2(nom){
        let sql="select m.id,m.nom,m.prenom,c.adresse,m.tel,m.email "+
        " from medecin m , cabinet c "+
        "where m.id=c.idMed and m.nom='"+nom+"' GROUP by m.id"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT
    }
    getActive(id){
        let sql="select m.actif "+
        " from medecin m  "+
        "where m.id="+id+"";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        if(resultaOJECT[0].actif=="oui"){
            return true;
        }else{
            return false;
        }
    }
    createComptMed(nom,prenom,Tel,Email, MotdePasse,type,cabinet,wilaya,specialite){
        let user= new Utilisateur();
        let idM;
        user.createCompt(nom,prenom,Tel,Email, MotdePasse,type);
        let sql="select * from utilisateur where email ='"+Email+"'";
        var resultaJSON= Synrequette.requette(sql);
        var resultaId=JSON.parse(resultaJSON);
        idM=resultaId[0].id;
        
         sql="insert into medecin (`id`, `nom`, `prenom`, `tel`, `email`, `psw`,`specialitee`,`idCab`,`actif`)"+
         " values("+idM+",'"+nom+"','"+prenom+"','"+Tel+"','"+Email+"','"+MotdePasse+"','"+specialite+"',null,'non')";
         Synrequette.executer(sql);
         sql="insert into cabinet values (null , '"+cabinet+"','"+wilaya+"',"+idM+")"
         Synrequette.executer(sql);
         sql="update medecin c set c.idCab=(select  idc from cabinet e where e.idMed="+idM+") where c.id="+idM+""
         Synrequette.executer(sql);
         return true;
    }
    statRdv(idMed,date1,date2){
        let sql= "SELECT c.dateR ,COUNT(c.dateR) as 'stat' FROM rendez_vous c WHERE c.medecinID="+idMed+" and patientID is not null and c.dateR BETWEEN '"+date1+"' AND '"+date2+"'"+
        "GROUP BY c.dateR"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        console.log(resultaOJECT);
        return resultaOJECT;
    }


}
//----------------------------------------------------------------
class Cabinet {
 
    idc;
    adresse;
    wilaya;
    medcin;

    constructor(idc,adresse,wilaya,medcin){

    this.idc=idc;
    this.adresse=adresse;
    this.wilaya=wilaya;
    this.medcin=medcin;
    }
modifCab(){
let sql="update cabinet set adresse='"+this.adresse+"' , wilaya='"+this.wilaya+"' where idMed="+this.medcin.id+""
console.log(sql);
Synrequette.executer(sql);
}
ajoutCab(idMed,adresse,wilaya){
    let sql="insert into cabinet values (null,'"+adresse+"' ,'"+wilaya+"',"+idMed+")"
    Synrequette.executer(sql);
}

}


//----------------------------------------------------------------
class Patient extends Utilisateur{

    avis= new avis_medical();
    constructor(){
        super()
    }
    createComptPatient(nom,prenom,Tel,Email, MotdePasse,type){
        let user= new Utilisateur();
        user.createCompt(nom,prenom,Tel,Email, MotdePasse,type);
        let sql="select * from utilisateur where email ='"+Email+"'";
        var resultaJSON= Synrequette.requette(sql);
        var resultaId=JSON.parse(resultaJSON);
        console.log("id ="+resultaId[0].id);
         sql="insert into patient (`id`, `nom`, `prenom`, `tel`, `email`, `psw`) values("+resultaId[0].id+",'"+nom+"','"+prenom+"','"+Tel+"','"+Email+"','"+MotdePasse+"')";
         Synrequette.executer(sql);
         return true;
    }
    listPatMed(idMed){
        
        let sql="select * from patient where id in (select patientID from rendez_vous where medecinID="+idMed+") group by id";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT

    }
    listPatMedRech(idMed,idP){
        
        let sql="select * from patient where id in (select patientID from rendez_vous where medecinID="+idMed+" and patientID="+idP+") group by id";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT

    }
    
    prendreRDV(numR,idPat,idMed){
        let sql="select patientID from rendez_vous where patientID="+idPat+" and medecinID="+idMed+" and statusR='p'"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        console.log("la taille = "+resultaOJECT.length);
        if(resultaOJECT.length==0){
         sql= "update rendez_vous set patientID="+idPat+" where numR="+numR+""
        }
        Synrequette.executer(sql);
    }
    modifProfil(idMed,nom,prenom,tel,email,psw){
        this.id=idMed;
        this.nom=nom;
        this. prenom=prenom;
        this.Tel=tel;
        this.Email=email;
        this.MotdePasse=psw;
        let sql="update utilisateur set  nom='"+this.nom+"' , prenom='"+this.prenom+"' , "+
        "tel='"+this.Tel+"' , email='"+this.Email+"' , psw='"+this.MotdePasse+"' where  id="+this.id+"";
        Synrequette.executer(sql);
        sql="update patient set  nom='"+this.nom+"' , prenom='"+this.prenom+"' , "+
        "tel='"+this.Tel+"' , email='"+this.Email+"' , psw='"+this.MotdePasse+"' where  id="+this.id+"";
        Synrequette.executer(sql);

    }
    getPatientProf(idMed){
        this.id=idMed;
        let sql="select m.id ,m.nom ,m.prenom, m.tel,m.email, m.psw  from patient m  where m.id="+this.id+" group by m.id";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        if(resultaOJECT.length > 0)
        {
            
        this.id=resultaOJECT[0].id;
        this.nom=resultaOJECT[0].nom;
        this. prenom=resultaOJECT[0].prenom;
        this.Tel=resultaOJECT[0].tel;
        this.Email=resultaOJECT[0].email;
        this.MotdePasse=resultaOJECT[0].psw;
        console.log(resultaOJECT);
         }
    }
    
}
class Admin extends Utilisateur{
    constructor(){
        super();
    };
    listMed(){
        let sql="select m.id,m.nom,m.prenom,m.Tel,m.email,m.psw,m.specialitee,m.actif,c.adresse ,c.wilaya "+
        "from medecin m , cabinet c where c.idMed = m.id and c.idc=m.idCab group by m.id";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        console.log(resultaOJECT);
        return resultaOJECT;
    }
    listMedRech(email){
        let sql="select m.id,m.nom,m.prenom,m.Tel,m.email,m.psw,m.specialitee,m.actif,c.adresse ,c.wilaya "+
        "from medecin m , cabinet c where c.idMed = m.id and c.idc=m.idCab and m.email='"+email+"' group by m.id";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        console.log(resultaOJECT);
        return resultaOJECT;
    }
    actifMed(id){
        var sql="select actif from medecin where id="+id+"";
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        if(resultaOJECT[0].actif=="non"){
            sql="update medecin set actif='oui' where id="+id+""
            resultaJSON=Synrequette.executer(sql);
        }else if(resultaOJECT[0].actif=="oui"){
            sql="update medecin set actif='non' where id="+id+""
            resultaJSON=Synrequette.executer(sql);
        }
       
    }
    suppMed(id){
       
        var sql="delete from rendez_vous where medecinID="+id+"";
        var resultaJSON= Synrequette.executer(sql);
        var sql="delete from avis_medical where idMed="+id+"";
        var resultaJSON= Synrequette.executer(sql);
        var sql="delete from cabinet where idMed="+id+"";
        var resultaJSON= Synrequette.executer(sql);
        var sql="delete from medecin where id="+id+"";
        var resultaJSON= Synrequette.executer(sql); 
    }
    ajoutMed(nom,prenom,Tel,Email, MotdePasse,specialite,cabinet,wilaya){
        let user= new Utilisateur();
        user.createCompt(nom,prenom,Tel,Email, MotdePasse,"medecin");
        let sql="select * from utilisateur where email ='"+Email+"'";
        var resultaJSON= Synrequette.requette(sql);
        var resultaId=JSON.parse(resultaJSON);
        console.log("id ="+resultaId[0].id);
         sql="insert into medecin values("+resultaId[0].id+",'"+nom+"','"+prenom+"','"+Tel+"','"+Email+"','"+MotdePasse+"','"+specialite+"',null,'non')";
         Synrequette.executer(sql);
         let cab = new Cabinet();
         cab.ajoutCab(resultaId[0].id,cabinet,wilaya);
         sql="update medecin set idCab=(select idc from cabinet where idMed="+resultaId[0].id+") where id="+resultaId[0].id+"";
         Synrequette.executer(sql);

    }
    listPat(){
        let sql="select * from patient"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT;
    }
    suppPat(id){
        var sql="delete from rendez_vous where patientID="+id+"";
        var resultaJSON= Synrequette.executer(sql);
        var sql="delete from avis_medical where idPat="+id+"";
        var resultaJSON= Synrequette.executer(sql);
        var sql="delete from patient where id="+id+"";
        var resultaJSON= Synrequette.executer(sql); 
    }
    ajoutPat(nom,prenom,Tel,Email, MotdePasse){
        let user= new Utilisateur();
        user.createCompt(nom,prenom,Tel,Email, MotdePasse,"patient");
        let sql="select * from utilisateur where email ='"+Email+"'";
        var resultaJSON= Synrequette.requette(sql);
        var resultaId=JSON.parse(resultaJSON);
        console.log("id ="+resultaId[0].id);
         sql="insert into patient values("+resultaId[0].id+",'"+nom+"','"+prenom+"','"+Tel+"','"+Email+"','"+MotdePasse+"')";
         Synrequette.executer(sql);
         

    }
    listPatRech(email){
        let sql="select * from patient where email='"+email+"'"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT;
    }
    getProfil(id){
        let sql="select * from admin where id="+id+""
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT;
    }
    modifProfil(idMed,nom,prenom,tel,email,psw){
        this.id=idMed;
        this.nom=nom;
        this. prenom=prenom;
        this.Tel=tel;
        this.Email=email;
        this.MotdePasse=psw;
        let sql="update utilisateur set  nom='"+this.nom+"' , prenom='"+this.prenom+"' , "+
        "tel='"+this.Tel+"' , email='"+this.Email+"' , psw='"+this.MotdePasse+"' where  id="+this.id+"";
        Synrequette.executer(sql);
        sql="update admin set  nom='"+this.nom+"' , prenom='"+this.prenom+"' , "+
        "tel='"+this.Tel+"' , email='"+this.Email+"' , psw='"+this.MotdePasse+"' where  id="+this.id+"";
        Synrequette.executer(sql);

    }
    listAdmin(){
        let sql="select * from admin"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT;
    }
    ajoutAdmin(nom,prenom,Tel,Email, MotdePasse){
        let user= new Utilisateur();
        user.createCompt(nom,prenom,Tel,Email, MotdePasse,"patient");
        let sql="select * from utilisateur where email ='"+Email+"'";
        var resultaJSON= Synrequette.requette(sql);
        var resultaId=JSON.parse(resultaJSON);
        console.log("id ="+resultaId[0].id);
         sql="insert into admin values("+resultaId[0].id+",'"+nom+"','"+prenom+"','"+Tel+"','"+Email+"','"+MotdePasse+"')";
         Synrequette.executer(sql);
         

    }
    listAdmiRech(email){
        let sql="select * from admin where email='"+email+"'"
        var resultaJSON= Synrequette.requette(sql);
        var resultaOJECT=JSON.parse(resultaJSON);
        return resultaOJECT;
    }

}
module.exports={Medcin , Utilisateur , Patient , Render_vous ,avis_medical ,Cabinet,Admin}