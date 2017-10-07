(function(root){
	root.init = init;

	var stage, w, h, loader;
	var sky, man, ground, hill, hill2, obstacle;

	function init(){ 
		stage = new createjs.Stage('demoCanvas');

		w = stage.canvas.width;
		h = stage.canvas.height;

		var manifest = [
			{src: 'spritesheet_grant.png', id: 'grant'},
			{src: 'sky.png', id: 'sky'},
			{src: 'ground.png', id: 'ground'},
			{src: 'hill1.png', id: 'hill1'},
			{src: 'hill2.png', id: 'hill2'},
			{src: 'obstacle.jpg', id: 'obstacle'}
		];
		loader = new createjs.LoadQueue(false);
		loader.on('progress',handleProgress);
		loader.addEventListener('complete', handleCompleted);
		loader.loadManifest(manifest, true, './');
	}

	function handleProgress(e){
		var progress = e.progress*100;
		console.log(progress);
	}

	function handleCompleted() {
		sky = new createjs.Shape();
		sky.graphics.beginBitmapFill(loader.getResult('sky')).drawRect(0, 0, w, h);

		var groundImg = loader.getResult('ground');
        ground = new createjs.Shape();
        ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
        ground.tileW = groundImg.width;
        ground.y = h - groundImg.height;

        hill1 = new createjs.Bitmap(loader.getResult('hill1'));
		hill1.setTransform(Math.random() * w, h - hill1.image.height * 4 - groundImg.height, 4, 4);
		hill1.alpha = 0.5;

		hill2 = new createjs.Bitmap(loader.getResult('hill2'));
		hill2.setTransform(Math.random() * w, h - hill2.image.height * 3 - groundImg.height, 3, 3);

		obstacle = new createjs.Bitmap(loader.getResult('obstacle'));
		obstacle.setTransform(w, h - obstacle.image.height, 0.7, 1);

		man = new Man();
		man.init(loader.getResult('grant'));

		stage.addChild(sky, ground, hill1, hill2, obstacle, man.sprite);

		createjs.Ticker.on('tick', tick);
		createjs.Ticker.timingMode = createjs.Ticker.RAF;

		window.addEventListener('keydown', handleJumpStart);
	}

	function handleJumpStart(e) {
		if(e.keyCode==32){
			if(man.status !== 'jump'){
				man.jump();
			}
		}
	}

	function tick(event) {
		var deltaS = event.delta / 1000;

		man.update();

		ground.x = (ground.x - deltaS * 200) % ground.tileW;

		hill1.x = (hill1.x - deltaS * 30);
		if (hill1.x + hill1.image.width * hill1.scaleX <= 0) {
			hill1.x = w;
		}
		hill2.x = (hill2.x - deltaS * 45);
		if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
			hill2.x = w;
		}

		obstacle.x = (obstacle.x - deltaS * 200);
		if (obstacle.x + obstacle.image.width * obstacle.scaleX <= 0) {
			obstacle.x = w;
		}

		stage.update(event);
	}
})(window);