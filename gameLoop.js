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

var obstacles = {};

obstacle(200, 200, 0, 20, 20, "obstacle1");
obstacle(300, 100, 0, 20, 20, "obstacle2");

function obstacle(x, y, spd, width, height, id) {
    var obstacleImg = new Image();
    obstacleImg.src = "sprites/obstacle.png";
    var obstacle = {
        sprite: obstacleImg,
        x: x,
        y: y,
        spd: spd,
        width: width,
        height: height,
        id: id
    }
    obstacles[id] = obstacle;
}
// Game Logic Updates
function updateEntity(entity) {

    ctx.drawImage(entity.sprite, entity.x, entity.y, entity.width, entity.height);
    controlPlayer();
    for (var key in obstacles) {
    obstacleMove(obstacles[key]);
    obstacleCollide(obstacles[key]);
    }
    
}

function update() {
    ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
    updateEntity(player);
    for (var key in obstacles) {
        updateEntity(obstacles[key]); 
    }
    requestAnimationFrame(update);
}

function obstacleCollide(obstacle) {
    if (player.x <= obstacle.x + obstacle.width / 2 && player.x >= obstacle.x - obstacle.width / 2 && player.y <= obstacle.y + obstacle.height / 2 && player.y >= obstacle.y - obstacle.height / 2) {
        console.log("Collided with obstacle");
        // lose life
        // reset player pos to start
        //if no lives remain then end game
    }
}

update();




