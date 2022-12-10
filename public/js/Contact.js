const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);

});
//dark...mode//
var icon = document.getElementById("icon");
icon.onclick=function () {
    document.body.classList.toggle("dark-theme");
if (document.body.classList.contains("dark-theme")){ 
icon.src="../images/sun.png";
}else{  icon.src="../images/moon.png";

    }	}
  
//scroller---de--nav--bar--//
         window.addEventListener("scroll",function(){
    				var header =document.querySelector("header");
				header.classList.toggle("stcr",window.scrollY >0);
			})
            const textc = document.querySelector(".sec-text");

