//-annimation-du--l'authentification--///
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".cont");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
  
});
window.addEventListener("scroll",function(){
  var header =document.querySelector("header");
header.classList.toggle("stcr",window.scrollY >0);
})
//dark---mode--//
icon.onclick=function () {
  document.body.classList.toggle("dark-theme");
if (document.body.classList.contains("dark-theme")){ 
icon.src="../images/sun.png";
}else{  icon.src="../images/moon.png";

  }	}
  function text(x){
    if (x==1)
        document.getElementById("med").style.display="block";
    else	document.getElementById("med").style.display="none";
    
}
