ig.module(
    'game.entities.gravitychangerdown'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityGravitychangerdown = ig.Entity.extend({
    
        size: {x:70, y:700},
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet( 'media/largeairdown.png', 70, 700 ),
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

                this.parent();
            },


            check:function(entity){
                    entity.vel.y = 900;
                this.parent(entity);
            },
          

                
});

});