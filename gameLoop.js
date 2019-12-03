var gameStart, timeSet , ctx = document.getElementById("gameWindow").getContext("2d");

window.onload = function () {
    document.getElementById('lives').innerHTML = gameMaster.lives;
    document.getElementById('time').innerHTML = gameMaster.time;
    document.getElementById('score').innerHTML = gameMaster.score;
    document.getElementById('coins').innerHTML = gameMaster.coins;
    document.getElementById('difficulty').innerHTML = gameMaster.difficulty;
    initialize();
    console.log("Game loaded!");
}
//GameMaster Object - Controls the game
var gameMaster = {
    difficulty: 1,
    score: 0,
    time: 500,
    lives: 3,
    coins: 0,
    gameOn: false,
    ticks: 0, //records ticks in the loop, resets if greater than ticksPerFrame
    ticksPerFrame: 6 //controls animation speed
}

function timer() {
    timeSet = setInterval (countDown, 1000);
    function countDown(){
        gameMaster.time--;
        console.log(gameMaster.time);
        document.getElementById('time').innerHTML = gameMaster.time;
    }
}

//intialize after pages load.
function initialize() {
    initObstacles();
    initCollectables();
    drawStaticObstacles();
    update();
}

// Game Logic Updates
function update() {
    ctx.clearRect(0, 0, gameWindow.width, gameWindow.height); //Clears sprites every frame
    drawBG();
    drawEntity(player);
    drawGameObjects();
    animateGameObjects();
    checkWin();
    checkLose();
    gameStart = requestAnimationFrame(update);
}



function animateGameObjects() {
    gameMaster.ticks += 1;
    if (gameMaster.ticks > gameMaster.ticksPerFrame) {
        gameMaster.ticks = 0;

        for (var key in collectables) {
            collectables[key].sx += 200;

            if (collectables[key].sx > 1000) {
                collectables[key].sx = 0;
            }
        }
    }
}

//controllers
document.addEventListener("keydown", playerController, false);

function playerController(e) {
    if (e.keyCode == 38 && player.y > 16 && gameMaster.gameOn == true) {
        player.y = player.y - player.spd;
        player.sx = 0; // up
    } else if (e.keyCode == 40 && player.y < 608 && gameMaster.gameOn == true) {
        player.y = player.y + player.spd;
        player.sx = 64; // down
    } else if (e.keyCode == 37 && player.x > 16 && gameMaster.gameOn == true) {
        player.x = player.x - player.spd;
        player.sx = 160; // left
    } else if (e.keyCode == 39 && player.x < 608 && gameMaster.gameOn == true) {
        player.x = player.x + player.spd;
        player.sx = 96; // right
    }

    if (e.keyCode == 80) { //Press P to select a different player
        player.sy += 32;
        if (player.sy > 96) {
            player.sy = 32;
        }
    }
    if (e.keyCode == 27) {
        if (gameMaster.gameOn == true) {
            gameMaster.gameOn = false;
            isPause();
            document.getElementById("resume").className = "button";
            document.getElementById("start").className = "hidden";
            document.getElementById("wrapper").style.display = "flex";
        } else if (gameMaster.gameOn == false){
            document.getElementById("wrapper").style.display = "none";
            gameMaster.gameOn = true;
            timer();
            gameStart = requestAnimationFrame(update);
            
        };
    }
    console.log(player.x + " - " + player.y);
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
            player.y = 576;
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

// win-lose states
function checkWin() {
    // Checks for win conditions
    // Level Up!
}

function checkLose() {
    if (gameMaster.lives == 0 || gameMaster.time <= 0) {
        isPause();
        document.getElementById('time').innerHTML = "Game Over";
        setTimeout(function () {
            //Game Over Screen 
        }, 5000);
    }
}
//pause game
function isPause() {
    cancelAnimationFrame(gameStart);
    clearInterval(timeSet);
}