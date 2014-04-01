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
this.recycle = 0;

//Universal Draw 'O' for AI function
function drawO(squareNumber) {
	theSquare = 'square' + squareNumber;
	c = document.getElementById(theSquare);
	cxt = c.getContext("2d");
	var img = new Image();
	
	setTimeout(function() {
	img.addEventListener("load", function() {
  		cxt.drawImage(img,0,0);
	}, false);
	img.src = 'images/o.png';
	}, 100);
	owner[squareNumber - 1] = 'O';
	turn++;
	clicked[squareNumber-1] = true;
	squaresFilled++;
	checkForWinners(owner[squareNumber-1]);
}

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
			turn++;
			clicked[squareNumber-1] = true;
			squaresFilled++;
			checkForWinners(owner[squareNumber-1]);
			computerLogic1();
		}
	}
	if (squaresFilled == 9 && gameOver == false) {
		alert('Tie Game');
		location.reload(true);
	}
}

//1st AI response - If AI can making winning move, do it.
function computerLogic1() {
	for (var n = 0; n < winningSets.length; n++) {
		var i = owner[winningSets[n][0]];
		var j = owner[winningSets[n][1]];
		var k = owner[winningSets[n][2]];
		
		if (i == 'O' && j == 'O' && k == 'none' && turn%2 != 0) {
			alert('AI');
			drawO(winningSets[n][2] + 1);
		}
		else if (i == 'O' && k == 'O' && j == 'none' && turn%2 != 0) {
			alert('AI');	
			drawO(winningSets[n][1] + 1);
		}
		else if (j == 'O' && k == 'O' && i == 'none' && turn%2 != 0) {
			alert('AI');
			drawO(winningSets[n][0] + 1);
		}
	}
	if (turn%2 != 0) {
		computerLogic2();
	}
}

//2nd AI response - If human can win, block it.
function computerLogic2() {
	for (var n = 0; n < winningSets.length; n++) {
		var i = owner[winningSets[n][0]];
		var j = owner[winningSets[n][1]];
		var k = owner[winningSets[n][2]];
		
		if (i == 'X' && j == 'X' && k == 'none' && turn%2 != 0) {
			alert('AI');
			drawO(winningSets[n][2] + 1);
		}
		else if (i == 'X' && k == 'X' && j == 'none' && turn%2 != 0) {
			alert('AI');	
			drawO(winningSets[n][1] + 1);
		}
		else if (j == 'X' && k == 'X' && i == 'none' && turn%2 != 0) {
			alert('AI');
			drawO(winningSets[n][0] + 1);
		}
	}
	if (turn%2 != 0) {
		computerLogic3();
	}
}

//5th AI response - play center space
function computerLogic3() {
	alert('AI');
	if (owner[4] == 'none') {
		drawO(5);
		//alert('fifth');
	}
	if (turn%2 != 0) {
		computerLogic4();
	}
}

//7th AI response - play empty corner
function computerLogic4() {
	if (owner[0] == 'none') {
		drawO(1);
		//alert('seventh');
	}
	else if (owner[2] == 'none') {
		drawO(3);
		//alert('seventh');
	}
	else if (owner[6] == 'none') {
		drawO(7);
		//alert('seventh');
	}
	else if (owner[8] == 'none') {
		drawO(9);
		//alert('seventh');
	}
	if (turn%2 != 0) {
		computerLogic5();
	}
}

//8th AI response  play side
function computerLogic5() {
	if (owner[1] == 'none') {
		drawO(2);
		//alert('eighth');
	}
	else if (owner[3] == 'none') {
		drawO(4);
		//alert('eighth');
	}
	else if (owner[5] == 'none') {
		drawO(6);
		//alert('eighth');
	}
	else if (owner[7] == 'none') {
		drawO(8);
		//alert('eighth');
	}
}

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
		alert('Good Luck!');
	}
}