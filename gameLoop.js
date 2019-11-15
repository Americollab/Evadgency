var gameStart = false;

//gameWindow
var ctx = document.getElementById("gameWindow").getContext("2d");
ctx.font = '30px Arial';

console.log("Game loaded!");
window.onload = function () {
    //Gets lives variable and displays in UI
    document.getElementById('lives').innerHTML = this.gameMaster.lives;
    //Gets time variable and displays in UI
    this.document.getElementById('time').innerHTML = this.gameMaster.time
    //Gets score variable and displays in UI
    this.document.getElementById('score').innerHTML = this.gameMaster.score
    //Gets coins variable and displays in UI
    this.document.getElementById('coins').innerHTML = this.gameMaster.coins
    //Gets difficulty variable and displays in UI
    this.document.getElementById('difficulty').innerHTML = this.gameMaster.difficulty
}
//GameMaster Object - Controls the game
var gameMaster = {
    difficulty: 1,
    score: 0,
    time: 500,
    lives: 3,
    coins: 0,
    gameOn: false
}

function timer() {
    var timer = setInterval(function () {
        gameMaster.time--;
        console.log(gameMaster.time);
        this.document.getElementById('time').innerHTML = this.gameMaster.time
    }, 1000);
}

//intialize after pages load.
function initialize() {
    timer();
    drawObstacles();
    update();
    gameStart = true;
}

// Game Logic Updates
function update() {
    ctx.clearRect(0, 0, gameWindow.width, gameWindow.height); //Clears sprites 

    drawBG();
    drawEntity(player);

    for (var key in collectables) {
        drawEntity(collectables[key]);
        collideWith(collectables[key]);
    }
    for (var key in obstacles) {
        drawEntity(obstacles[key]);
        obstacleMove(obstacles[key]);
        collideWith(obstacles[key]);
    }

    if (gameMaster.lives == 0 || gameMaster.time <= 0) {
        cancelAnimationFrame(update);
        clearInterval(timer);
        console.log("Game Over");
    } else {
        requestAnimationFrame(update);
    }


}

//controllers
document.addEventListener("keydown", playerController, false);

function playerController(e) {
    if (e.keyCode == 38 && player.y > 16 && gameMaster.gameOn == true) {
        player.y = player.y - player.spd;
        player.sx = 0;
    } else if (e.keyCode == 40 && player.y < 576 && gameMaster.gameOn == true) {
        player.y = player.y + player.spd;
        player.sx = 320;
    } else if (e.keyCode == 37 && player.x > 16 && gameMaster.gameOn == true) {
        player.x = player.x - player.spd;
        player.sx = 480;
    } else if (e.keyCode == 39 && player.x < 608 && gameMaster.gameOn == true) {
        player.x = player.x + player.spd;
        player.sx = 160;
    }
}

function obstacleMove(obstacle) {
    if (obstacle.x < gameWindow.width + 100) {
        obstacle.x += obstacle.spd;

    } else {
        obstacle.x = -100;
    }
}

//Colliders
function collideWith(object) {
    if (player.x <= object.x + object.width / 2 && player.x >= object.x - object.width / 2 && player.y <= object.y + object.height / 2 && player.y >= object.y - object.height / 2) {
        if (object.gameObjectType.includes("obstacle")) {
            gameMaster.lives -= 1;
            player.x = 320;
            player.y = 608;
            console.log(gameMaster.lives);
            document.getElementById('lives').innerHTML = this.gameMaster.lives;

        } else if (object.gameObjectType.includes("collectable")) {
            collectables.splice(collectables.indexOf(object), 1);
            gameMaster.coins += 1;
            gameMaster.score += 1;
            console.log("Player score is: " + gameMaster.score + "\nCoins collected: " + gameMaster.coins);
            this.document.getElementById('score').innerHTML = this.gameMaster.score
            this.document.getElementById('coins').innerHTML = this.gameMaster.coins
        }
    }
}