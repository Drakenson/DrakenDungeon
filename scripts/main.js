//Objects

//Player
function player(world)
{
	this.position = new Array(2);
	this.health = 100;
	this.mana = 100;
	this.armor = 100;
	this.inventory = new Array(10);
	this.orientation = 0;
	this.showdoors;
	this.setposition = function()
	{
		for (var x = 0; x < world.size; x++)
		{
			for (var y = 0; y < world.size; y++)
			{
				if (world.fields[x][y].substr(0,4) != "0000")
				{
					this.position[0] = x;
					this.position[1] = y;
				}
			}
		}
	}
}

//World
function Worlds(worldsize, scale, minimaldoors, verbose)
{
	this.size = worldsize;
	this.mindoors = minimaldoors;
	this.scale = scale;
	this.fields = new Array(worldsize);
	this.verbose = verbose;
}
	

//Draw Minimap
function drawfield(world, player1)
{
	var scale = world.scale;
	var showdoors = player1.showdoors;
	var canvas = document.getElementById('map');
	canvas.height = world.size * scale;
	canvas.width = world.size * scale;
	var ctx = canvas.getContext("2d");
	
	for (var x = 1; x <= world.size; x++)
	{
		for (var y = 1; y <= world.size; y++)
		{
			var field = world.fields[x][y].slice(0,4);
			if (field != "0000") {
				ctx.fillStyle = "#DEB887";
				ctx.fillRect ((x-1)*scale,(y-1)*scale,scale,scale);
				if (showdoors) {
					if (field.charAt(0) == "0") {
						ctx.beginPath();
						ctx.moveTo((x-1)*scale,						(y-1)*scale);
						ctx.lineTo((x-1)*scale + scale, 			(y-1)*scale);
					} else {
						ctx.beginPath();
						ctx.moveTo((x-1)*scale,						(y-1)*scale);
						ctx.lineTo((x-1)*scale + (scale / 3), 		(y-1)*scale);
						ctx.moveTo((x-1)*scale + (2*(scale / 3)),	(y-1)*scale);
						ctx.lineTo((x-1)*scale + scale, 			(y-1)*scale);
					};
						
					if (field.charAt(1) == "0") {
						ctx.lineTo((x-1)*scale + scale, 			(y-1)*scale + scale);
					} else {
						ctx.lineTo((x-1)*scale + scale, 			(y-1)*scale + (scale / 3));
						ctx.moveTo((x-1)*scale + scale, 			(y-1)*scale + (2*(scale / 3)));
						ctx.lineTo((x-1)*scale + scale, 			(y-1)*scale + (scale));
					};
					if (field.charAt(2) == "0") {
						ctx.lineTo((x-1)*scale, 					(y-1)*scale + scale);
					} else {
						ctx.lineTo((x-1)*scale + (2*(scale / 3)), 	(y-1)*scale + scale);
						ctx.moveTo((x-1)*scale + (scale / 3),		(y-1)*scale + scale);
						ctx.lineTo((x-1)*scale, 					(y-1)*scale + scale);
					};

					if (field.charAt(3) == "0") {
						ctx.lineTo((x-1)*scale, 					(y-1)*scale);
					} else {
						ctx.lineTo((x-1)*scale, 					(y-1)*scale + (2*(scale / 3)));
						ctx.moveTo((x-1)*scale, 					(y-1)*scale + (scale / 3));
						ctx.lineTo((x-1)*scale, 					(y-1)*scale);
					};
					ctx.stroke();
				}
			} else {
				ctx.fillStyle = "#A0522D";
				ctx.fillRect ((x-1)*scale,(y-1)*scale,scale,scale);
				if (showdoors) {ctx.strokeRect ((x-1)*scale,(y-1)*scale,scale,scale);}
			}
			
		}
	}
	ctx.fillStyle = "#FFFF00";
	if (showdoors) {
		ctx.fillRect (((player1.position[0]-1)*scale)+1,((player1.position[1]-1)*scale)+1,scale-2,scale-2);
	} else {
		ctx.fillRect (((player1.position[0]-1)*scale)+0,((player1.position[1]-1)*scale)+0,scale-0,scale-0);
	};
}

