ig.module( 'game.levels.map1' )
.requires( 'impact.image','game.entities.player','game.entities.enemy','game.entities.levelchange','game.entities.gashor','game.entities.leveer','game.entities.trigger-kill','game.entities.coin','game.entities.trigger' )
.defines(function(){
LevelMap1=/*JSON[*/{"entities":[{"type":"EntityPlayer","x":180,"y":1086},{"type":"EntityEnemy","x":1172,"y":1156},{"type":"EntityLevelchange","x":1888,"y":1000,"settings":{"name":"exit","level":"map2"}},{"type":"EntityGashor","x":1232,"y":580,"settings":{"name":"gas1"}},{"type":"EntityGashor","x":1232,"y":708,"settings":{"name":"gas2"}},{"type":"EntityLeveer","x":968,"y":752,"settings":{"target":{"1":"killGas"},"action":"up"}},{"type":"EntityTriggerKill","x":1232,"y":-272,"settings":{"name":"killGas","target":{"1":"gas1","2":"gas2"}}},{"type":"EntityCoin","x":1328,"y":1128},{"type":"EntityCoin","x":1828,"y":924},{"type":"EntityCoin","x":1256,"y":800},{"type":"EntityTrigger","x":1940,"y":1048,"settings":{"target":{"1":"exit"},"size":{"x":20,"y":148}}}],"layer":[{"name":"background","width":28,"height":20,"linkWithCollision":false,"visible":0,"tilesetName":"media/alltiles.png","repeat":false,"preRender":false,"distance":"2","tilesize":70,"foreground":false,"data":[[0,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]]},{"name":"main","width":28,"height":18,"linkWithCollision":false,"visible":1,"tilesetName":"media/alltiles.png","repeat":false,"preRender":false,"distance":"1","tilesize":70,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24],[0,0,0,24,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,24],[0,0,0,24,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,24],[0,0,0,24,19,32,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,24],[0,0,0,24,19,19,19,19,19,19,19,19,19,19,19,19,32,19,19,19,19,19,19,19,19,19,19,24],[0,0,0,24,19,19,19,19,19,19,19,19,19,32,19,19,19,19,19,19,19,19,19,19,19,19,19,24],[0,0,0,24,19,19,19,19,19,19,19,19,19,19,19,19,12,19,19,19,19,19,19,19,19,19,19,24],[0,0,0,24,19,19,19,41,36,36,39,19,19,19,19,19,19,19,19,19,19,19,19,19,32,19,19,24],[0,0,0,24,19,19,19,40,37,37,38,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,24],[0,0,0,24,19,19,19,19,19,19,19,19,3,3,3,3,3,3,3,3,3,3,19,19,19,19,19,24],[27,26,0,24,19,19,19,19,19,19,19,3,3,19,19,19,19,19,19,19,3,3,19,19,19,19,19,24],[33,43,24,24,19,19,19,19,19,19,3,3,19,19,19,19,12,19,19,19,3,3,19,19,24,24,24,24],[43,43,19,19,19,19,19,19,19,3,3,19,19,19,19,19,19,19,19,19,3,3,19,19,19,19,19,19],[43,43,19,19,19,19,19,19,19,3,3,19,19,3,19,19,19,19,19,19,3,3,19,19,19,19,19,19],[43,43,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,24]]},{"name":"collision","width":28,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":70,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1],[0,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1],[0,1,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"help","width":30,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"media/newhelptiles.png","repeat":false,"preRender":false,"distance":"1","tilesize":70,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,7,8,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelMap1Resources=[new ig.Image('media/alltiles.png'), new ig.Image('media/alltiles.png'), new ig.Image('media/newhelptiles.png')];
});