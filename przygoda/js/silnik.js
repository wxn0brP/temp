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
		};
		
		var config = {
			wrog: (param[0] && param[0][1].indexOf("wrog") > -1 ? false : true),
		};
		
		var dane = {
			canvas: canvas,
			gracz: Obiekty.Gracz(),
			teren: Obiekty.Teren(),
			przejscia: Obiekty.Przejscia(),
			moby: Obiekty.Moby(),
			info: __("#info").res,
			dev: (param[0] && param[0][1].indexOf("dev") > -1 ? true : false),
			config: config,
			pauza: false,
		};
		
		if(param[0] && param[0][1].indexOf("sp") > -1){
			dane.gracz.speed = 14;
		}
		
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
};

window.onload = function(){
	setTimeout(Silnik.ini(), 1);
}