//Process Playermovement
function movement(world, e, player1) {
		var clickedX = e.pageX - $("#art").offset().left;
		var clickedY = e.pageY - $("#art").offset().top;
		
		function analyseorientation(way)
		{
			var way = (way + player1.orientation) % 4;
			if (world.fields[player1.position[0]][player1.position[1]].charAt(way) == "1")
			{
				switch(way)
				{
					case 0:
						player1.position[1] -= 1;
						player1.orientation = 0;
						break;
					case 1:
						player1.position[0] += 1;
						player1.orientation = 1;
						break;
					case 2:
						player1.position[1] += 1;
						player1.orientation = 2;
						break;
					case 3:
						player1.position[0] -= 1;
						player1.orientation = 3;
						break;
				}
			}
		}
		if (clickedY > 500)	{player1.orientation = (player1.orientation += 2)%4}
		else if (clickedX < 200) {analyseorientation(3);}
		else if (clickedX < 600) {analyseorientation(0);}
		else {analyseorientation(1);}

		drawrooms(world, player1);
		playerinfo(player1);
		drawfield(world, player1);
}

//Draw Playerstats
function playerinfo(player1)
{
	koordinaten = document.getElementById("player");
	var orientation;
	
	switch(player1.orientation)
	{
		case 0: 
			orientation = "North";
			break;
		case 1: 
			orientation = "East";
			break;
		case 2: 
			orientation = "South";
			break;
		case 3: 
			orientation = "West";
			break;
	}
	
	koordinaten.innerHTML = 
	"<table>"+
	"<tr>"+
	"<tr><td>X:</td><td>"+player1.position[0]+"</td></tr>"+
	"<tr><td>Y:</td><td>"+player1.position[1]+"</td></tr>"+
	"<tr><td>Life:</td><td>"+player1.health+"</td></tr>"+
	"<tr><td>Mana:</td><td>"+player1.mana+"</td></tr>"+
	"<tr><td>Armor:</td><td>"+player1.armor+"</td></tr>"+
	"<tr><td>Orientation:</td><td>"+orientation+"</td></tr>"+
	"</table>";

}

//Start new game (Reloads Map und Player)
function newgame(verbose)
{
	var worldsize = 30;
	var scale = 10;
	var minimaldoors = 1;
	var map1 = new Worlds(worldsize, scale, minimaldoors, verbose);
	map1.fields = worldgen(map1);
	var Hikari = new player(map1);
	Hikari.setposition();
	Hikari.showdoors = true;
	drawfield(map1, Hikari);
	drawrooms(map1, Hikari);
	playerinfo(Hikari);
	$('#art').click(function (e) {movement(map1, e, Hikari)});
}	
	

//jQuery Hooks
$( document ).ready(function() 
{
	newgame(false);
	$( "#divmap" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width: "auto", 
		position: {my: "right top", at: "right top", of: window},
		title: "Minimap",
		resizable: false
	});
	
	$( "#player" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width: "auto", 
		position: {my: "left top", at: "left top", of: window},
		title: "Player",
		resizable: false,
	});


	$( "#mainwindow" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width:"auto",
		position: {my: "center top", at: "center top", of: window},
		title: "Player",
	});
	
	
	$( "#menu" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width: "auto",
		position: {my: "left bottom", at: "left bottom", of: window},
		title: "Options"
	});
	
	$( "#roleplay" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width: "auto",
		position: {my: "right bottom", at: "right bottom", of: window},
		title: "Roleplay"
	});
	
	$('#newgame').click(function() 
	{newgame(false)});
	
	$('#newgameV').click(function() 
	{newgame(true)});
});
