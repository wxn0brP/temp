var Fizyka = {
	dane: {
		myszka: {mx: 0, my: 0, click: false,},
	},
	
	graczIni: function(dane){
		document.onkeydown = function(event){
			Fizyka.nacisnieto[event.keyCode] = true;
		}
		document.onkeyup = function(event){
			Fizyka.nacisnieto[event.keyCode] = false;
		}
		document.addEventListener('mousemove', function(evt){
			let pos = __.mousePos(dane.canvas.Canvas, evt);
			Fizyka.dane.myszka.mx = pos.x;
			Fizyka.dane.myszka.my = pos.y;
		});
		document.addEventListener('mouseup', function(evt){
			Fizyka.dane.myszka.click = true;
		});
	},
	
	nacisnieto: {},
	
	kolizjaTeren: function(dane, obj){
		let zwr = false;
		dane.teren.forEach(function(t){
			if(Fizyka.kolizjaObj(obj, t)){
				zwr = true;
			}
		});
		dane.przejscia.forEach(function(t){
			if(Fizyka.kolizjaObj(obj, t)){
				zwr = true;
			}
		});
		return zwr;
	},
	
	kolizjaObj: function(obj, t){
		if(Fizyka.kolizjaD(obj, t) && t.kolizja){
			if(obj.x<=t.x){
				obj.x = t.x - obj.w;
			}
			if(obj.x>=t.x+t.w-obj.w){
				obj.x = t.x + t.w;
			}
			if(obj.y<=t.y){
				obj.y = t.y - obj.h;
			}
			if(obj.y>=t.y+t.h-obj.h){
				obj.y = t.y + t.h;
			}
			return true;
		}
		return false;
	},
	
	strzal: function(dane, obj){
		var zwr = false;
		dane.moby.forEach(function(t){
			if(Fizyka.kolizjaD(obj, t)){
				zwr = t;
			}
		});
		dane.przejscia.forEach(function(t){
			if(Fizyka.kolizjaD(obj, t)){
				zwr = t;
			}
		});
		return zwr;
	},
	checkStrzal: function(dane, o){
		let x = dane.gracz.x;
		let y = dane.gracz.y;
		if(dane.gracz.kierunek == "prawo"){
			x += o;
		}else if(dane.gracz.kierunek == "lewo"){
			x -= o;
		}else if(dane.gracz.kierunek == "gora"){
			y -= o;
		}else if(dane.gracz.kierunek == "dol"){
			y += o;
		}
		return Fizyka.strzal(dane, {
			x: x, y: y,
			w: 5, h: 5
		})
	},
	
	kolizjaD: function(t1, t2){
		return !(
			t1.x > t2.x + t2.w ||
			t1.x + t1.w < t2.x ||
			t1.y > t2.y + t2.h ||
			t1.y + t1.h < t2.y
		)
	},
	
};