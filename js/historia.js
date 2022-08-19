var His = {
	dane: {
		pow: [],
	},
	
	stat: {
		wrog1: 0, wrog11: false, wrog110: false,
		wrog2: 0, wrog21: false, wrog210: false,
		sciana: 0, sciana1: false, sciana10: false,
	},
	
	check: function(dane){
		let t = His.stat;
		
		if(t.wrog1 == 1 && !t.wrog11){
			His.ach("Zabij wroga poziomu 1");
			dane.audio.postemp.cloneNode(true).play();
			t.wrog11 = true;
		}
		if(t.wrog1 == 10 && !t.wrog110){
			His.ach("Zabij 10 wrogów poziomu 1");
			dane.audio.postemp.cloneNode(true).play();
			t.wrog110 = true;
			dane.gracz.hp += 2;
		}
		if(t.wrog2 == 1 && !t.wrog21){
			His.ach("Zabij wroga poziomu 2");
			dane.audio.postemp.cloneNode(true).play();
			t.wrog21 = true;
		}
		if(t.wrog2 == 10 && !t.wrog210){
			His.ach("Zabij 10 wrogów poziomu 2");
			dane.audio.postemp.cloneNode(true).play();
			t.wrog210 = true;
			dane.gracz.hp += 7;
		}
		if(t.sciana == 1 && !t.sciana1){
			His.ach("Zniszcz ścianę");
			dane.audio.postemp.cloneNode(true).play();
			t.sciana1 = true;
		}
		if(t.sciana == 10 && !t.sciana10){
			His.ach("Zniszcz 10 ścian");
			dane.audio.postemp.cloneNode(true).play();
			t.sciana10 = true;
		}
	},
	
	ach: function(jaki){
		His.dane.pow.push({
			co: "ZDOBYTO OSIĄGNIECIE\n"+jaki,
			x: 900,
			y: 20,
		});
		setTimeout(() => {His.dane.pow.shift();}, 3000);
	}
}