ig.module(
    'game.entities.gravitychanger'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityGravitychanger = ig.Entity.extend({
    
        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba( 255, 0, 255, 0.7 )',
        gravity: 800,
        gravityChange: -800,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.A, 
    collides: ig.Entity.COLLIDES.PASSIVE,


            update:function(){

                ig.game.gravity = this.gravity;
                this.gravity=800;
                this.parent();
            },


            check:function(entity){
                    this.gravity= this.gravityChange;
                this.parent(entity);
            },
          

                
});

});