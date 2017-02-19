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
	'game.entities.camera-shake'
)
.requires(
	'impact.entity',
	'impact.timer'
)
.defines(function(){

EntityCameraShake = ig.Entity.extend({
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 0, 0, 0.7)',

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,

	size: {x: 32, y: 32},
	shake: 20,
	canShake: true,
	timer : new ig.Timer( 2 ),



	check:function(other){
		ig.game.shakeAmplitude = this.shake;
		this.timer.reset();

	},

	update: function(){
		if(this.timer.delta() >=0 && ig.game.shakeAmplitude > 0){
			ig.game.shakeAmplitude = 0;
			this.kill();
		}

	},
});

});
