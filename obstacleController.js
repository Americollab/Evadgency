function obstacleMove(){
    if(obstacle.x < gameWindow.width + 100){
        obstacle.x = obstacle.x + obstacle.spd;
    
    } else{
        obstacle.x = -100;
    }
}
