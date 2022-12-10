
var icon = document.getElementById("icon");
icon.onclick=function () {
    document.body.classList.toggle("dark-theme");
if (document.body.classList.contains("dark-theme")){ 
icon.src="../images/sun.png";
}else{  icon.src="../images/moon.png";

    }	}
//--radio--button--condition--//
    /*function text(x){
        if (x==0)
            {document.getElementById("search").style.display="block";
            document.getElementById("searchsp").style.display="none"
        }
            
        else if	(x==1){document.getElementById("searchsp").style.display="block";
        document.getElementById("search").style.display="none"
    }
        
    }*/
    function text(x){
        if (x==1)
            document.getElementById("Spé").style.display="block";
        else	document.getElementById("Spé").style.display="none";
        
    }


         window.addEventListener("scroll",function(){
    				var header =document.querySelector("header");
				header.classList.toggle("stcr",window.scrollY >0);
			})
            const textc = document.querySelector(".sect-text");

        
			