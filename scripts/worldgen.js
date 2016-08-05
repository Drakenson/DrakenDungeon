function roomwalk(world, x, y, origin, worldsize, mindoors, verbose)
{
	if (verbose) console.log("Hello its me. I am at Room "+x+"/"+y+".");
	do {
	
		var northdoor = Math.round(Math.random());
		var eastdoor = Math.round(Math.random());
		var southdoor = Math.round(Math.random());
		var westdoor = Math.round(Math.random());
		var specials = Math.trunc((Math.random()*9))
		//0 = North
		//1 = East
		//2 = South
		//3 = West
	
		world.fields[x][y] = String(northdoor) + String(eastdoor) + String(southdoor) + String(westdoor) +  String(specials) + "0";
		if (verbose) console.log("Dreaming about Field with the number "+world.fields[x][y]+" and with "+analysefield(world.fields[x][y])+" Doors.");
		
		} 
		while (analysefield(world.fields[x][y]) < mindoors && nextRoomAvailable(world, x, y));
		if (verbose) console.log("That's it! I've got an solution!");
		
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

		world.fields[x][y] = "000000";
		world.fields[x][y] = String(northdoor) + String(eastdoor) + String(southdoor) + String(westdoor) +  String(specials) + "0";
		if (verbose) console.log("A perfect number for this field is "+world.fields[x][y]+".");
	
		if (origin != 0 && world.fields[x][y-1].substring(0,4) == "0000" && northdoor == 1 && y-1 > 0) 			{roomwalk(world, x,		y-1,	2, worldsize, mindoors, verbose)};
		if (origin != 1 && world.fields[x+1][y].substring(0,4) == "0000" && eastdoor  == 1 && x+1 <= worldsize)	{roomwalk(world, x+1,	y, 		3, worldsize, mindoors, verbose)};
		if (origin != 2 && world.fields[x][y+1].substring(0,4) == "0000" && southdoor == 1 && y+1 <= worldsize) {roomwalk(world, x, 	y+1,	0, worldsize, mindoors, verbose)};
		if (origin != 3 && world.fields[x-1][y].substring(0,4) == "0000" && westdoor  == 1 && x-1 > 0)			{roomwalk(world, x-1, 	y,		1, worldsize, mindoors, verbose)};

}

function worldgen(MyWorld)
{
	worldsize = MyWorld.size;
	mindoors = MyWorld.mindoors;
	verbose = MyWorld.verbose;
	MyWorld.fields = new Array(worldsize);
	for (var i = 0; i <= worldsize+1; i++)
	{
		MyWorld.fields[i] = new Array(worldsize);
		for (var j = 0; j <= worldsize+1; j++)
		{
			MyWorld.fields[i][j] = "000000";
		}
	}	
	roomwalk(MyWorld,Math.floor(worldsize/2),Math.floor(worldsize/2),0,worldsize, mindoors, verbose);
	return MyWorld.fields;	
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
