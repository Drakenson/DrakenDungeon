//Objects

//Player
function PlayerObject(world){
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
function WorldObject(worldsize, scale, minimaldoors, minimalrooms, verbose){
	this.size = worldsize;
	this.mindoors = minimaldoors;
	this.minrooms = minimalrooms;
	this.scale = scale;
	this.fields = "";
	this.verbose = verbose;
}
	
//Directions: 
//0 = North
//1 = East
//2 = South
//3 = West

//Process Playermovement
function ClickMovement(world, e, player1) {
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
		world.fields[player1.position[0]][player1.position[1]] = world.fields[player1.position[0]][player1.position[1]].slice(0,7) + "1";
		DrawRooms(world, player1);
		playerinfo(player1);
		DrawMinimap(world, player1);
}

function ButtonMovement(world, btn, keypress, player1){
	
	console.log(btn);
	if (keypress) {
		switch (btn)
		{
			case 37:
				btn = 5;
				break;
			case 38:
				btn = 0;
				break;
			case 39:
				btn = 6;
				break;
			case 40:
				btn = 2;
				break;
		}
	} 
	
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
	
	if (btn == 2) {player1.orientation = (player1.orientation += 2)%4}
	else if (btn == 3) {analyseorientation(3);}
	else if (btn == 0) {analyseorientation(0);}
	else if (btn == 1) {analyseorientation(1);}
	else if (btn == 6) {player1.orientation = (player1.orientation += 1)}
	else if (btn == 5) {player1.orientation = (player1.orientation -= 1)}
	if (player1.orientation < 0) {player1.orientation = 3}
	if (player1.orientation > 3) {player1.orientation = 0}
	world.fields[player1.position[0]][player1.position[1]] = world.fields[player1.position[0]][player1.position[1]].slice(0,7) + "1";
	DrawRooms(world, player1);
	playerinfo(player1);
	DrawMinimap(world, player1);
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

//WIP
function SaveGame(map, player){
	console.log(map);
	savemap = new WorldObject(map.size, map.scale, map.mindoors, map.verbose);
	WorldBuilder(savemap);
	
	for (var x = 0; x <= map.size+1; x++)
	{
		for (var y = 0; y <= map.size+1; y++)
		{
			savemap.fields[x][y] = parseInt(savemap.fields[x][y],2);
		}
	}
	console.log(savemap);
	
	savemap2 = new WorldObject(map.size, map.scale, map.mindoors, map.verbose);
	WorldBuilder(savemap2);
	
	
	for (var x = 0; x <= map.size+1; x++)
	{
		for (var y = 0; y <= map.size+1; y++)
		{
			savemap2.fields[x][y] = savemap.fields[x][y].toString(2);
		}
	}
	console.log(savemap2);
}

//Start new game (Reloads Map und Player)
function StartNewGame(verbose){
	var worldsize = 30;
	var scale = 15;
	var mindoors = 1;
	var minrooms = 200;
	var map1 = new WorldObject(worldsize, scale, mindoors, minrooms, verbose);
	WorldBuilder(map1);

	var Hikari = new PlayerObject(map1);
	Hikari.setposition();
	Hikari.showdoors = false;
	DrawMinimap(map1, Hikari);
	DrawRooms(map1, Hikari);
	playerinfo(Hikari);
	$('#art').click(function (e) {ClickMovement(map1, e, Hikari)});
	$('.controlbtn').click(function(){ButtonMovement(map1, this.id.charAt(6), false, Hikari)});
	$(window).keydown(function(){ButtonMovement(map1, parseInt(event.which,10), true, Hikari)});
	$('#savegame').click(function(){SaveGame(map1, Hikari)});
}	
	

//jQuery Hooks
$( document ).ready(function() {
	StartNewGame(false);
	$( "#divmap" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width: "auto", 
		position: {my: "right top", at: "right top", of: "#maze"},
		title: "Minimap",
		resizable: false
	});
	
	$( "#player" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width: "auto", 
		position: {my: "left top", at: "left top", of: "#maze"},
		title: "Player",
		resizable: false,
	});


	$( "#mainwindow" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width:"auto",
		position: {my: "center top", at: "center top", of: "#maze"},
		title: "Player",
	});
	
	
	$( "#menu" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width: "auto",
		position: {my: "left bottom", at: "left bottom", of: "#maze"},
		title: "Options"
	});
	
	$( "#roleplay" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width: "auto",
		position: {my: "right bottom", at: "right bottom", of: "#maze"},
		title: "Roleplay"
	});
	
	$( "#control" ).dialog(
	{
		dialogClass: "no-close",
		height:"auto", 
		width: "auto",
		position: {my: "bottom", at: "bottom", of: "#maze"},
		title: "Control"
	});
	
	$('#newgame').click(function() 
	{StartNewGame(false)});
	
	$('#newgameV').click(function() 
	{StartNewGame(true)});
});
