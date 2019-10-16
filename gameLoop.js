var ctx = document.getElementById("gameWindow").getContext("2d");
ctx.font = '30px Arial';

console.log("Game loaded!");
    
var gameMaster = {
    difficulty: 1,
    score: 0,
    time: 600,
    lives: 3,
    gameOn: true
}

var timer = setInterval(function(){   
    gameMaster.time = gameMaster.time - timer;
    console.log(gameMaster.time);  
},1000);

// Game Logic Updates
function update() {
    ctx.clearRect(0, 0, gameWindow.width, gameWindow.height);
    updateEntity(player);
    for (var key in obstacles) {
        updateEntity(obstacles[key]); 
    }
    
    if (gameMaster.lives == 0 || gameMaster.time == 0){
        cancelAnimationFrame(update);
        clearInterval(timer);
        console.log("Game Over");
    } else{
       requestAnimationFrame(update); 
    }
}

function updateEntity(entity) {

    ctx.drawImage(entity.sprite, entity.x, entity.y, entity.width, entity.height);
    controlPlayer();
    for (var key in obstacles) {
    obstacleMove(obstacles[key]);
    obstacleCollide(obstacles[key]);
    }
    
}



update();




