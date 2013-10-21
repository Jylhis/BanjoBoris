ig.module(
	'game.entities.laika'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityLaika = ig.Entity.extend({
	size: {x: 64, y: 64},
	
	
	target: null,
	wait: -1,
	waitTimer: null,
	canFire: true,
	endGame: true,
	
	animSheet: new ig.AnimationSheet( 'media/laika2.png', 64, 64 ),

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	
	
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 2, [0] );
		if( settings.checks ) {
			this.checkAgainst = ig.Entity.TYPE[settings.checks.toUpperCase()] || ig.Entity.TYPE.A;
			delete settings.check;
		}
		
		this.parent( x, y, settings );
		this.waitTimer = new ig.Timer();
	},
	
	
	check: function( other ) {
		if(this.endGame){
			ig.game.currentScore = 0;
			ig.system.setGame( MyTitle );
			return;
		}
		else if( this.canFire && this.waitTimer.delta() >= 0 ) {
			if( typeof(this.target) == 'object' ) {
				for( var t in this.target ) {
					var ent = ig.game.getEntityByName( this.target[t] );
					if( ent && typeof(ent.triggeredBy) == 'function' ) {
						ent.triggeredBy( other, this );
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
	
	
	update: function(){}
});

});