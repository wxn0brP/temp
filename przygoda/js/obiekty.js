var Obiekty = {
	dane: {},
	
	Gracz: function(){
		return {
			x: 200,
			y: 100,
			w: 10,
			h: 10,
			speed: 2,
			typ: "gracz",
			hp: 50,
			atak: 1,
			oczy: 70,
			kolizja: true,
		}
	},
	
	Moby: function(){
		return [
			Obiekty.Wrogowie.Wrog(10000, 10000, "null"),
		];
	},
	
	Teren: function(){
		return [
			Obiekty.Sciana(300, 100, 200, 50, "yellow"),
			Obiekty.Sciana(550, 100, 150, 50, "yellow"),
		];
	},
	
	Przejscia: function(){
		return [
			Obiekty.Przejscie(500, 100, 50, 50, "#F4C370"),
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