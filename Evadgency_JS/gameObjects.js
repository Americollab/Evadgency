import { gameMaster, timer, updateUIElements, update } from "./gameLoop.js";
import { initObjects } from "./renderResources.js";

export var obstacles = [],
    collectables = [],
    staticObjects = [];
    var laneSpeed;

var img = new Image();
img.src = 'sprites/spritesheet.png';
export var player = {
    sprite: img,
    sx: 0,
    sy: 128,
    srcW: 64,
    srcH: 64,
    x: 320,
    y: 576,
    width: 32,
    height: 32,
    spd: 32
};

export function gameObject(gameObjectArray, gameObjectType, img, sx, sy, srcW, srcH, x, y, spd, width, height) {

    var gameObjectImg = new Image();
    gameObjectImg.src = img;
    this.sprite = gameObjectImg;
    this.gameObjectType = gameObjectType;
    this.sx = sx;
    this.sy = sy;
    this.srcW = srcW;
    this.srcH = srcH;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.spd = spd;

    gameObjectArray.push(this);
}

//gameObject initializations on game start
export function initObstacles() { //if statements to initialize same code for different rows to create full layout
    var laneSpawn1 = [96, 160, 192, 224, 451, 483, 515, 547, 288, 320, 352, 384];
    if (gameMaster.difficulty === 1){
      laneSpeed = 1;
    } else {
      laneSpeed = gameMaster.difficulty - (gameMaster.difficulty - 1) + (gameMaster.difficulty / 5);
    }
    for (var i = 0; i < laneSpawn1.length; i++) {
        var temp = Math.round(Math.random() * 100) + 1;
        var computerResponse = getRandomInt(5, 8);
        if (temp < 50) {
            new gameObject(obstacles, "obstacleRight", "sprites/spritesheet.png", 64, 64 * computerResponse, 64, 64, Math.round(Math.random() * 576), laneSpawn1[i], laneSpeed, 32, 32);
        } else {
            new gameObject(obstacles, "obstacleLeft", "sprites/spritesheet.png", 64 * 3, 64 * computerResponse, 64, 64, Math.round(Math.random() * 576), laneSpawn1[i], laneSpeed, 32, 32);
        }
    }
}

export function initStaticObstacles() { //if statements to initialize same code for different rows to create full layout
    var staticSpawn = [
        [32, 416], [128, 416], [256, 416], [320, 416], [416, 416], [512, 416],
        [0, 256], [160, 256], [288, 256], [448, 256], [576, 256],
        [64, 128], [128, 128], [256, 128], [384, 128], [512, 128]
    ];
    for (var i = 0; i < staticSpawn.length; i++) {
        
        var deskMap = [[4, 6], [4, 7], [4, 8], [6, 7], [6, 8]]; // location of desks on spritesheet.
        var temp = getRandomInt(0, 4); // Selects which random desk to get from sprites
        if (rollChance() > 50){
            new gameObject(staticObjects, "staticObjects", "sprites/spritesheet.png", 64 * (deskMap[temp])[0], 64 * (deskMap[temp])[1], 64, 64, staticSpawn[i][0], staticSpawn[i][1], null, 32, 32);
            new gameObject(staticObjects, "staticObjects", "sprites/spritesheet.png", 64 * (deskMap[temp])[0] + 64, 64 * (deskMap[temp])[1], 64, 64, staticSpawn[i][0] + 32, staticSpawn[i][1], null, 32, 32);
        }
    }
    var wallPos = [
        [256, 32, 0, 0], [288, 32, 32, 0], [320, 32, 64, 0], [288, 32, 96, 0], [320, 32, 128, 0], [288, 32, 160, 0], [320, 32, 192, 0], [288, 32, 224, 0], [320, 32, 256, 0], [288, 32, 288, 0], [320, 32, 320, 0], [288, 32, 352, 0], [320, 32, 384, 0], [288, 32, 416, 0], [320, 32, 448, 0], [288, 32, 480, 0], [320, 32, 512, 0], [288, 32, 544, 0], [320, 32, 576, 0], [352, 32, 608, 0],
        [0, 32, 0, 32], [320, 64, 64, 32], [320, 64, 128, 32], [320, 64, 192, 32], [320, 64, 256, 32], [320, 64, 320, 32], [320, 64, 384, 32], [320, 64, 448, 32], [320, 64, 512, 32], [320, 64, 576, 32],
        [256, 0, 0, 64], [320, 0, 64, 64], [320, 0, 128, 64], [320, 0, 192, 64], [320, 0, 256, 64], [320, 0, 320, 64], [320, 0, 384, 64], [320, 0, 448, 64], [320, 0, 512, 64], [320, 0, 576, 64]
    ];
    for (i = 0; i < wallPos.length; i++) {
        new gameObject(staticObjects, "staticObject", 'sprites/SpriteSheet32x32.png', (wallPos[i])[0], (wallPos[i])[1], 32, 32, (wallPos[i])[2], (wallPos[i])[3], null, 32, 32); //Might have issue with srcX and srcY being reversed somehow
    }
    new gameObject(staticObjects, "staticObject", 'sprites/spritesheet.png', 64 * 7, 64, 64, 64, 608, 64, null, 32, 32);
}

export function nextLevel() {
    gameMaster.gameOn = true;
    gameMaster.difficulty += 1;
    gameMaster.victoryPoints = gameMaster.difficulty;
    updateUIElements();
    obstacles = [];
    collectables = [];
    staticObjects = [];
    timer();
    initObjects();
    requestAnimationFrame(update);
    document.getElementById("wrapper").style.display = "none";
    console.log(laneSpeed);
};

export function initCollectables() {
    var laneSpawn1 = [192, 320, 448];
    for (var i = 0; i < laneSpawn1.length; i++) {
        new gameObject(collectables, "collectable", "sprites/spritesheet.png", 0, 0, 64, 64, Math.round(Math.random() * 576), laneSpawn1[i], null, 32, 32);
    }
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function rollChance() {
    return Math.round(Math.random() * 100) + gameMaster.difficulty * 5;
}