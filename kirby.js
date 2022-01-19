class Kirby {
	constructor(game) {
		this.game = game;
		this.spritesheet = ASSET_MANAGER.getAsset("./kirby.png");
		this.left_walk = ASSET_MANAGER.getAsset("./left_walk.png");
		
		//this.walk = new Animator(this.spritesheet, 1, 52, 25, 23, 10, .1);
		//this.idle = new Animator(this.spritesheet, 6, 4, 24, 21, 2, 1.2);
		
		this.x = 420;
		this.y = 0;
		this.jumping = false;
		
		this.state = 0; // 0 = idle, 1 = walking
		this.facing = 0; // 0 = right, 1 = left
		this.animations = [];
		this.loadAnimations();
		
		this.velocity = { x: 0, y: 0};
	};
	
	loadAnimations() {
		for (var i = 0; i < 2; i++) {
			this.animations.push([]);
			for (var j = 0; j < 2; j++) {
				this.animations[i].push([]);
			}
		}
		
		// idle animation
		// facing right
		this.animations[0][0] = new Animator(this.spritesheet, 6, 2, 24, 22, 2, 1.2, false);
		
		// facing left
		this.animations[0][1] = new Animator(this.spritesheet, 6, 2, 24, 22, 2, 1.2, true);
		
		// walking animation
		// facing right
		this.animations[1][0] = new Animator(this.spritesheet, 1, 52, 25, 23, 10, .1, false);
		
		// facing left
		//this.animations[1][1] = new Animator(this.left_walk, 262, 0, 27, 24, 10, .1);
		this.animations[1][1] = new Animator(this.left_walk, 9, 0, 25, 22, 10, .1, true);
	};
	
	update() {
		const TICK = this.game.clockTick;
        
        // no left/right inputs -- idle
        if (!this.game.left && !this.game.right) {
			this.state = 0;
			this.velocity.x = 0;
		}
		
		// moves left
		if (this.game.left && !this.game.right) {
			this.state = 1;
			this.facing = 1;
			this.velocity.x -= 0.5;
		}
		
		// moves right
		if (this.game.right && !this.game.left) {
			this.state = 1;
			this.facing = 0;
			this.velocity.x += 0.5;
		}
		
		if (this.game.space && this.jumping == false) {
			this.velocity.y -= 25;
			this.jumping = true;
		}
		
		this.velocity.y += 1.5; // gravity
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.velocity.x *= 0.9;
		this.velocity.y *= 0.9;
		
		if (this.y >  660) {
			this.jumping = false;
			this.y = 660;
			this.velocity.y = 0;
		}
		
		if (this.x < -260) {
			this.x = 1024;
		} else if (this.x > 1024) {
			this.x = -260;
		}
		
		//this.x += this.velocity.x * this.game.clockTick;
		//if (this.x > 1024 || this.x < 0) this.x = 0;
		
		//this.y += this.velocity.x * this.game.clockTick;
		//if (this.y > 768 || this.y < 0) this.y = 0;
	};
	
	draw(ctx) {
		this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y);
		
		//this.idle.drawFrame(this.game.clockTick, ctx, 0, 150);
	};
};