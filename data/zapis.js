function pktWys(){
	pktUnd();
	document.getElementById("pkt").innerHTML = "punkty = "+getCookie("sc");
}

function pktAdd(a){
	pktUnd();
	setCookie("sc", parseInt(getCookie("sc"))+a, 500);
}

function pktRe(a){
	pktUnd();
	setCookie("sc", parseInt(getCookie("sc"))-a, 500);
}

function pktUnd(){
	if(getCookie("sc") == undefined){
		setCookie("sc", 0, 500);
	}
}

function getCookie(name){
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if(parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(cName, cValue, expDays){
	let date = new Date();
	date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));//dni
	const expires = "expires=" + date.toUTCString();
	document.cookie = cName + "=" + cValue + "; " + expires + "; path=/;" + "SameSite=Strict";
}

