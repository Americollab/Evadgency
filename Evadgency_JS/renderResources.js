
import { initObstacles, initStaticObstacles, initCollectables, collectables, staticObjects, obstacles, player } from "./gameObjects.js";
import { collideWith, obstacleMove } from "./gameLoop.js";


export let ctx = document.getElementById("gameWindow").getContext("2d");

export function initObjects() {
    initObstacles();
    initStaticObstacles();
    initCollectables();
}

export function drawGameObjects() {
    for (var key in collectables) {
        drawEntity(collectables[key]);
        collideWith(collectables[key]);
    }
    for (var key in obstacles) {
        drawEntity(obstacles[key]);
        obstacleMove(obstacles[key]);
        collideWith(obstacles[key]);
    }
    for (var key in staticObjects) {
        drawEntity(staticObjects[key]);
        collideWith(staticObjects[key]);
    }
}
//Draws game object sprites
export function drawEntity(entity) {
    ctx.save();
    ctx.drawImage(entity.sprite, entity.sx, entity.sy, entity.srcW, entity.srcH, entity.x, entity.y, entity.width, entity.height);
    ctx.restore();

}

//Draw level
window.addEventListener("resize", resizeCanvas, false);

export function drawBG() {
    //Tiling
    let tile = new Image();
    tile.src = 'sprites/DarkTextureBlueCarpet.png';
    var tilePattern = ctx.createPattern(tile, 'repeat');
    ctx.fillStyle = tilePattern;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillRect(0, 410, 570, 96);
    //Carpet
    let carpet = new Image();
    carpet.src = 'sprites/Green2.png';
    var carpetPattern = ctx.createPattern(carpet, 'repeat');
    ctx.fillStyle = carpetPattern;
    ctx.fillRect(0, 580, window.innerWidth, 64);
    ctx.fillRect(0, 100, window.innerWidth, 64);
    ctx.fillRect(0, 256, window.innerWidth, 64);
    ctx.fillRect(0, 384, window.innerWidth, 64);
    ctx.fillRect(0, 0, window.innerWidth, 100);
}

function resizeCanvas() {
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
}

