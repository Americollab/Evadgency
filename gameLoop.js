//gameWindow
var ctx = document.getElementById("gameWindow").getContext("2d");
ctx.font = '30px Arial';

console.log("Game loaded!");
window.onload = function (){
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
    gameOn: true,
    ticks: 0, //records ticks in the loop, resets if greater than ticksPerFrame
    ticksPerFrame: 6 //controls animation speed
}

var timer = setInterval(function () {
    gameMaster.time--;
    console.log(gameMaster.time);
    this.document.getElementById('time').innerHTML = this.gameMaster.time
}, 1000);

//intialize after pages load.
function initialize() {

    initObstacles();
    initCollectables();
    drawStaticObstacles();
    update();
}

// Game Logic Updates
function update() {
    ctx.clearRect(0, 0, gameWindow.width, gameWindow.height); //Clears sprites 

    drawBG();
    drawEntity(player);
    drawGameObjects();
    animateGameObjects();
    checkLose();
    
}

function animateGameObjects(){
    gameMaster.ticks += 1;
    if (gameMaster.ticks > gameMaster.ticksPerFrame) {
        gameMaster.ticks = 0;
        
        for(var key in collectables){
            collectables[key].sx += 200;

            if(collectables[key].sx > 1000){
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
    
    if(e.keyCode == 80){ //Press P to select a different player
        player.sy += 32;
        if (player.sy > 96){
            player.sy = 32;
        }
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

// win/lose states

function checkWin (){
    // Checks for win conditions
    // Level Up!
}

function checkLose(){
    if (gameMaster.lives == 0 || gameMaster.time <= 0) {
        cancelAnimationFrame(update);
        clearInterval(timer);
        console.log("Game Over"); 
        //Call to Game Over UI will go here
    } else {
        requestAnimationFrame(update);
    }
}

initialize();
