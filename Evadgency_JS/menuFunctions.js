import { gameMaster, timer, update } from "./gameLoop.js";
import { nextLevel } from "./gameObjects.js";

document.getElementById("start").focus();

//Function to start game on click of start button
document.getElementById("start").addEventListener("click", start);
document.getElementById("next").addEventListener("click", nextLevel);
document.getElementById("how").addEventListener("click", howto);
document.getElementById("resume").addEventListener("click", resume);

function start() {
    gameMaster.gameOn = true;
    timer();
    document.getElementById("wrapper").style.display = "none";
};

function resume() {
    document.getElementById("wrapper").style.display = "none";
    gameMaster.gameOn = true;
    timer();
    requestAnimationFrame(update);
}

//Function to display alert box with game instructions
function howto() {
    alert("Use arrow keys to move character.\nAvoid moving and stationary obstacles.\nCollect coins as you progress.\nReach the end of the level before your time runs out!");
};

//Pause Function Moved To gameLoop isPause() method
