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
  'game.entities.slowmo'
)
  .requires(
    'impact.entity',
    'impact.timer'
  )
  .defines(function(){

    EntitySlowmo = ig.Entity.extend({
      _wmScalable: true,
      _wmDrawBox: true,
      _wmBoxColor: 'rgba(255, 0, 0, 0.7)',

      type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.NEVER,

      size: {x: 32, y: 32},
      slowmo: 0.3,
      normal: 1,
      timer : new ig.Timer( 1 ),

      check:function(other){

        ig.Timer.timeScale = this.slowmo;
        this.timer.reset();


      },

      update: function(){
        if(this.timer.delta() >=0 && ig.Timer.timeScale < 1){
          ig.Timer.timeScale = this.normal;
          this.kill();
        }

      }
    });
  });
