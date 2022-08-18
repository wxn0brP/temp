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
			if(dane.dev){
				Render.border(dane, t.x-t.oczy+t.w/2, t.y-t.oczy+t.h/2, t.oczy*2, t.oczy*2);
				Render.tekst(dane, t.x+t.w/2, t.y+t.h+10, JSON.stringify(t.obsesja)+" id: "+index);
			}
			Render.kwadrat(dane, t.x, t.y, t.w, t.h, t.color);
			Render.tekst(dane, t.x+t.w/2, t.y-5, "hp: "+Math.round(t.hp));
		});
		
		Render.kwadrat(dane, dane.gracz.x, dane.gracz.y, dane.gracz.w, dane.gracz.h, "red");
		if(dane.gracz.kierunek == "prawo"){
			Render.kwadrat(dane, dane.gracz.x+5+dane.gracz.w/2, dane.gracz.y, dane.gracz.w/2, dane.gracz.h/2, "yellow");
		}else if(dane.gracz.kierunek == "lewo"){
			Render.kwadrat(dane, dane.gracz.x-5, dane.gracz.y, dane.gracz.w/2, dane.gracz.h/2, "yellow");
		}else if(dane.gracz.kierunek == "gora"){
			Render.kwadrat(dane, dane.gracz.x, dane.gracz.y-5, dane.gracz.w/2, dane.gracz.h/2, "yellow");
		}else if(dane.gracz.kierunek == "dol"){
			Render.kwadrat(dane, dane.gracz.x, dane.gracz.y+5+dane.gracz.h/2, dane.gracz.w/2, dane.gracz.h/2, "yellow");
		}
		
		if(dane.dev){
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
		Render.kwadrat(dane, 400, 100, 200, 300, "#aaaaaa");
		Render.dymek(dane, 500, 120, "ABY KONTYNÓWAĆ KLIKNIJ \"ESC\"\nNA KLAWIATÓRZE", "black", 12, 20);
	}
};
