var His = {
	dane: {
		pow: [],
	},
	
	stat: {
		wrog1: 0, wrog11: false,
		wrog2: 0, wrog21: false,
		sciana: 0, sciana1: false,
	},
	
	check: function(dane){
		let t = His.stat;
		
		if(t.wrog1 == 1 && !t.wrog11){
			His.ach("Zabij wroga poziomu 1");
			t.wrog11 = true;
		}
		if(t.wrog2 == 1 && !t.wrog21){
			His.ach("Zabij wroga poziomu 2");
			t.wrog21 = true;
		}
		if(t.sciana == 1 && !t.sciana1){
			His.ach("Zniszcz ścianę");
			t.sciana1 = true;
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