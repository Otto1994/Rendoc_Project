const syncSql=require("sync-sql");
const connexion = {
    host: "localhost",
    port:3306,
    user: "root",
    password: "",
    database: "rendoc_db"
  };
  
  
  function requette(sql){
  var res=syncSql.mysql(connexion,sql);
  return  JSON.stringify(res.data.rows);

}
function executer(sql){
  var res=syncSql.mysql(connexion,sql);
  
  

}

module.exports={requette,executer}
  