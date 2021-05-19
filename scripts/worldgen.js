function RoomWalker(world, x, y, origin, worldsize, mindoors, verbose)
{
	if (verbose) console.log("Generating "+x+"/"+y+".");
	do {
	
		var northdoor = Math.round(Math.random());
		var eastdoor = Math.round(Math.random());
		var southdoor = Math.round(Math.random());
		var westdoor = Math.round(Math.random());
		var specials1 = Math.trunc((Math.random()*9))
		var specials2 = Math.trunc((Math.random()*9))
		var specials3 = Math.trunc((Math.random()*9))
		var visited = 0;
		
		//0 = North
		//1 = East
		//2 = South
		//3 = West
		world.fields[x][y] = String(northdoor) + String(eastdoor) + String(southdoor) + String(westdoor) +  String(specials1) + String(specials2) + String(specials3) + String(visited);
		if (verbose) console.log("Working on "+world.fields[x][y]+" with "+analysefield(world.fields[x][y])+" Doors.");
		
		} 
		while (analysefield(world.fields[x][y]) < mindoors && nextRoomAvailable(world, x, y));
		if (verbose) console.log("Found Solution.");
		
		if (world.fields[x][y-1].charAt(2) == "0" && world.fields[x][y-1].substring(0,4) != "0000") northdoor = 0;
		if (world.fields[x+1][y].charAt(3) == "0" && world.fields[x+1][y].substring(0,4) != "0000") eastdoor = 0;
		if (world.fields[x][y+1].charAt(0) == "0" && world.fields[x][y+1].substring(0,4) != "0000") southdoor = 0;
		if (world.fields[x-1][y].charAt(1) == "0" && world.fields[x-1][y].substring(0,4) != "0000") westdoor = 0;
		
		if (world.fields[x][y-1].charAt(2) == "1") northdoor = 1;
		if (world.fields[x+1][y].charAt(3) == "1") eastdoor = 1;
		if (world.fields[x][y+1].charAt(0) == "1") southdoor = 1;
		if (world.fields[x-1][y].charAt(1) == "1") westdoor = 1;
		
		if (x == 1) westdoor = 0;
		if (y == 1) northdoor = 0;
		if (x == worldsize) eastdoor = 0;
		if (y == worldsize) southdoor = 0;
		
		world.fields[x][y] = "00000000";
		world.fields[x][y] = String(northdoor) + String(eastdoor) + String(southdoor) + String(westdoor) +  String(specials1) + String(specials2) + String(specials3) + String(visited);
		if (verbose) console.log("Generated Number is "+world.fields[x][y]+".");
	
		if (origin != 0 && world.fields[x][y-1].substring(0,4) == "0000" && northdoor == 1 && y-1 > 0) 			{RoomWalker(world, x,		y-1,	2, worldsize, mindoors, verbose)};
		if (origin != 1 && world.fields[x+1][y].substring(0,4) == "0000" && eastdoor  == 1 && x+1 <= worldsize)	{RoomWalker(world, x+1,	y, 		3, worldsize, mindoors, verbose)};
		if (origin != 2 && world.fields[x][y+1].substring(0,4) == "0000" && southdoor == 1 && y+1 <= worldsize) {RoomWalker(world, x, 	y+1,	0, worldsize, mindoors, verbose)};
		if (origin != 3 && world.fields[x-1][y].substring(0,4) == "0000" && westdoor  == 1 && x-1 > 0)			{RoomWalker(world, x-1, 	y,		1, worldsize, mindoors, verbose)};
}

function WorldBuilder(MyWorld)
{
	MyWorld.fields = new Array(MyWorld.size);

	do {
		var roomcount = 0;
		console.log(roomcount);

		for (var i = 0; i <= MyWorld.size+1; i++)
		{
			MyWorld.fields[i] = new Array(MyWorld.size);
			for (var j = 0; j <= MyWorld.size+1; j++)
			{
				MyWorld.fields[i][j] = "00000000";
			}
		}	
		RoomWalker(MyWorld,Math.floor(MyWorld.size/2),Math.floor(MyWorld.size/2),0,MyWorld.size, MyWorld.mindoors, MyWorld.verbose);
		
		for (x=0;x<=MyWorld.size+1;x++){
			for (y=0;y<=MyWorld.size+1;y++){
				if (MyWorld.fields[x][y].substr(0,4) != '0000') {roomcount++};
			}
		}
		console.log(roomcount);
	} while (roomcount < MyWorld.minrooms);
}

/**
* Guckt, ob ein Raum neben dem aktuellen Raum noch nicht initialisiert wurde.
**/
function nextRoomAvailable(world, x, y) {
	var available = false;
	if (world.fields[x][y-1].substring(0,4) == "0000") available = true;
	if (world.fields[x+1][y].substring(0,4) == "0000") available = true;
	if (world.fields[x][y+1].substring(0,4) == "0000") available = true;
	if (world.fields[x-1][y].substring(0,4) == "0000") available = true;
	return available;
}

function analysefield(field) {
	var count = 0;	
	for (var i = 0; i < 4; i++)
	{
		if (field.charAt(i) == "1") count++;
	}
	return count;
}
