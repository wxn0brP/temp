var Obiekty = {
	dane: {},
	
	Gracz: function(){
		return {
			x: 495,
			y: 245,
			w: 10,
			h: 10,
			speed: 2,
			typ: "gracz",
			hp: 50,
			atak: 1,
			oczy: 70,
			kolizja: true,
			kierunek: "prawo",
		}
	},
	
	Moby: function(){
		return [
			Obiekty.Wrogowie.Wrog(10000, 10000, "null"),
		];
	},
	
	Teren: function(){
		let arr = [
			Obiekty.Sciana(400, 190, 200, 20, "yellow"),
			Obiekty.Sciana(400, 190, 20, 100, "yellow"),
			Obiekty.Sciana(400, 290, 200, 20, "yellow"),
			
		];
		arr = arr.concat(Obiekty.Bariera(-2000, -2000, 5000, 5000));
		return arr;
	},
	
	Przejscia: function(){
		return [
			Obiekty.Przejscie(580, 200, 20, 100, "#F4C370"),
		];
	},
	
	Bariera: function(x, y, w, h){
		return [
			Obiekty.Sciana(x, y, w+50, 50, "yellow"),
			Obiekty.Sciana(x, y, 50, w, "yellow"),
			Obiekty.Sciana(x, y+h, w+50, 50, "yellow"),
			Obiekty.Sciana(x+w, y, 50, w, "yellow"),
		];
	},
	
	Sciana: function(x, y, w, h, color){
		return {
			x: x,
			y: y,
			w: w,
			h: h,
			color: color,
			kolizja: true,
		}
	},
	
	Przejscie: function(x, y, w, h, color){
		return {
			x: x, y: y, w: w, h: h, color: color, hp: 10, kolizja: true, odl: 0
		};
	},
	
	Wrogowie: {
		check: function(dane){
			//Obiekty.Wrogowie.checkP(dane, "wrog2", 2, 200);
			Obiekty.Wrogowie.checkP(dane, "wrog1", 20, 1000);
			Obiekty.Wrogowie.checkP(dane, "wrog2", 5, 1000);
		},
		
		checkP: function(dane, typ, ile, odl){
			let wrog = 0;
			dane.moby.forEach(function(mob){
				if(mob.typ==typ)wrog++;
			})
			for(let i=0; i<ile-wrog; i++){
				let x = __.rand(-odl, odl);
				let y = __.rand(-odl, odl);
				if(x>-20 && x<20) x=50;
				if(y>-20 && y<20) y=50;
				dane.moby.push(Obiekty.Wrogowie.Wrog(dane.gracz.x+x, dane.gracz.y+y, typ));
			}
		},
		Wrog: function(x, y, k){
			if(k=="wrog1"){
				return {
					x: x, y: y, w: 15, h: 15, speed: 0.5, obsesja: {x: x, y: y}, kolizja: true,
					typ: "wrog1", color: "blue", przyjazny: false, oczy: 50, odl: 0, hp: 10, atak: 1
				};
			}else if(k=="wrog2"){
				return {
					x: x, y: y, w: 30, h: 30, speed: 1, obsesja: {x: x, y: y}, kolizja: true,
					typ: "wrog2", color: "blue", przyjazny: false, oczy: 100, odl: 0, hp: 20, atak: 2
				};
			}else if(k=="null"){
				return {
					x: x, y: y, w: 1, h: 1, speed: 0, obsesja: {x: x, y: y},
					typ: "null", color: "#444444", przyjazny: true, oczy: 0, odl: 0, hp: 1, atak: 0
				};
			}else{
				return;
			}
		},
	}
}