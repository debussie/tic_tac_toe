//Global Variables
this.turn = 0;
this.theSquare;
this.cxt;
this.c;
this.squaresFilled = 0;
this.y;
this.gameOver = false;
this.owner = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
this.clicked = [false, false, false, false, false, false, false, false, false];
this.winningSets = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//PvP Game Logic
function squareClicked(squareNumber) {
	theSquare = 'square' + squareNumber;
	c = document.getElementById(theSquare);
	cxt = c.getContext('2d');
	if (clicked[squareNumber-1] == false) {
		if (turn%2 == 0) {
			var img = new Image();
			img.addEventListener('load', function() {
  				cxt.drawImage(img,0,0);
			}, false);
			img.src = 'images/x.png';
			owner[squareNumber-1] = 'X';
		}
		else {
			var img = new Image();
			img.addEventListener('load', function() {
  				cxt.drawImage(img,0,0);
			}, false);
			img.src = 'images/o.png';
			owner[squareNumber-1] = 'O';
		}
		turn++;
		clicked[squareNumber-1] = true;
		squaresFilled++;
		checkForWinners(owner[squareNumber-1]);
	}
	if (squaresFilled == 9 && gameOver == false) {
		alert('There are no winners');
		location.reload(true);
	}
}

//Check Board for Winning Condition
function checkForWinners(symbol) {
	for (var n = 0; n < winningSets.length; n++) {
		var i = owner[winningSets[n][0]] == symbol;
		var j = owner[winningSets[n][1]] == symbol;
		var k = owner[winningSets[n][2]] == symbol;
		if (i && j && k) {
		gameOver = true;
		alert(symbol + ' has won!');
		playAgain();
		}
	}
}

function playAgain() {
	y = confirm('Would you like to try again?');
	if (y == true) {
		location.reload(true);
	}
	else {
		alert('Goodbye');
	}
}