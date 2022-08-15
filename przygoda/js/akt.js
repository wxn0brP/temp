var danes = {};

var Akt = {
	dane: {},
	
	akt: function(dane){
		if(Fizyka.nacisnieto[37]){
			dane.gracz.x -= dane.gracz.speed;
		}
		if(Fizyka.nacisnieto[39]){
			dane.gracz.x += dane.gracz.speed;
		}
		if(Fizyka.nacisnieto[38]){
			dane.gracz.y -= dane.gracz.speed;
		}
		if(Fizyka.nacisnieto[40]){
			dane.gracz.y += dane.gracz.speed;
		}
		
		dane.przejscia.forEach(function(p, index, object){
			if(p.hp <= 0){
				object.splice(index, 1);
			}
			let odl = __.odl(dane.gracz.x, dane.gracz.y, p.x+p.w/2, p.y+p.h/2);
			p.odl = odl;
		});
		
		dane.moby.forEach(function(mob, index, object){
			if(!dane.config.wrog) return;
			if(mob.typ == "null") return;
			if(mob.hp <= 0){
				object.splice(index, 1);
			}
			
			let odl = __.odl(dane.gracz.x, dane.gracz.y, mob.x+mob.w/2, mob.y+mob.h/2);
			mob.odl = odl;
			if(odl < mob.oczy){//gracz w polu
				mob.obsesja.x = dane.gracz.x;
				mob.obsesja.y = dane.gracz.y;
			}
			if(!Fizyka.kolizjaD(dane.gracz, mob)){//move brak kolizji z graczem
				if(mob.obsesja.x > mob.x){
					mob.x += mob.speed;
				}else if(mob.obsesja.x < mob.x){
					mob.x -= mob.speed;
				}
				if(mob.obsesja.y > mob.y){
					mob.y += mob.speed;
				}else if(mob.obsesja.y < mob.y){
					mob.y -= mob.speed;
				}
			}else{
				dane.gracz.hp = __.kolo(dane.gracz.hp-mob.atak/30, 2);
			}
			
			if(mob.x > mob.obsesja.x-2 && mob.x < mob.obsesja.x+2){//x == obsesja.x
				if(mob.obsesja.x == dane.gracz.x) return;
				mob.x = mob.obsesja.x;
			}
			if(mob.y > mob.obsesja.y-2 && mob.y < mob.obsesja.y+2){//y == obsesja.y
				if(mob.obsesja.y == dane.gracz.y) return;
				mob.y = mob.obsesja.y;
			}
			if(mob.x > mob.obsesja.x-2 && mob.x < mob.obsesja.x+2 && mob.y > mob.obsesja.y-2 && mob.y < mob.obsesja.y+2){//nowa obsesja
				mob.obsesja.x += __.rand(-100, 100);
				mob.obsesja.y += __.rand(-100, 100);
			}
			if(Fizyka.kolizjaTeren(dane, mob)){//zablokowanie
				mob.obsesja.x += __.rand(-100, 100);
				mob.obsesja.y += __.rand(-100, 100);
			}
		})
		Obiekty.Wrogowie.check(dane);
		
		if(dane.gracz.hp <= 0 && !dane.dev){
			alert("def");
			location.href = '';
			return;
		}
		
		Fizyka.kamera(dane);
		Fizyka.kolizjaTeren(dane, dane.gracz);
		
		dane.info.innerHTML =
			"hp: "+Math.floor(dane.gracz.hp)+
			(!dane.dev ? "" : 
				"<br/>"+JSON.stringify(Fizyka.dane.myszka)
			)
		;
		danes = dane;
	},
	
};

document.addEventListener("keydown", Fizyka.graczMove);