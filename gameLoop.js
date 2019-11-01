//gameWindow
var ctx = document.getElementById("gameWindow").getContext("2d");
ctx.font = '30px Arial';

console.log("Game loaded!");

//GameMaster Objects
var gameMaster = {
    difficulty: 1,
    score: 0,
    time: 500,
    lives: 3,
    coins: 0,
    gameOn: true
}

var timer = setInterval(function () {
    gameMaster.time = gameMaster.time - timer;
    //console.log(gameMaster.time);
}, 1000);

//gameObjects
var obstacles = [];
var collectables = [];

var img = new Image();
img.src = 'sprites/spritemap.png';
var player = {
    sprite: img,
    sx: 0,
    sy: 0,
    srcW: 80,
    srcH: 80,
    x: 200,
    y: 500,
    width: 40,
    height: 40,
    spd: 10
};

//gameObject calls
obstacle1 = new gameObject(obstacles, "obstacle", "sprites/obstacle.png", 0, 0, 500, 385, 200, 200, 3, 40, 40);
obstacle2 = new gameObject(obstacles, "obstacle", "sprites/obstacle.png", 0, 0, 500, 385, 300, 100, 3, 40, 40);
collectable1 = new gameObject(collectables, "collectable", "sprites/collectable.png", 0, 0, 200, 200, 300, 300, null, 40, 40);
collectable2 = new gameObject(collectables, "collectable", "sprites/collectable.png", 0, 0, 200, 200, 200, 210, null, 40, 40);

// Game Logic Updates
function update() {
    ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
    drawEntity(player);
    for (var key in obstacles) {
        drawEntity(obstacles[key]);
        obstacleMove(obstacles[key]);
        collideWith(obstacles[key]);
    }
    for (var key in collectables) {
        drawEntity(collectables[key]);
        collideWith(collectables[key]);
    }

    if (gameMaster.lives == 0 || gameMaster.time <= 0) {
        cancelAnimationFrame(update);
        clearInterval(timer);
        console.log("Game Over");
    } else {
        requestAnimationFrame(update);
    }
    controlPlayer();
}

function drawEntity(entity) {
    ctx.drawImage(entity.sprite, entity.sx, entity.sy, entity.srcW, entity.srcH, entity.x, entity.y, entity.width, entity.height);
       
}

//Render Objects
function gameObject(gameObjectArray, gameObjectType, img, sx, sy, srcW, srcH, x, y, spd, width, height, id) {
    var gameObjectImg = new Image();
    gameObjectImg.src = img;
    
        this.sprite = gameObjectImg;
        this.gameObjectType = gameObjectType;
        this.sx = sx;
        this.sy = sy;
        this.srcW = srcW;
        this.srcH = srcH;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.spd = spd;
        this.id = id;
    
    gameObjectArray.push(this);
}

//controllers
var upPress = false;
var downPress = false;
var leftPress = false;
var rightPress = false;

document.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("resize", resizeCanvas, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPress = true;
        player.sx = 160;
    }
    if (e.keyCode == 37) {
        leftPress = true;
        player.sx = 480;
    }
    if (e.keyCode == 38) {
        upPress = true;
        player.sx = 0;
    }
    if (e.keyCode == 40) {
        downPress = true;
        player.sx = 320;
    }
}

function controlPlayer() {
    if (upPress == true && player.y > 10) {
        player.y = player.y - player.spd;
        upPress = false;
    } else if (downPress && player.y < 510) {
        player.y = player.y + player.spd;
        downPress = false;
    } else if (leftPress && player.x > 10) {
        player.x = player.x - player.spd;
        leftPress = false;
    } else if (rightPress && player.x < 540) {
        player.x = player.x + player.spd;
        rightPress = false;
    }
}

function obstacleMove(obstacle) {
    if (obstacle.x < gameWindow.width + 100) {
        obstacle.x = obstacle.x + obstacle.spd;
    } else {
        obstacle.x = -100;
    }
}

//Colliders
function collideWith(object) {
    
    if (player.x <= object.x + object.width / 2 && player.x >= object.x - object.width / 2 && player.y <= object.y + object.height / 2 && player.y >= object.y - object.height / 2) {
        if (object.gameObjectType.includes("obstacle")) {
            gameMaster.lives -= 1;
            player.x = 200;
            player.y = 500;
            console.log(gameMaster.lives);
            console.log("Speed = " + obstacles[0].spd);
            
        } else if (object.gameObjectType.includes("collectable")) {
            collectables.splice(collectables.indexOf(object), 1);
            gameMaster.coins += 1;
            gameMaster.score += 1;
            console.log("Player score is: " + gameMaster.score + "\nCoins collected: " + gameMaster.coins);
        }
    }
}

//Draw level
function drawWindow() {
    
    ctx.fillStyle = "lime";
    ctx.fillRect(0, 440, 570, 45);
    ctx.fillRect(0, 220, 570, 45);

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 570, 220);
    
}

function resizeCanvas(){
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
    
}
update();