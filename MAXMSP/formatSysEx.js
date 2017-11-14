// takes messages and data intended for the grid in MIDI-Gooey and formats them as a Sysex message

// Messages to the grid take the format [a, b, x, y, z], where:

// a - command (see below)
// g - grid number (default 0 but allows for multiple grids in future)
// x - co-ordinate
// y - co-ordinate
// z - value (0-127)

// [0, g, x, y, z] set single square
// [1, g, z] set grid ( z is the value)
// [2, g, y, z...] set row (y is the row, z... are the values)
// [3, g, x, z....] set column (x is the column, z are the values)


// inlets and outlets
inlets = 1;
outlets = 1;

var g = 0;

// set grid number that you want to send message to
function setGridNumber(grid) 
{
	g = grid;
}

function setSquare(x, y, z) 
{
	outlet(0, [240, 0, g, x, y, z, 247]);
}

function setGrid(z) 
{
	outlet(0, [240, 1, g, z, 247]);
}

// expects y - the row, and arr - an array of values in this row...
function setRow(y, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15) 
{
	var argArr = [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15];
	var output = [240, 2, g, y];
	for(i = 0; i < 16; i++) {
		if (!isNaN(argArr[i])) {
			output.push(argArr[i]);
		}
	}
	output.push(247);
	outlet(0, output);
}

function setColumn(x, s0, s1, s2, s3, s4, s5, s6, s7)
{
	var argArr = [s0, s1, s2, s3, s4, s5, s6, s7];
	var output = [240, 3, g, x];
	for(i = 0; i < 8; i++) {
		if (!isNaN(argArr[i])) {
			output.push(argArr[i]);
		}
	}
	output.push(247);
	outlet(0, output);

}