ig.module(
    'game.entities.gravitychanger'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityGravitychanger = ig.Entity.extend({

        size: {x:70, y:700},
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet( 'media/largeair.png', 70, 700 ),
        powerOn: null,
        timer: new ig.Timer(0),

    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,

        init: function( x, y, settings ) {

        if(this.powerOn){
           this.currentAnim = this.anims.on;
        }
        else if(!this.powerOn){
           this.currentAnim = this.anims.off;
        }

        this.parent( x, y, settings );


        this.addAnim( 'on', 0.2, [1,2,3,4,5,6,7]);
        this.addAnim( 'off', 1, [0], true );
    },


    triggeredBy: function( entity, trigger ) {
        if(this.powerOn && this.timer.delta()>0){
            this.powerOn = false;
            this.timer.set(10000);
            this.currentAnim = this.anims.off;
        }
        else if(!this.powerOn && this.timer.delta()>0){
            this.powerOn = true;
            this.timer.set(10000);
            this.currentAnim = this.anims.on;
        }

    },

            update:function(){
                ig.game.player.gravityFactor = 1;
                if(this.powerOn){
           this.currentAnim = this.anims.on;
        }
        else if(!this.powerOn){
           this.currentAnim = this.anims.off;
        }
                this.parent();
            },


            check:function(entity){
                if(this.powerOn){
                    entity.gravityFactor = -1;
                }
                this.parent(entity);
            },



});

});
