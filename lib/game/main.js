ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.timer',

	'plugins.camera',
	'plugins.touch-button',
	'plugins.impact-splash-loader',
	//'plugins.gamepad',
	'plugins.pause',
	//'plugins.hqx',
	'game.entities.ladder',
	"game.entities.billboard",
	"game.entities.billboardst",
	'game.entities.player',
	'game.entities.blob',
	'game.entities.leveer',


	'game.levels.title',
	//'game.levels.grasslands',
	//'game.levels.snowhills',
	'game.levels.test',
	'game.levels.map1',
	'game.levels.map2',
	'game.levels.map3',
	'game.levels.map4',
	'game.levels.second'



	//'impact.debug.debug'
)
.defines(function(){
	

// Our Main Game class. This will load levels, host all entities and
// run the game.

MyGame = ig.Game.extend({
	
	clearColor: "#000000",
	gravity: 800, // All entities are affected by this
	shakeAmplitude : 0, //shake volume
	fBillboardPause: false,
	// Load a font
	font: new ig.Font( 'media/fredoka-one.font.png' ),

	// HUD icons
	heartFull: new ig.Image( 'media/heart-full.png' ),
	heartEmpty: new ig.Image( 'media/heart-empty.png' ),
	coinIcon: new ig.Image( 'media/muru.png' ),
	pause: new ig.Image( 'media/pause.png'),
	timer : new ig.Timer( 0.1 ),
	
	
	
	init: function() {
		// We want the font's chars to slightly touch each other,
		// so set the letter spacing to -2px.
		this.font.letterSpacing = -2;
		ig.music.add( 'media/sounds/theme.*' );
		ig.music.volume = 0.5;
		ig.music.next();
		ig.music.loop = true;	
		
		
		// Load the LevelGrasslands as required above ('game.level.grassland')
		this.loadLevel( LevelMap1 );
	},

	loadLevel: function( data ) {
		// Remember the currently loaded level, so we can reload when
		// the player dies.
		this.currentLevel = data;

		// Call the parent implemenation; this creates the background
		// maps and entities.
		this.parent( data );
		
		this.setupCamera();
	},
	
	setupCamera: function() {
		// Set up the camera. The camera's center is at a third of the screen
		// size, i.e. somewhat shift left and up. Damping is set to 3px.		
		this.camera = new ig.Camera( ig.system.width/3, ig.system.height/3, 3 );
		
		// The camera's trap (the deadzone in which the player can move with the
		// camera staying fixed) is set to according to the screen size as well.
    	this.camera.trap.size.x = ig.system.width/10;
    	this.camera.trap.size.y = ig.system.height/3;
		
		// The lookahead always shifts the camera in walking position; you can 
		// set it to 0 to disable.
    	this.camera.lookAhead.x = ig.system.width/6;
		
		// Set camera's screen bounds and reposition the trap on the player
    	this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
    	this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
    	this.camera.set( this.player );
	},

	reloadLevel: function() {
		this.loadLevelDeferred( this.currentLevel );
	},
	
	update: function() {	
	        if(this.fBillboardPause && ig.input.state("jump")) {
            // get our billboard
            var ent = ig.game.getEntitiesByType(EntityBillboard)[0];
            if(ent == undefined ){
                // catch this if we somehow get a space bar press
                // before boolean flag is toggled BACK 
                console.log("billboard kill: ent undefined")
                return;
            };
           
            // destroy the entity
            ent.kill(); 
            // reset the flag
            this.fBillboardPause=false;

            // if you have a flag for music, wrap this with it 
            // assuming you want to toggle music
            //
            //ig.music.play();
        }	
		// Update all entities and BackgroundMaps
		if(this.fBillboardPause) { return;}
        this.parent();
		
		// Camera follows the player
		this.camera.follow( this.player );

	if (this.timer.delta() >=0 && ig.input.state('pause') && !this.paused ) {
			      	this.paused = true;
	        		this.togglePause();
	        		ig.music.pause();
	        		this.timer.reset();
	      }

	 else if(this.timer.delta() >=0 && ig.input.state('pause') && this.paused){
		      	this.paused = false;
		      	this.togglePause();
		      	ig.music.play();
		      	this.timer.reset();
		      }
	
      

		// Instead of using the camera plugin, we could also just center
		// the screen on the player directly, like this:
		// this.screen.x = this.player.pos.x - ig.system.width/2;
		// this.screen.y = this.player.pos.y - ig.system.height/2;
	},

	
	draw: function() {
		// Call the parent implementation to draw all Entities and BackgroundMaps


      //SHAKE!!
        var ctx = ig.system.context;
        // translate the context if shakeAmplitude not null;
        if (this.shakeAmplitude) {
           ctx.save();
           ctx.translate(this.shakeAmplitude*(Math.random()-0.5) ,
                                 this.shakeAmplitude*(Math.random()-0.5)   );  
        }

        this.parent();         //  or ig.Game.draw.call(this);  

        if (this.shakeAmplitude) {
           ctx.restore();
        }
		

		// Draw the heart and number of coins in the upper left corner.
		// 'this.player' is set by the player's init method
		if( this.player ) {
			var x = 16, 
				y = 16;

			/*for( var i = 0; i < this.player.maxHealth; i++ ) {
				// Full or empty heart?
				if( this.player.health > i ) {
					this.heartFull.draw( x, y );
				}
				else {
					this.heartEmpty.draw( x, y );	
				}

				x += this.heartEmpty.width + 8;
			}*/

			// We only want to draw the 0th tile of coin sprite-sheet
			x += 48;
			this.coinIcon.drawTile( x, y+6, 0, 32 );

			x += 42;
			this.font.draw( 'x ' + this.player.coins, x, y+10 )



		}
		
		// Draw touch buttons, if we have any
		if( window.myTouchButtons ) {
			window.myTouchButtons.draw(); 
		}


		   if (this.paused ) {
            this.font.draw(" - Paused - ", ig.system.width/2, 232, ig.Font.ALIGN.CENTER);

            // Return to stop anything else drawing
            return;                
        }

	}
});



// The title screen is simply a Game Class itself; it loads the LevelTitle
// runs it and draws the title image on top.

MyTitle = ig.Game.extend({
	clearColor: "#d0f4f7",
	gravity: 800,

	// The title image
	title: new ig.Image( 'media/title3.png' ),

	// Load a font
	font: new ig.Font( 'media/fredoka-one.font.png' ),

	init: function() {
		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		//ig.input.bind( ig.KEY.SPACE, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );
		ig.input.bind( ig.KEY.ESC, 'pause' );

		ig.music.add( 'media/sounds/title.*' );
		ig.music.volume = 0.5;
		ig.music.play();
		
		// Align touch buttons to the screen size, if we have any
		if( window.myTouchButtons ) {
			window.myTouchButtons.align(); 
		}

		// We want the font's chars to slightly touch each other,
		// so set the letter spacing to -2px.
		this.font.letterSpacing = -2;

		this.loadLevel( LevelTitle );
		this.maxY = this.backgroundMaps[0].pxHeight - ig.system.height;
	},

	update: function() {

	//CONTROLLER!!
	/*var gamepad = new Gamepad.getState(0);      
    var mappings = [[ gamepad.dpadUp, ig.KEY.UP_ARROW ],
                    [ gamepad.dpadDown, ig.KEY.DOWN_ARROW ],
                    [ gamepad.dpadLeft, ig.KEY.LEFT_ARROW ],
                    [ gamepad.dpadRight, ig.KEY.RIGHT_ARROW ],
                    [ gamepad.faceButton0, ig.KEY.X ],
                    [ gamepad.faceButton1, ig.KEY.C ],
                    [ gamepad.faceButton2, ig.KEY.Z ],
                    [ gamepad.faceButton3, ig.KEY.V ]];
    new Gamepad.magic(gamepad, mappings);*/

		// Check for buttons; start the game if pressed
		if( ig.input.pressed('jump') ) {
			ig.system.setGame( MyGame );
			return;
		}
		
		
		this.parent();

		// Scroll the screen down; apply some damping.
		var move = this.maxY - this.screen.y;
		if( move > 5 ) {
			this.screen.y += move * ig.system.tick;
			this.titleAlpha = this.screen.y / this.maxY;
		}
		this.screen.x = (this.backgroundMaps[0].pxWidth - ig.system.width)/2;
	},

	draw: function() {
		this.parent();

		var cx = ig.system.width/2;
		//title position
		this.title.draw( cx - this.title.width/1.5, 60 );
		
		var startText = ig.ua.mobile
			? 'Press Button to Play!'
			: 'Press SPACE to Play!';
		
		this.font.draw( startText, cx, 420, ig.Font.ALIGN.CENTER);

		// Draw touch buttons, if we have any
		if( window.myTouchButtons ) {
			window.myTouchButtons.draw(); 
		}
	}
});



Intro1 = ig.Game.extend({
	
	clearColor: "#000000",
	init:function(){
		
		img = new ig.Image( 'media/intro1.png' );
		ig.input.bind( ig.KEY.SPACE, 'jump' );
		font = new ig.Font( 'media/fredoka-one.font.png' );
		
	},
	
	update:function(){
		if( ig.input.pressed('jump') ) {
			ig.system.setGame( MyTitle );
			return;
		}
		this.parent();
	},
	
	draw:function(){
		this.parent;
		img.draw( 0, 0 );
		
		var cx = ig.system.width/2;

		
		var startText = ig.ua.mobile
			? 'Press Button to Continue!'
			: 'Press SPACE to Continue!';
		
		font.draw( startText, cx, 420, ig.Font.ALIGN.CENTER);

		// Draw touch buttons, if we have any
		if( window.myTouchButtons ) {
			window.myTouchButtons.draw(); 
	}
	},
});





if( ig.ua.mobile ) {
	// If we're running on a mobile device and not within Ejecta, disable 
	// sound completely :(
	if( !window.ejecta ) {
		ig.Sound.enabled = false;
	}

	// Use the TouchButton Plugin to create a TouchButtonCollection that we
	// can draw in our game classes.
	
	// Touch buttons are anchored to either the left or right and top or bottom
	// screen edge.
	var buttonImage = new ig.Image( 'media/touch-buttons.png' );
	myTouchButtons = new ig.TouchButtonCollection([
		new ig.TouchButton( 'left', {left: 0, bottom: 0}, 128, 128, buttonImage, 0 ),
		new ig.TouchButton( 'right', {left: 128, bottom: 0}, 128, 128, buttonImage, 1 ),
		new ig.TouchButton( 'shoot', {right: 128, bottom: 0}, 128, 128, buttonImage, 2 ),
		new ig.TouchButton( 'up', {right: 0, bottom: 96}, 128, 128, buttonImage, 3 )
	]);
}

// If our screen is smaller than 640px in width (that's CSS pixels), we scale the 
// internal resolution of the canvas by 2. This gives us a larger viewport and
// also essentially enables retina resolution on the iPhone and other devices 
// with small screens.
var scale = (window.innerWidth < 640) ? 2 : 1;


// We want to run the game in "fullscreen", so let's use the window's size
// directly as the canvas' style size.
var canvas = document.getElementById('canvas');
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';


// Listen to the window's 'resize' event and set the canvas' size each time
// it changes.
window.addEventListener('resize', function(){
	// If the game hasn't started yet, there's nothing to do here
	if( !ig.system ) { return; }
	
	// Resize the canvas style and tell Impact to resize the canvas itself;
	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height = window.innerHeight + 'px';
	ig.system.resize( window.innerWidth * scale, window.innerHeight * scale );
	
	// Re-center the camera - it's dependend on the screen size.
	if( ig.game && ig.game.setupCamera ) {
		ig.game.setupCamera();
	}
	
	// Also repositon the touch buttons, if we have any
	if( window.myTouchButtons ) {
		window.myTouchButtons.align(); 
	}
}, false);


// Finally, start the game into MyTitle and use the ImpactSplashLoader plugin 
// as our loading screen
var width = window.innerWidth * scale,
	height = window.innerHeight * scale;
ig.main( '#canvas', Intro1, 60, width, height, 1, ig.ImpactSplashLoader );

});
