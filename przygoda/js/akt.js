var danes = {};

var Akt = {
	dane: {},
	
	akt: function(dane){
		if(Fizyka.nacisnieto[27]){
			Fizyka.nacisnieto[27] = false;
			dane.pauza = true;
			setTimeout(() => {
				Render.menu(dane);
			}, 100);
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
		
		if(dane.gracz.hp <= 0 && !dane.dev){
			alert("def");
			location.href = '';
			return;
		}
		
		Fizyka.kolizjaTeren(dane, dane.gracz);
		
		dane.info.innerHTML =
			"hp: "+Math.floor(dane.gracz.hp)+
			(!dane.dev ? "" : 
				""//"<br/>"+JSON.stringify(Fizyka.dane.myszka)
			)
		;
		His.check(dane);
		
		danes = dane;
	},
	
	pauza: function(dane){
		if(Fizyka.nacisnieto[27]){
			Fizyka.nacisnieto[27] = false;
			dane.pauza = false;
		}
		
	}
};