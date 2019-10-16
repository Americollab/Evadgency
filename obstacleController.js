var obstacles = {};

obstacle(200, 200, 1, 20, 20, "obstacle1");
obstacle(300, 100, 1, 20, 20, "obstacle2");

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

function obstacleMove(obstacle){
    if(obstacle.x < gameWindow.width + 100){
        obstacle.x = obstacle.x + obstacle.spd;
    
    } else{
        obstacle.x = -100;
    }
}

function obstacleCollide(obstacle) {
    if (player.x <= obstacle.x + obstacle.width / 2 && player.x >= obstacle.x - obstacle.width / 2 && player.y <= obstacle.y + obstacle.height / 2 && player.y >= obstacle.y - obstacle.height / 2) {
        gameMaster.lives -=1;
        player.x = 200;
        player.y = 500;
        console.log(gameMaster.lives); 
    }
}
