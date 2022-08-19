var Wrog = {
	dane: {},
	
	akt: function(dane){
		dane.moby.forEach(function(mob, index, object){
			if(!dane.config.wrog) return;
			if(mob.typ == "null") return;
			if(mob.hp <= 0){//kill
				object.splice(index, 1);
				switch(mob.typ){
					case "wrog1":
						dane.gracz.hp += __.rand(0, 200) == 1 ? 7 : 0;
						dane.gracz.coin++;
						His.stat.wrog1++;
					break;
					case "wrog2":
						dane.gracz.hp += __.rand(0, 200) == 1 ? 14 : 1;
						dane.gracz.coin += 2;
						His.stat.wrog2++;
					break;
				}
			}
			
			let odl = __.odl(dane.gracz.x, dane.gracz.y, mob.x+mob.w/2, mob.y+mob.h/2);
			mob.odl = odl;
			
			//obsesja
			if(odl < mob.oczy){//gracz w polu
				mob.obsesja.x = dane.gracz.x;
				mob.obsesja.y = dane.gracz.y;
			}
			if(mob.x > mob.obsesja.x-2 && mob.x < mob.obsesja.x+2 && mob.y > mob.obsesja.y-2 && mob.y < mob.obsesja.y+2){//nowa obsesja
				mob.obsesja.x += __.rand(-100, 100);
				mob.obsesja.y += __.rand(-100, 100);
			}
			if(Fizyka.kolizjaTeren(dane, mob)){//zablokowanie z terenem
				mob.obsesja.x += __.rand(-100, 100);
				mob.obsesja.y += __.rand(-100, 100);
			}

			//atak lub move
			if(!Fizyka.kolizjaD(dane.gracz, mob)){//move if brak kolizji z graczem
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
		});
		
	},
}