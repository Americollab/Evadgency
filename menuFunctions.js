//Function to start game on click of start button
function start() {
    gameMaster.gameOn = true;
    timer();
    document.getElementById("wrapper").style.display = "none";
};

function resume() {
    document.getElementById("wrapper").style.display = "none";
    gameMaster.gameOn = true;
    timer();
    gameStart = requestAnimationFrame(update);
}

function nextLevel(){
    gameMaster.gameOn = true;
    gameMaster.difficulty +=1;
    gameMaster.victoryPoints = gameMaster.difficulty;
    this.updateUIElements();
    obstacles = [];
    collectables = [];
    staticObjects = [];
    timer();
    initObjects();
    gameStart = requestAnimationFrame(update);
    document.getElementById("wrapper").style.display = "none";
    
    
};

//Function to display alert box with game instructions
function howto() {
    alert("Use arrow keys to move character.\nAvoid moving and stationary obstacles.\nCollect coins as you progress.\nReach the end of the level before your time runs out!");
};

//Pause Function Moved To gameLoop isPause() method
