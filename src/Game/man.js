(function(root){
	root.Man = Man;

	function Man() {
		this.status = 'run';
		this.vy = 1;
		this.va = 0.3;
		this.endy = 180;
	}

	Man.prototype.init = function(img) {
		var spriteSheet = new createjs.SpriteSheet({
			framerate: 30,
			'images': [img],
			'frames': {'regX': 82, 'height': 292, 'count': 64, 'regY': 0, 'width': 165},
			'animations': {
				'run': [0, 25, 'run', 1.5],
				'jump': [26, 52, false, 1.5]
			}
		});

		this.sprite = new createjs.Sprite(spriteSheet, this.status);
		this.sprite.x = 180;
		this.sprite.y = this.endy;
		this.sprite.scaleX = 0.5;
		this.sprite.scaleY = 0.5;
	}

	Man.prototype.run = function() {
		this.status = 'run';
		this.sprite.gotoAndPlay('run');
	}

	Man.prototype.jump = function() {
		this.status = 'jump';
		this.vy = -10;
		this.sprite.gotoAndPlay('jump');
	}

	Man.prototype.update = function() {
		if (this.status === 'run') {
			this.sprite.y = this.endy;
		}

		if (this.status === 'jump') {
			this.vy += this.va;
			this.sprite.y += this.vy;

			if(this.sprite.y >= this.endy){
				if(this.status !== 'run'){
					this.run();
				}
			}
		}
	}
	
})(window);