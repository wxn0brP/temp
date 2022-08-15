function lar(x){
	console.log(x);
	return x;
}

var Silnik = {
	dane: {},
	
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
		};
		
		Fizyka.graczIni(dane);
		setTimeout(() => {
			Silnik.start(dane);
		},10);
	},
	
	start: function(dane){
		var petla = function(){
			setTimeout(() => {
				if(!Silnik.stop){
					try{
						requestAnimationFrame(petla);
						Akt.akt(dane);
						Render.render(dane);
					}catch(e){
						lo(e);
						Silnik.stop = true;
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