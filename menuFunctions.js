//Function to start game on click of start button
function start() {
    if (gameStart) {
        gameMaster.gameOn = true;
        document.getElementById("wrapper").style.display = "none";
    } else {
        initialize();
        gameMaster.gameOn = true;
        document.getElementById("wrapper").style.display = "none";
    }
};

//Function to display alert box with game instructions
function howto() {
    alert("Use arrow keys to move character.\nAvoid moving and stationary obstacles.\nCollect coins as you progress.\nReach the end of the level before your time runs out!");
};

//Escape key press will bring up menu and pause game
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        document.getElementById("start").innerHTML = "Continue";
        document.getElementById("wrapper").style.display = "flex";
    }
};