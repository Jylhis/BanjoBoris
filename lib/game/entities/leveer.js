/*
This entity calls the triggeredBy( entity, trigger ) method of each of its
targets. #entity# is the entity that triggered this trigger and #trigger# 
is the trigger entity itself.


Keys for Weltmeister:

checks
	Specifies which type of entity can trigger this trigger. A, B or BOTH 
	Default: A

wait
	Time in seconds before this trigger can be triggered again. Set to -1
	to specify "never" - e.g. the trigger can only be triggered once.
	Default: -1
	
target.1, target.2 ... target.n
	Names of the entities whose triggeredBy() method will be called.
*/

ig.module(
	'game.entities.leveer'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityLeveer = ig.Entity.extend({
	size: {x: 70, y: 70},
		
	target: null,
	wait: -1,
	waitTimer: null,
	canFire: false,
	action: '',
	powerOn: true,
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	gravityFactor: 0,

	animSheet: new ig.AnimationSheet( 'media/lever.png', 70, 70 ),
	
	
	init: function( x, y, settings ) {
		if( settings.checks ) {
			this.checkAgainst = ig.Entity.TYPE[settings.checks.toUpperCase()] || ig.Entity.TYPE.A;
			delete settings.check;
		}
		
		this.parent( x, y, settings );
		this.waitTimer = new ig.Timer();
		this.addAnim( 'on', 1, [0], true );
		this.addAnim( 'off', 1, [1], true );
	},
	
	
	check: function( other ) {
		if( this.canFire && this.waitTimer.delta() >= 0 ) {
			if( typeof(this.target) == 'object' ) {
				for( var t in this.target ) {
					var ent = ig.game.getEntityByName( this.target[t] );
					if( ent && typeof(ent.triggeredBy) == 'function' ) {
						ent.triggeredBy( other, this );
						this.powerOn = false;
					}
				}
			}
			
			if( this.wait == -1 ) {
				this.canFire = false;
			}
			else {
				this.waitTimer.set( this.wait );
			}
		}
	},
	
	
	update: function(){
		if(this.powerOn){
		this.currentAnim = this.anims.on;
		}
		else if(!this.powerOn){
			this.currentAnim = this.anims.off;
		}
		if (this.action && ( ig.input.pressed(this.action) || ig.input.released(this.action) )) {

                    this.canFire = true;
		}
		else {
			this.canFire = false;
		}
		this.parent();
	},

});

});