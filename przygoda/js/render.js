var Render = {
	dane: {},
	
	render: function(dane){
		dane.canvas.Ctx.setTransform(1,0,0,1,0,0);
		dane.canvas.Ctx.clearRect(0, 0, dane.canvas.Canvas.width, dane.canvas.Canvas.height);
		dane.canvas.Ctx.translate(-(dane.gracz.x-dane.canvas.Canvas.width/2), -(dane.gracz.y-dane.canvas.Canvas.height/2));
		
		dane.teren.forEach(function(t){
			Render.kwadrat(dane, t.x, t.y, t.w, t.h, t.color);
		});
		
		dane.przejscia.forEach(function(t){
			Render.kwadrat(dane, t.x, t.y, t.w, t.h, t.color);
			Render.dymek(dane, t.x+10, t.y+t.h/2, "hp:\n"+Math.round(t.hp), "#112A46");
		});
		
		dane.moby.forEach(function(t, index){
			if(dane.config.dev){
				Render.border(dane, t.x-t.oczy+t.w/2, t.y-t.oczy+t.h/2, t.oczy*2, t.oczy*2);
				Render.tekst(dane, t.x+t.w/2, t.y+t.h+10, JSON.stringify(t.obsesja)+" id: "+index);
			}
			Render.kwadrat(dane, t.x, t.y, t.w, t.h, t.color);
			Render.tekst(dane, t.x+t.w/2, t.y-5, "hp: "+Math.round(t.hp));
		});
		
		Render.kwadrat(dane, dane.gracz.x, dane.gracz.y, dane.gracz.w, dane.gracz.h, "red");
		let x = dane.gracz.x;
		let y = dane.gracz.y;
		if(dane.gracz.kierunek == "prawo"){
			x += dane.gracz.w;
			y += dane.gracz.h/2-2.5;
		}else if(dane.gracz.kierunek == "lewo"){
			x -= 5;
			y += dane.gracz.h/2-2.5;
		}else if(dane.gracz.kierunek == "gora"){
			y -= 5;
			x += dane.gracz.w/2-2.5;
		}else if(dane.gracz.kierunek == "dol"){
			y += dane.gracz.h;
			x += dane.gracz.w/2-2.5;
		}
		Render.kwadrat(dane, x, y, 5, 5, "yellow");
		
		if(dane.config.dev){
			Render.border(
				dane,
				dane.gracz.x-dane.gracz.oczy+dane.gracz.w/2,
				dane.gracz.y-dane.gracz.oczy+dane.gracz.h/2,
				dane.gracz.oczy*2,
				dane.gracz.oczy*2
			);
		}
		
		dane.canvas.Ctx.setTransform(1,0,0,1,0,0);
		
		His.dane.pow.forEach(function(t){
			Render.dymek(dane, t.x, t.y, t.co, "white", 14);
		});
	},
	
	kwadrat: function(dane, x, y, w, h, color){
		dane.canvas.Ctx.beginPath();
		dane.canvas.Ctx.fillStyle = color;
		dane.canvas.Ctx.fillRect(x, y, w, h);
		dane.canvas.Ctx.fill();
		dane.canvas.Ctx.closePath();
	},
	
	border: function(dane, x, y, w, h){
		dane.canvas.Ctx.beginPath();
		dane.canvas.Ctx.fillStyle = "rgba(0%, 0%, 0%, 0)";
		dane.canvas.Ctx.rect(x, y, w, h);
		dane.canvas.Ctx.fill();
		dane.canvas.Ctx.stroke();
		dane.canvas.Ctx.closePath();
	},
	
	tekst: function(dane, x, y, t, color="white", r=10){
		dane.canvas.Ctx.font = r+"px Arial";
		dane.canvas.Ctx.fillStyle = color;
		dane.canvas.Ctx.textAlign = "center";
		dane.canvas.Ctx.fillText(t, x, y)
	},
	
	linia: function(dane, x, y, x2, y2){
		dane.canvas.Ctx.beginPath();
		dane.canvas.Ctx.moveTo(x, y);
		dane.canvas.Ctx.lineTo(x2, y2)
		dane.canvas.Ctx.moveTo(0, 0);
		dane.canvas.Ctx.stroke();
		dane.canvas.Ctx.closePath();
	},
	
	dymek: function(dane, x, y, co, color, r=10, libr=15){
		var lines = co.split('\n');

		for(let i=0; i<lines.length; i++){
			Render.tekst(dane, x, y + (i*libr), lines[i], color, r);
		}
	},
	
	menu: function(dane){
		Render.render(dane);
		Akt.info(dane);
		let mysz = Fizyka.dane.myszka;
		let myszObj = {x: mysz.mx, y: mysz.my, w: 20, h: 20};
		Render.kwadrat(dane, 400, 100, 200, 300, "#aaaaaa");

		let play = {
			x: 500, y: 130, w: 100, h: 50,
		}
		let hp = {
			x: 445, y: 185, w: 85, h: 50,
		}
		let scianaM = {
			x: 555, y: 185, w: 85, h: 50,
		}

		let resetPos = {
			x: 445, y: 330, w: 85, h: 30,
		}
		let randPos = {
			x: 555, y: 330, w: 85, h: 30,
		}
		let muzyka = {
			x: 445, y: 370, w: 85, h: 30,
		}
		let instrokcja = {
			x: 555, y: 370, w: 85, h: 30,
		}

		let rend = function(dan, napis){
			Render.dymek(dane, dan.x, dan.y, napis, "black", 12, 20);
			Render.border(dane, dan.x-dan.w/2, dan.y-dan.h/2, dan.w, dan.h);
		}
		rend(play, "kontunuj");
		rend(hp, "kup hp -> 10");
		rend(scianaM, "kup moc:\n\"ŚCIANA\" -> 10");
		rend(resetPos, "reset pozycji");
		rend(randPos, "losuj pozycje");
		rend(muzyka, "muzyka");
		rend(instrokcja, "instrokcja");


		if(mysz.click){
			mysz.click = false;
			if(Fizyka.kolizjaD(hp, myszObj)){
				if(dane.gracz.coin >= 10){
					dane.gracz.coin -= 10;
					dane.gracz.hp++;
				}
			}
			if(Fizyka.kolizjaD(scianaM, myszObj)){
				if(dane.gracz.coin >= 10){
					dane.gracz.coin -= 10;
					dane.gracz.moce.sciana += 5;
				}
			}
			if(Fizyka.kolizjaD(play, myszObj)){
				dane.pauza = false;
			}
			if(Fizyka.kolizjaD(muzyka, myszObj)){
				Silnik.muzyka(dane);
			}
			if(Fizyka.kolizjaD(resetPos, myszObj)){
				dane.gracz.x = 495;
				dane.gracz.y = 245;
			}
			if(Fizyka.kolizjaD(randPos, myszObj)){
				dane.gracz.x = __.rand(-1000, 1200);
				dane.gracz.y = __.rand(-1000, 1200);
			}
			if(Fizyka.kolizjaD(instrokcja, myszObj)){
				alert(
					"--STEROWANIE--\n"+
					"chodzenie: WSAD lub strzałki\n"+
					"atak: spacja\n"+
					"moc \"Sciana\": P\n"+
					"pauza: ESC\n"+
					"--CEL--\n"+
					"aktualnie gra nie ma celu :)"
				);
			}
		}
	}
};
