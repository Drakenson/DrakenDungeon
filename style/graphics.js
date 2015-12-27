function drawObject()
{
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
	
	this.compass = function(orientation)
	{
		context.fillStyle = "#E6E6FA";
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
	
	
function drawrooms(world, player1)
{
	doors = world.fields[player1.position[0]][player1.position[1]].substr(0,4);
	room = new drawObject();
	
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
	room.compass(player1.orientation);

}
