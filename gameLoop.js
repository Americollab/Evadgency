var ctx = document.getElementById("gameWindow").getContext("2d");
ctx.font = '30px Arial';

console.log("Game loaded!");

var img = new Image();
img.src = 'sprites/frog.png';
var player = {
    sprite: img,
    x: 500,
    y: 400,
    spd: 10,
    width: 20,
    height: 20

};

var obstacle = new Image();
obstacle.src = "sprites/obstacle.png";
var obstacle = {
    sprite: obstacle,
    x: 400,
    y:400,
    spd: 2,
    width: 20,
    height: 20
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
    updateEntity(obstacle);
    
    requestAnimationFrame(update);
}

update();




