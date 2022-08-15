function zegar(){
	var dzisiaj = new Date();
	var dzien = dzisiaj.getDate();
	var mies = dzisiaj.getMonth()+1;
	var rok = dzisiaj.getFullYear();
	var godz = dzisiaj.getHours();
	if(godz<10) godz = "0"+godz;
	var min = dzisiaj.getMinutes();
	if(min<10) min = "0"+min;
	var seck = dzisiaj.getSeconds();
	if(seck<10) seck = "0"+seck;
	document.getElementById("tim").innerHTML =
		"&nbsp;&nbsp;"+godz+":"+min+":"+seck+" &nbsp; "+dzien+"/"+mies+"/"+rok;
	setTimeout("zegar()",1000);
}
zegar();

var dane = [...new URLSearchParams(window.location.href)];
if(dane[0] && dane[0][1]=="u"){
	var script = document.createElement('script');
	script.src="//cdn.jsdelivr.net/npm/eruda"; 
	document.body.appendChild(script);
	script.onload = function(){ 
		eruda.init();
	}
}



//----------------

document.getElementById("logo").innerHTML = "null";