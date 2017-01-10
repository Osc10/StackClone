
window.onload = function draw() {

	var canvas = document.getElementById('game');
	var ctx = canvas.getContext("2d");
	var block = {
		x : 10,
		y : canvas.height/2,
		width: 90,
		height: 20,
		velX: 3,
	}		

	var count = 0;

	function update() {	
		ctx.clearRect (block.x - 0.5, block.y, block.width + 1, block.height);
		if (block.x > canvas.width - block.width - 10) {
			block.velX = -block.velX
		} else if (block.x < 10) {
			block.velX = -block.velX
		}
		block.x += block.velX;
		ctx.fillStyle = "white";
		ctx.fillRect (block.x, block.y, block.width, block.height);
		window.requestAnimationFrame(update);

		

	}

	var tower = [];
	var towerX;
	var towerWidth;
	var lost = 0;
	var score = 0;
	var highscore = 0;

	window.requestAnimationFrame(update);

	document.addEventListener("keydown", keyDownHandler, false);

	function keyDownHandler(e) {
		if(e.keyCode == 32) {
			if (tower.length === 0) {
				tower.unshift([block.x, block.width])
			} else if (block.x <= tower[0][0] && block.x + block.width > tower[0][0]) {
				tower.unshift([tower[0][0], Math.min(block.x + block.width - tower[0][0], tower[0][1])]) ;
			} else if (block.x > tower[0][0] && block.x < tower[0][0] + tower[0][1]) {
				tower.unshift([block.x, tower[0][0] + tower[0][1] - block.x])
			} else {
				lost = 1;
			}

			if (block.velX <= 6) {
				block.velX += Math.sign(block.velX)*0.1;
			}

			if (lost != 1) {
				block.width = tower[0][1];
				ctx.clearRect(0,0,canvas.width, canvas.height);
				score ++;
				for (var i = 0; i < Math.min(11, tower.length); i++) {
					ctx.fillStyle="white";
					ctx.fillRect(tower[i][0], canvas.height/2 + (i + 1) * block.height, tower[i][1], block.height)
				}
			} else {
				block.width = 90;
				ctx.clearRect(0,0,canvas.width, canvas.height);
				block.velX = 3;
				block.x = 10;
				lost = 0;
				tower = [];
				score = 0;
			}

			document.getElementById("score").innerHTML = "Score: " + score;
			if (score > highscore) {
				highscore = score;
				document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
			}
			

		}

	}

	
}
