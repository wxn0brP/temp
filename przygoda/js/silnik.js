var Silnik = {
	dane: {},
	err: false,
	
	ini: function(){
		var Canvas = __("#Canvas").res;
		Canvas.width = 1000;
		Canvas.height = 500;
		
		var param = [...new URLSearchParams(window.location.href)];
		
		var canvas = {
			Canvas: Canvas,
			Ctx: Canvas.getContext("2d"),
			info: __("#info").res,
		};
		
		var config = {
			wrog: (param[0] && param[0][1].indexOf("wrog") > -1 ? false : true),
			dev: (param[0] && param[0][1].indexOf("dev") > -1 ? true : false),
		};

		var audio = {
			postemp: new Audio("./audio/postep.mp3"),
			tyl: new Audio("./audio/tyl.mp3"),
			tylA: false,
		};
		
		var dane = {
			canvas: canvas,
			gracz: Obiekty.Gracz(),
			teren: Obiekty.Teren(),
			przejscia: Obiekty.Przejscia(),
			moby: Obiekty.Moby(),
			audio: audio,
			config: config,
			pauza: true,
		};
		
		if(param[0] && param[0][1].indexOf("sp") > -1){
			dane.gracz.speed = 14;
		}

		dane.audio.tyl.loop = true;
		
		danes = dane;
		Fizyka.graczIni(dane);
		setTimeout(() => {
			Silnik.start(dane);
		},10);
	},
	
	start: function(dane){
		var petla = function(){
			setTimeout(() => {
				if(!Silnik.err){
					try{
						requestAnimationFrame(petla);
						if(!dane.pauza){
							Akt.akt(dane);
							Render.render(dane);
						}else{
							Akt.pauza(dane);
							Render.menu(dane);
						}
					}catch(e){
						lo(e);
						Silnik.err = true;
					}
				}
			}, 1000 / 60);
		}
		petla();
	},

	muzyka: function(dane){
		if(dane.audio.tylA){
			dane.audio.tylA = false;
			dane.audio.tyl.pause();
			dane.audio.tyl.currentTime = 0;
		}else{
			dane.audio.tylA = true;
			dane.audio.tyl.play();
		}
	}
};

window.onload = function(){
	setTimeout(Silnik.ini(), 1);
}