
window.onload = function draw() {

	var canvas = document.getElementById('game');
	var ctx = canvas.getContext("2d");
	var block = {
		x : -130,
		y : canvas.height/2,
		width: 130,
		height: 20,
		velX: 2,
	}		

	var count = 0;

	function update() {	
		ctx.clearRect (block.x - 0.5, block.y, block.width + 1, block.height);
		if (block.x > canvas.width - block.width - 10 && Math.sign(block.velX) > 0) {
			block.velX = -block.velX
		} else if (block.x < 10 && Math.sign(block.velX) < 0) {
			block.velX = -block.velX
		}
		block.x += block.velX;
		ctx.fillStyle = "white";
		ctx.fillRect (block.x, block.y, block.width, block.height);
		window.requestAnimationFrame(update);

		

	}

	var tower = [[(canvas.width/2 - block.width/2), block.width]];
	var towerX;
	var towerWidth;
	var lost = 0;
	var score = 0;
	var highscore = 0;
	var streak = 0;

	ctx.fillStyle = "white";
	ctx.fillRect(tower[0][0], canvas.height/2 + block.height, block.width, block.height)

	window.requestAnimationFrame(update);

	document.addEventListener("keydown", keyDownHandler, false);


	function keyDownHandler(e) {
		if(e.keyCode == 32) {
			if (Math.abs(block.x - tower[0][0]) <= 4) {
				if (streak > 10 && tower[0][1] < 130) {
					tower.unshift([Math.max(tower[0][0] - 7, tower[0][0] - (130 - tower[0][1])/2), Math.min(130, tower[0][1] + 14)]);
				} else {
				tower.unshift([tower[0][0], tower[0][1]]);	
				}
				streak ++;
			} else if (block.x <= tower[0][0] && block.x + block.width > tower[0][0]) {
				tower.unshift([tower[0][0], Math.min(block.x + block.width - tower[0][0], tower[0][1])]);
				streak = 0;
			} else if (block.x > tower[0][0] && block.x < tower[0][0] + tower[0][1]) {
				tower.unshift([block.x, tower[0][0] + tower[0][1] - block.x])
				streak = 0;
			} else {
				lost = 1;
				streak = 0;
			}

			if (block.velX <= 6) {
				block.velX += Math.sign(block.velX)*0.03;
			}

			if (lost != 1) {
				if (tower.length % 2 === 1) {
					block.x = -block.width;
					block.velX = Math.abs(block.velX)
				} else {
					block.x = canvas.width;
					block.velX = -Math.abs(block.velX)
				}
				block.width = tower[0][1];
				ctx.clearRect(0,0,canvas.width, canvas.height);
				score ++;
				for (var i = 0; i < Math.min(11, tower.length); i++) {
					ctx.fillStyle="white";
					ctx.fillRect(tower[i][0], canvas.height/2 + (i + 1) * block.height, tower[i][1], block.height)
				}
			} else {
				block.width = 130;
				ctx.clearRect(0,0,canvas.width, canvas.height);
				block.velX = 2;
				block.x = -130;
				lost = 0;
				tower = [[(canvas.width/2 - 130/2), 130]];
				ctx.fillStyle = "white";
				ctx.fillRect(tower[0][0], canvas.height/2 + block.height, 130, block.height)
				score = 0;
				streak = 0;
			}

			document.getElementById("score").innerHTML = "Score: " + score;
			if (score > highscore) {
				highscore = score;
				document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
			}
			

		}

	}

	
}
