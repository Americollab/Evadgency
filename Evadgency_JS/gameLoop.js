import { gameObject, collectables, staticObjects, player } from "./gameObjects.js";
import { animateGameObjects } from "./animator.js";
import * as render from "./renderResources.js";

export var gameStart, timeSet;

export var gameMaster = {
    difficulty: 1,
    score: 0,
    time: 500,
    lives: 3,
    coins: 0,
    gameOn: false,
    victoryPoints: 1,
}

var playerPosX, playerPosY;

window.onload = function () {
  updateUIElements();
  initialize();
  console.log("Game loaded!");
}

export function timer() {
  timeSet = setInterval(countDown, 1000);

  function countDown() {
    gameMaster.time--;
    //console.log(gameMaster.time);
    updateUIElements();
  }
}

//intialize after pages load.
function initialize() {
  render.initObjects();
  update();
}

// Game Logic Updates
export function update() {
    gameStart = requestAnimationFrame(update);
    render.ctx.clearRect(0, 0, gameWindow.width, gameWindow.height); //Clears sprites every frame
    render.drawBG();
    render.drawGameObjects();
    render.drawEntity(player);
    animateGameObjects();
    checkWin();
    checkLose();
}

//controllers
document.addEventListener("keydown", playerController, false);

function playerController(e) {
    playerPosX = player.x;
    playerPosY = player.y;
    if (e.keyCode == 38 && player.y > 16 && gameMaster.gameOn == true) {
        player.y = player.y - player.spd;
        player.sx = 0; // up
    } 
    if (e.keyCode == 40 && player.y < 608 && gameMaster.gameOn == true) {
        player.y = player.y + player.spd;
        player.sx = 128; // down
    }
    if (e.keyCode == 37 && player.x > 16 && gameMaster.gameOn == true) {
        player.x = player.x - player.spd;
        player.sx = 256; // left
    }
    if (e.keyCode == 39 && player.x < 608 && gameMaster.gameOn == true) {
        player.x = player.x + player.spd;
        player.sx = 320; // right
    }
    if (e.keyCode == 80) { //Press P to select a different avatar
        player.sy += 64;
        if (player.sy > 64 * 4) {
            player.sy = 64;
        }
    }
    if (e.keyCode == 27) { //Press Esc to pause game
        if (gameMaster.gameOn == true) {
            gameMaster.gameOn = false;
            isPause();
            document.getElementById("resume").className = "button";
            document.getElementById("start").className = "hidden";
            document.getElementById("next").className = "hidden";
            document.getElementById("wrapper").style.display = "flex";
        } else if (gameMaster.gameOn == false) {
            document.getElementById("wrapper").style.display = "none";
            gameMaster.gameOn = true;
            timer();
            gameStart = requestAnimationFrame(update);

        };
    }
    console.log(player.x + " - " + player.y);
}

//Colliders
export function collideWith(object) {

    if (player.x <= object.x + object.width / 2 && player.x >= object.x - object.width / 2 && player.y <= object.y + object.height / 2 && player.y >= object.y - object.height / 2) {
        if (object.gameObjectType.includes("obstacle")) {
            gameMaster.lives -= 1;
            player.sx = 64 * 4;
            player.sy = 64 * 5;
            render.drawEntity(player);
            if (gameMaster.lives != 0) {
                player.x = 320;
                player.y = 576;
                player.sx = 0;
                player.sy = 128;
                render.drawEntity(player);
            }
            console.log(gameMaster.lives);
            document.getElementById('lives').innerHTML = gameMaster.lives;

        } else if (object.gameObjectType.includes("collectable")) {
            collectables.splice(collectables.indexOf(object), 1);
            gameMaster.coins += 1;
            gameMaster.score += 1;
            console.log("Player score is: " + gameMaster.score + "\nCoins collected: " + gameMaster.coins);
            document.getElementById('score').innerHTML = gameMaster.score
            document.getElementById('coins').innerHTML = gameMaster.coins

        } else if (object.gameObjectType.includes("staticObject")) {
            player.x = playerPosX;
            player.y = playerPosY;
        }
    }
}

// win/lose states
function checkWin() {
  var winPos = [32, 96, 160, 224, 288, 352, 416, 480, 544];

  // Checks for win conditions
  if (player.y == 64 && winPos.includes(player.x)) {
    new gameObject(staticObjects, "staticObject", 'sprites/spritesheet.png', player.sx, player.sy, player.srcW, player.srcH, player.x, player.y, null, player.width, player.height);
    player.x = 320;
    player.y = 576;
    gameMaster.score += 100;
    gameMaster.victoryPoints--;
  } else if (gameMaster.victoryPoints == 0) {
    isPause();
    document.getElementById("next").className = "button";
    document.getElementById("resume").className = "hidden";
    document.getElementById("start").className = "hidden";
    document.getElementById("wrapper").style.display = "flex";
  }
}

function checkLose() {
    if (gameMaster.lives == 0 || gameMaster.time <= 0) {
        isPause();
        document.getElementById('time').innerHTML = "Game Over";
        setTimeout(function () {
            windows.open("https://forms.gle/qzGjwtB8tAim7NJ96");
            //Game Over Screen 
        }, 5000);
    }
}
//pause game
function isPause() {
  cancelAnimationFrame(gameStart);
  clearInterval(timeSet);
}

export function updateUIElements() {
  document.getElementById('lives').innerHTML = gameMaster.lives;
  document.getElementById('time').innerHTML = gameMaster.time;
  document.getElementById('score').innerHTML = gameMaster.score;
  document.getElementById('coins').innerHTML = gameMaster.coins;
  document.getElementById('difficulty').innerHTML = gameMaster.difficulty;
}