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
  'game.entities.gashor'
)
  .requires(
    'impact.entity'
  )
  .defines(function(){

    EntityGashor = ig.Entity.extend({

      _wmScalable: true,
      type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.PASSIVE,

      animSheet: new ig.AnimationSheet( 'media/gashor.png', 70, 140 ),
      size: {x: 70, y: 140},
      damage: 10,

      init:function(x, y, settings){
        this.parent(x, y, settings);
        this.addAnim( 'idle', 1, [0] );
      },

      check: function( entity) {
        entity.receiveDamage(this.damage, this);
      },

      update: function(){}
    });
  });
