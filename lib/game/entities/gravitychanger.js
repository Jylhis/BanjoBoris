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
      


        check:function(entity){
            ig.game.gravity = -800;
            
        },
});

});