ig.module(
    'game.entities.gravitychangersmall'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityGravitychangersmall = ig.Entity.extend({

        size: {x:70, y:420},
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet( 'media/smallair.png', 70, 420 ),
        powerOn: true,

    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,

        init: function( x, y, settings ) {

        this.parent( x, y, settings );

        this.addAnim( 'on', 0.2, [1,2,3,4,5,6,7]);
        this.addAnim( 'off', 1, [0], true );
    },

            update:function(){
                ig.game.player.gravityFactor = 1;
                this.parent();
            },


            check:function(entity){
                    entity.gravityFactor = -1;
                //this.parent(entity);
            },



});

});
