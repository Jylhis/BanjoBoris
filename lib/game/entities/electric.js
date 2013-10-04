/*
This entity gives damage (through ig.Entity's receiveDamage() method) to
the entity that is passed as the first argument to the triggeredBy() method.

I.e. you can connect an EntityTrigger to an EntityHurt to give damage to the
entity that activated the trigger.


Keys for Weltmeister:

damage
	Damage to give to the entity that triggered this entity.
	Default: 10
*/

ig.module(
	'game.entities.electric'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityElectric = ig.Entity.extend({

	_wmScalable: false,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, 
	collides: ig.Entity.COLLIDES.PASSIVE,
	

	//_wmDrawBox: true,
	//_wmBoxColor: 'rgba(255, 0, 0, 0.7)',
	animSheet: new ig.AnimationSheet( 'media/electile.png', 70, 70 ),
	size: {x: 70, y: 70},
	damage: 10,

	init:function(x, y, settings){
		this.parent(x, y, settings);
		this.addAnim( 'idle', 0.5, [0,1] );
	this.currentAnim = this.anims.idle;
	},
		
	check: function( entity) {
		if(this.currentAnim.tile() == 0){
			entity.receiveDamage(this.damage, this);
		}		
	},
	
/*	update: function(){
		//this.currentAnim = this.anims.idle;
		}*/
});

});
