
window.onload = function draw() {

	var canvas = document.getElementById('game');
	var ctx = canvas.getContext("2d");
	var block = {
		x : canvas.width/2,
		y : canvas.height/2,
		width: 20,
		height: 20,
		velX: 3,
		velY: 0 ,
	}		

	function update() {
		ctx.clearRect (block.x- 0.5, block.y-0.5, block.width+1, block.height+1);

		if (block.x > canvas.width - 30) {
			block.velX = -block.velX
		} else if (block.x < 10) {
			block.velX = -block.velX
		}
		block.x += block.velX*(170-(Math.abs(block.x - canvas.width/2)))/95;
		block.Y += block.velY;
		ctx.fillStyle = "white";
		ctx.fillRect (block.x, block.y, block.width, block.height);
		window.requestAnimationFrame(update);
	}

	window.requestAnimationFrame(update);

}
