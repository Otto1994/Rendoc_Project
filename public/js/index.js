//dark...mode//
var icon = document.getElementById("icon");
icon.onclick=function () {
    document.body.classList.toggle("dark-theme");
if (document.body.classList.contains("dark-theme")){ 
icon.src="/images/sun.png";
}else{  icon.src="/images/moon.png";

    }	}
  
//scroller---de--nav--bar--//
         window.addEventListener("scroll",function(){
    				var header =document.querySelector("header");
				header.classList.toggle("stcr",window.scrollY >0);
			})
            const textc = document.querySelector(".sec-text");
//---lanimation--du--page--d'accueil--//
            const textLoad = () => {
                setTimeout(() => {
                    textc.textContent = "RENDOC";
                }, 0);
                //1s = 1000 milliseconds
            }
    
            textLoad();
            setInterval(textLoad, 12000);
			