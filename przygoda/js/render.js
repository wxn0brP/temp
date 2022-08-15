var Render = {
	dane: {},
	
	render: function(dane){
		dane.canvas.Ctx.clearRect(0, 0, dane.canvas.Canvas.width, dane.canvas.Canvas.height);
		
		dane.teren.forEach(function(t){
			Render.kwadrat(dane, t.x, t.y, t.w, t.h, t.color);
		});
		
		dane.przejscia.forEach(function(t){
			Render.kwadrat(dane, t.x, t.y, t.w, t.h, t.color);
			Render.tekst(dane, t.x+10, t.y+t.h/2, "hp: "+t.hp);
		});
		
		dane.moby.forEach(function(t, index){
			if(dane.dev){
				Render.border(dane, t.x-t.oczy+t.w/2, t.y-t.oczy+t.h/2, t.oczy*2, t.oczy*2);
				Render.tekst(dane, t.x+t.w/2-50, t.y+t.h+10, JSON.stringify(t.obsesja)+" id: "+index);
			}
			Render.kwadrat(dane, t.x, t.y, t.w, t.h, t.color);
			Render.tekst(dane, t.x+t.w/2-15, t.y-5, "hp: "+t.hp);
		});
		Render.kwadrat(dane, dane.gracz.x, dane.gracz.y, dane.gracz.w, dane.gracz.h, "red");
		if(dane.dev){
			Render.border(
				dane,
				dane.gracz.x-dane.gracz.oczy+dane.gracz.w/2,
				dane.gracz.y-dane.gracz.oczy+dane.gracz.h/2,
				dane.gracz.oczy*2,
				dane.gracz.oczy*2
			);
		}
		Fizyka.dane.linia.t.forEach(function(t){
			Render.linia(dane, t.gx, t.gy, t.x, t.y);
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
	
	tekst: function(dane, x, y, t, r=10){
		dane.canvas.Ctx.font = r+"px Arial";
		dane.canvas.Ctx.fillStyle = "white";
		dane.canvas.Ctx.fillText(t, x, y)
	},
	
	linia: function(dane, x, y, x2, y2){
		dane.canvas.Ctx.beginPath();
		dane.canvas.Ctx.moveTo(x, y);
		dane.canvas.Ctx.lineTo(x2, y2)
		dane.canvas.Ctx.moveTo(0, 0);
		dane.canvas.Ctx.stroke();
		dane.canvas.Ctx.closePath();
	}
};
