ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 60, y: 90},
	offset: {x: 25, y: 10},

	maxVel: {x: 400, y: 9000},
	friction: {x: 700, y: 0},

	canClimb: false,
    isClimbing: false,
    momentumDirection: {'x':0,'y':0},
    ladderReleaseTimer: new ig.Timer(0.0),
    ladderSpeed: 75,
    startPosition: null,



	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet( 'media/player2Big.png', 100, 100 ),

	sfxHurt: new ig.Sound( 'media/sounds/hurt.*' ),
	sfxJump: new ig.Sound( 'media/sounds/jump.*' ),


	health: 1,

	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelGround: 1200,
	accelAir: 600,
	jump: 500,
	maxHealth: 3,

	coins: 0,


	init: function( x, y, settings ) {
		this.startPosition = {x:x,y:y};
		this.parent( x, y, settings );

		// Add the animations
		this.addAnim( 'idle', 2, [2, 0, 1] );
		this.addAnim( 'run', 0.07, [2, 3, 4, 5, ] );
		this.addAnim( 'jump', 1, [7] );
		this.addAnim( 'fall', 0.5, [6, 8], true ); // stop at the last frame
		this.addAnim( 'pain', 0.3, [6], true );
		this.addAnim( 'climbUp', 0.3, [9, 10] );
		this.addAnim( 'climbDown', 0.3, [10, 9] );


		// Set a reference to the player on the game instance
		ig.game.player = this;
		 this.zIndex = -99;
	},


	update: function() {

		// Handle user input; move left or right
		var accel = this.standing ? this.accelGround : this.accelAir;
		if( ig.input.state('left') ) {
			this.accel.x = -accel;
			this.flip = true;
            if (!this.canClimb)this.isClimbing=false; // don't allow moving horizontally off the while in climbing mode
		}
		else if( ig.input.state('right') ) {
			this.accel.x = accel;
			this.flip = false;
            if (!this.canClimb)this.isClimbing=false; // don't allow moving horizontally off the while in climbing mode
		}
		else {
			this.accel.x = 0;
		}
		        if( this.canClimb && (ig.input.pressed('up') ||  ig.input.pressed('down' )) ) {

            this.isClimbing=true;
            this.ladderReleaseTimer.set(0.0); // allow to cling to ladder instead of jumping past, if up or down pressed

            this.vel.x = 0; // don't fall off sides of ladder unintentionally

            //momentumDirection allows for up, down and idle movement (-1, 0 & 1) so you can stop on ladders
            if (ig.input.pressed('up')) {
                this.momentumDirection.y >-1 ? this.momentumDirection.y -- : this.momentumDirection.y = -1;

            }else if( ig.input.pressed('down' )){
                this.momentumDirection.y <1 ? this.momentumDirection.y ++ : this.momentumDirection.y = 1;
            }
        }

		// jump
		if( (this.standing || this.isClimbing || this.canClimb) && (ig.input.pressed('jump') ) ) {
			this.vel.y = -this.jump;
            this.sfxJump.play();

            //allow to jump off ladders
            this.ladderReleaseTimer.set(0.5); // approximate seconds your player takes to jump and fall back down
            this.isClimbing=false;
        }



		// shoot
		/*if( ig.input.pressed('shoot') ) {
			ig.game.spawnEntity( EntityFireball, this.pos.x, this.pos.y+40, {flip:this.flip} );
		}*/
		// jump
		if( (this.standing || this.isClimbing || this.canClimb) && (ig.input.pressed('jump') ) ) {
			this.vel.y = -this.jump;

            //allow to jump off ladders
            this.ladderReleaseTimer.set(0.5); // approximate seconds your player takes to jump and fall back down
            this.isClimbing=false;
        }
		//when climbing past top of ladder, the entity falls back softly and can walk left or right
        if (!this.standing && !this.canClimb && this.vel.y < 0)this.isClimbing=false;


        // prevent fall down ladder if ground touched but ladderReleaseTimer still running from recent jump
        if (this.standing)this.ladderReleaseTimer.set(0.0);

		// Stay in the pain animation, until it has looped through.
		// If not in pain, set the current animation, based on the
		// player's speed
		if(
			this.currentAnim == this.anims.pain &&
			this.currentAnim.loopCount < 1
		) {
			// If we're dead, fade out
			if( this.health <= 0 ) {
				// The pain animation is 0.3 seconds long, so in order to
				// completely fade out in this time, we have to reduce alpha
				// by 3.3 per second === 1 in 0.3 seconds
				var dec = (1/this.currentAnim.frameTime) * ig.system.tick;
				this.currentAnim.alpha = (this.currentAnim.alpha - dec).limit(0,1);
			}
		}
		else if( this.health <= 0 ) {
			// We're actually dead and the death (pain) animation is
			// finished. Remove ourself from the game world.
			this.kill();
		}
		else if( this.vel.y < 0 ) {
			this.currentAnim = this.anims.jump;
		}
		else if( this.vel.y > 0 ) {
			if( this.currentAnim != this.anims.fall ) {
				this.currentAnim = this.anims.fall.rewind();
			}
		}
		else if( this.vel.x != 0 ) {
			this.currentAnim = this.anims.run;
		}
		else {
			this.currentAnim = this.anims.idle;
		}
		 if ( this.vel.y < 0 && this.isClimbing && this.momentumDirection.y == -1){
            this.currentAnim = this.anims.climbUp; // create your own climbing animations

        }else if ( this.vel.y > 0 && this.isClimbing && this.momentumDirection.y == 1){
            this.currentAnim = this.anims.climbDown; // create your own climbing animations

        }
		this.currentAnim.flip.x = this.flip;


		// Move!
		this.parent();
	},

	kill: function() {
		this.parent();
		//ig.game.spawnEntity(EntityPlayer, this.startPosition.x, this.startPosition.y);

		// Reload this level
		ig.game.currentScore = 0;
		ig.game.reloadLevel();
	},


	giveCoins: function( amount ) {
		// Custom function, called from the EntityCoin
		ig.game.currentScore += amount;
	},

	receiveDamage: function( amount, from ) {
		if( this.currentAnim == this.anims.pain ) {
			// Already in pain? Do nothing.
			return;
		}

		// We don't call the parent implementation here, because it
		// would call this.kill() as soon as the health is zero.
		// We want to play our death (pain) animation first.
		this.health -= amount;
		this.currentAnim = this.anims.pain.rewind();

		// Knockback
		this.vel.x = (from.pos.x > this.pos.x) ? -400 : 400;
		this.vel.y = -300;

		// Sound
		this.sfxHurt.play();
	}
});


});
