var ctx = document.getElementById("gameWindow").getContext("2d");
ctx.font = '30px Arial';

console.log("Game loaded!");

var gameMaster = {
    difficulty: 1,
    score: 0,
    time: 100
}

var img = new Image();
img.src = 'sprites/frog.png';
var player = {
    sprite: img,
    x: 200,
    y: 500,
    spd: 10,
    width: 20,
    height: 20

};

var obstacles =[];
var obstacle = new Image();
obstacle.src = "sprites/obstacle.png";
var obstacle = {
    sprite: obstacle,
    x: 400,
    y:400,
    spd: 0,
    width: 20,
    height: 20,
}

function onStart (){
    obstacleSpawner();
}

function obstacleSpawner(){
    //spawner locations
    for(i = 0; i < 10; i++){
        obstacle.x = obstacle.x - 10;
        obstacles.push(obstacle);
        console.log("Spawned obstacle" + i);
    }
}
// Game Logic Updates
function updateEntity(entity) {

    ctx.drawImage(entity.sprite, entity.x, entity.y, entity.width, entity.height);
    controlPlayer();
    obstacleMove();
}

function update() {
    ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
    updateEntity(player);

    for(i = 0; i < obstacles.length; i++){
        updateEntity(obstacle);
    }

    obstacleCollide();
    requestAnimationFrame(update);
}

function obstacleCollide(){
    if (player.x <= obstacle.x + obstacle.width/2 && player.x >= obstacle.x - obstacle.width/2 && player.y <= obstacle.y + obstacle.height/2 && player.y >= obstacle.y - obstacle.height/2){
        console.log("Collided with obstacle");
        // lose life
        // reset player pos to start
        //if no lives remain then end game
    }
}

onStart();
update();




