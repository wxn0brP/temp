var danes = {};

var Akt = {
	dane: {},
	
	akt: function(dane){
		if(Fizyka.nacisnieto[27]){
			Fizyka.nacisnieto[27] = false;
			dane.pauza = true;
			Fizyka.dane.myszka.click = false;
		}
		if(Fizyka.nacisnieto[37] || Fizyka.nacisnieto[65]){
			dane.gracz.x -= dane.gracz.speed;
			dane.gracz.kierunek = "lewo";
		}
		if(Fizyka.nacisnieto[39] || Fizyka.nacisnieto[68]){
			dane.gracz.x += dane.gracz.speed;
			dane.gracz.kierunek = "prawo";
		}
		if(Fizyka.nacisnieto[38] || Fizyka.nacisnieto[87]){
			dane.gracz.y -= dane.gracz.speed;
			dane.gracz.kierunek = "gora";
		}
		if(Fizyka.nacisnieto[40] || Fizyka.nacisnieto[83]){
			dane.gracz.y += dane.gracz.speed;
			dane.gracz.kierunek = "dol";
		}
		if(Fizyka.nacisnieto[32]){
			let strazly = [];
			for(let i=5; i<51; i+=5){
				strazly.push(Fizyka.checkStrzal(dane, i));
			}
			strazly.forEach(function(traf){
				if(traf){
					if(traf.odl < dane.gracz.oczy){
						traf.hp -= dane.gracz.atak / 10;
					}
				}
			});
		}
		if(Fizyka.nacisnieto[80]){//p
			if(dane.gracz.moce.sciana > 0){
				dane.gracz.moce.sciana--;
				Fizyka.nacisnieto[80] = false;
				let x = dane.gracz.x;
				let y = dane.gracz.y;
				if(dane.gracz.kierunek == "prawo"){
					x += 15 + dane.gracz.w;
				}else if(dane.gracz.kierunek == "lewo"){
					x -= 35;
				}else if(dane.gracz.kierunek == "dol"){
					y += 15 + dane.gracz.h;
				}else if(dane.gracz.kierunek == "gora"){
					y -= 15 + dane.gracz.h;
				}
				dane.teren.push(Obiekty.Sciana(x, y, 20, 20, "#dddd11"));
			}
		}
		
		dane.przejscia.forEach(function(p, index, object){
			if(p.hp <= 0){
				object.splice(index, 1);
				His.stat.sciana++;
			}
			let odl = __.odl(dane.gracz.x, dane.gracz.y, p.x+p.w/2, p.y+p.h/2);
			p.odl = odl;
		});
		
		Obiekty.Wrogowie.check(dane);
		Wrog.akt(dane);
		
		if(dane.gracz.hp <= 0 && !dane.config.dev){
			alert("def");
			location.href = '';
			return;
		}
		
		Fizyka.kolizjaTeren(dane, dane.gracz);
		Akt.info(dane);
		His.check(dane);
		
		danes = dane;
	},
	
	pauza: function(dane){
		if(Fizyka.nacisnieto[27]){
			Fizyka.dane.myszka.click = false;
			Fizyka.nacisnieto[27] = false;
			dane.pauza = false;
		}
		
	},

	info: function(dane){
		dane.canvas.info.innerHTML =
			" hp: "+Math.floor(dane.gracz.hp)+
			" coin: "+Math.floor(dane.gracz.coin)+
			"<br />moce: sciana:"+Math.floor(dane.gracz.moce.sciana)
		;
	}
};