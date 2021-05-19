function DrawObject(){
	var canvas = document.getElementById('art');
	var context = canvas.getContext('2d');
	var wallcolor = "#DEB887";
	var linecolor = "#8B4513";
	
	this.backwall = function()
	{
		context.strokeStyle = linecolor;
		context.lineWidth = 3;
		context.strokeRect (200,150,400,300);
		context.fillStyle = wallcolor;
		context.fillRect (200,150,400,300);
	}
	
	this.backdoor = function()
	{
		context.fillStyle = linecolor;
		context.fillRect (350,250,100,200);
	}

	this.leftwall = function()
	{
		context.beginPath();
		context.moveTo(200, 150);
		context.lineTo(0, 0);
		context.lineTo(0, 600);
		context.lineTo(200, 450);
		context.lineTo(200, 150);
		context.lineWidth = 1;
		context.strokeStyle = linecolor;
		context.fillStyle = wallcolor;
		context.fill();
		context.stroke();
	}
	
	this.leftdoor = function()
	{
		context.beginPath();
		context.moveTo(145, 492)
		context.lineTo(80, 540);
		context.lineTo(80, 180);
		context.lineTo(145, 215);
		context.lineTo(145, 490)
		context.fillStyle = linecolor;
		context.fill();
		context.stroke();
	}		
		
	this.rightwall = function()
	{
		context.beginPath();
		context.moveTo(600, 150);
		context.lineTo(800, 0);
		context.lineTo(800, 600);
		context.lineTo(600, 450);
		context.lineTo(600, 150);
		context.lineWidth = 1;
		context.strokeStyle = linecolor;
		context.fillStyle = wallcolor;
		context.fill();
		context.stroke();
	}
	
	this.rightdoor = function()
	{
		context.beginPath();
		context.moveTo(655, 492)
		context.lineTo(720, 540);
		context.lineTo(720, 180);
		context.lineTo(655, 215);
		context.lineTo(655, 490)
		context.fillStyle = linecolor;
		context.fill();
		context.stroke();
	}
	
	this.floor_ceiling = function()
	{
		context.beginPath();
		context.moveTo(200, 150);
		context.lineTo(0, 0);
		context.lineTo(800, 0);
		context.lineTo(600, 150);
		context.lineTo(200, 150);
		
		context.moveTo(800, 600);
		context.lineTo(600, 450);
		context.lineTo(200, 450);
		context.lineTo(0, 600);
		context.lineTo(800, 600);
		
		context.strokeStyle = linecolor;
		context.fillStyle = wallcolor;
		context.fill();
		context.stroke();
	}
	
	this.compass = function(orientation, color)
	{
		context.fillStyle = color;
		context.font="100px Courier";
		switch(orientation)	{
		case 0:
			context.fillText("↑", 371,550);
			break;
		case 1:
			context.fillText("←", 371,550);
			break;
		case 2:
			context.fillText("↓", 371,550);
			break;	
		case 3:
			context.fillText("→", 371,550);
			break;
		}
	}
}

// Draw Main Field		
function DrawRooms(world, player1){
	doors = world.fields[player1.position[0]][player1.position[1]].substr(0,4);
	room = new DrawObject();
	
	var i = 0+player1.orientation;
	if (doors.charAt(i) == "1") 
	{
		room.backwall();
		room.backdoor();
	}
	else
	{
		room.backwall();
	}

	i = (i+1) % 4;
	
	if (doors.charAt(i) == "1") 
	{
		room.rightwall();
		room.rightdoor();
	}
	else
	{
		room.rightwall();
	}

	i = (i+1) % 4;

	if (doors.charAt(i) == "1") 
	{
	}
	else
	{
	}

	i = (i+1) % 4;

	if (doors.charAt(i) == "1") 			
	{
		room.leftwall();
		room.leftdoor();
	}
	else
	{
		room.leftwall();
	}
		
	room.floor_ceiling();
	
	
	if (world.fields[player1.position[0]][player1.position[1]].charAt(6) == world.fields[player1.position[0]][player1.position[1]].charAt(5) && world.fields[player1.position[0]][player1.position[1]].slice(5,7) != "00") {				
		room.compass(player1.orientation, "#800000");
	}
	else if (world.fields[player1.position[0]][player1.position[1]].charAt(4) == world.fields[player1.position[0]][player1.position[1]].charAt(5) && world.fields[player1.position[0]][player1.position[1]].slice(4,6) != "00") {	
		room.compass(player1.orientation, "#008000");
	}
	else {room.compass(player1.orientation, "#FFFFFF");}

}

//Draw Minimap
function DrawMinimap(world, player1){
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
			var visitedfield = world.fields[x][y].charAt(7);
			if (field != "0000") {
				ctx.fillStyle = "#DEB887";
				ctx.fillRect ((x-1)*scale,(y-1)*scale,scale,scale);
				if (showdoors || visitedfield == "1") {
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
				//ctx.fillStyle = "#A0522D";
				ctx.fillStyle = "#DEB887";
				ctx.fillRect ((x-1)*scale,(y-1)*scale,scale,scale);
				//ctx.strokeRect ((x-1)*scale,(y-1)*scale,scale,scale);
			}
			
			if (world.fields[x][y].charAt(6) == world.fields[x][y].charAt(5) && world.fields[x][y].slice(5,7) != "00") {				
				ctx.fillStyle = "#800000";
				ctx.fillRect ((x-1)*scale+4,(y-1)*scale+4,scale-8,scale-8);
			}
			if (world.fields[x][y].charAt(4) == world.fields[x][y].charAt(5) && world.fields[x][y].slice(4,6) != "00") {	
				ctx.fillStyle = "#008000";
				ctx.fillRect ((x-1)*scale+4,(y-1)*scale+4,scale-8,scale-8);
			}
		}
	}
	ctx.fillStyle = "#FF5500";
	switch(player1.orientation)
	{
		case 0:
			ctx.fillRect (((player1.position[0]-1)*scale)+4,((player1.position[1]-1)*scale)+0,scale-8,scale-8);
			break;
		case 1:
			ctx.fillRect (((player1.position[0]-1)*scale)+8,((player1.position[1]-1)*scale)+4,scale-8,scale-8);
			break;
		case 2:
			ctx.fillRect (((player1.position[0]-1)*scale)+4,((player1.position[1]-1)*scale)+8,scale-8,scale-8);
			break;
		case 3:
			ctx.fillRect (((player1.position[0]-1)*scale)+0,((player1.position[1]-1)*scale)+4,scale-8,scale-8);
			break;
	}
	ctx.fillStyle = "#CCFF00";
	ctx.fillRect (((player1.position[0]-1)*scale)+3,((player1.position[1]-1)*scale)+3,scale-6,scale-6);
}
