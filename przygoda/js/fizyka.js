var Fizyka = {
	dane: {
		myszka: {mx: 0, my: 0},
		linia: {t: [], x: 0, y: 0},
	},
	
	graczIni: function(dane){
		document.onkeydown = function(event){
			Fizyka.nacisnieto[event.keyCode] = true;
		}
		document.onkeyup = function(event){
			Fizyka.nacisnieto[event.keyCode] = false;
		}
		document.addEventListener('mousemove', function(evt){
			var rect = dane.canvas.Canvas.getBoundingClientRect();
			var scaleX = dane.canvas.Canvas.width / rect.width;
			var scaleY = dane.canvas.Canvas.height / rect.height;
			var mx = Math.round((evt.clientX - rect.left) * scaleX);
			var my = Math.round((evt.clientY - rect.top) * scaleY);
			
			Fizyka.dane.myszka.mx = mx;
			Fizyka.dane.myszka.my = my;
		});
		
		document.addEventListener('mouseup', function(evt){
			var rect = dane.canvas.Canvas.getBoundingClientRect();
			var scaleX = dane.canvas.Canvas.width / rect.width;
			var scaleY = dane.canvas.Canvas.height / rect.height;
			var mx = Math.round((evt.clientX - rect.left) * scaleX);
			var my = Math.round((evt.clientY - rect.top) * scaleY);
			
			var traf = Fizyka.strzal(dane, {
				x: mx,
				y: my,
				w: 5,
				h: 5
			})
			if(traf){
				if(traf.odl < dane.gracz.oczy){
					traf.hp -= dane.gracz.atak;
				}
			}
			Fizyka.dane.linia.t.push({
				x: mx,
				y: my,
				gx: dane.gracz.x,
				gy: dane.gracz.y,
			})
			setTimeout(() => {Fizyka.dane.linia.t.shift();}, 300);
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
	
	kolizjaD: function(obj, t){
		if(obj.x < t.x + t.w && obj.x + obj.w > t.x && obj.y < t.y + t.h && obj.h + obj.y > t.y) return true;
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
	
	kamera: function(dane){
		let szyb = dane.gracz.speed;
		if(dane.gracz.x > dane.canvas.Canvas.width - 100){
			dane.gracz.x -= szyb;
			dane.teren.forEach(function(t){
				t.x -= szyb;
			});
			dane.moby.forEach(function(t){
				t.x -= szyb;
				t.obsesja.x -= szyb;
			});
			dane.przejscia.forEach(function(t){
				t.x -= szyb;
			});
		}
		if(dane.gracz.x < 100){
			dane.gracz.x += szyb;
			dane.teren.forEach(function(t){
				t.x += szyb;
			});
			dane.moby.forEach(function(t){
				t.x += szyb;
				t.obsesja.x += szyb;
			});
			dane.przejscia.forEach(function(t){
				t.x += szyb;
			});
		}
		
		if(dane.gracz.y > dane.canvas.Canvas.height - 50){
			dane.gracz.y -= szyb;
			dane.teren.forEach(function(t){
				t.y -= szyb;
			});
			dane.moby.forEach(function(t){
				t.y -= szyb;
				t.obsesja.y -= szyb;
			});
			dane.przejscia.forEach(function(t){
				t.y -= szyb;
			});
		}
		if(dane.gracz.y < 50){
			dane.gracz.y += szyb;
			dane.teren.forEach(function(t){
				t.y += szyb;
			});
			dane.moby.forEach(function(t){
				t.y += szyb;
				t.obsesja.y += szyb;
			});
			dane.przejscia.forEach(function(t){
				t.y += szyb;
			});
		}
	},
	
};