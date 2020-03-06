import { gameMaster, timer, updateUIElements, update } from "./gameLoop.js";
import { rollChance, getRandomInt, randomInterval32 } from "./util.js";
import { coordinates } from "./objectData.js";

export var obstacles = [],
    collectables = [],
    staticObjects = [];

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

export function initObjects() {
    initObstacles();
    initStaticObstacles();
    initCollectables();
    initObjectives();
}

export function initObstacles() {

    for (var ii = 0; ii < increaseSpawn(gameMaster.difficulty); ii++) {
        for (var i = 0; i < coordinates.interactables.length; i++) {

            if (rollChance(1) < 50) {
                new gameObject(obstacles, "obstacleRight", "sprites/spritesheet.png", 64, 64 * getRandomInt(5, 8), 64, 64, randomInterval32(), coordinates.interactables[i], setSpeed(), 32, 32);
            } else {
                new gameObject(obstacles, "obstacleLeft", "sprites/spritesheet.png", 64 * 3, 64 * getRandomInt(5, 8), 64, 64, randomInterval32(), coordinates.interactables[i], setSpeed(), 32, 32);
            }
        }
    }

    function setSpeed (){
        let laneSpeed;
        if (gameMaster.difficulty === 1) {
            laneSpeed = 1;
        } else {
            laneSpeed = gameMaster.difficulty - (gameMaster.difficulty - 1) + (gameMaster.difficulty / 5);
        }
        return laneSpeed;
    }

    function increaseSpawn(input) {
        console.log("GameDifficulty: " + input);
        var result = input / 5;
        if (result < 1) {
            return 1;
        } else {
            return Math.floor(result);
        }
    }
    console.log(increaseSpawn(gameMaster.difficulty));
}

export function initStaticObstacles() {
    //desks
    for (var i = 0; i < coordinates.desks.length; i++) {
        var randomInt = getRandomInt(0, 4);
        var deskMap = [[4, 6], [4, 7], [4, 8], [6, 7], [6, 8]]; // location of desks on spritesheet.
        if (rollChance(5, gameMaster.difficulty) > 50) {
            new gameObject(staticObjects, "staticObjects", "sprites/spritesheet.png", 64 * (deskMap[randomInt])[0], 64 * (deskMap[randomInt])[1], 64, 64, coordinates.desks[i][0], coordinates.desks[i][1], null, 32, 32);
            new gameObject(staticObjects, "staticObjects", "sprites/spritesheet.png", 64 * (deskMap[randomInt])[0] + 64, 64 * (deskMap[randomInt])[1], 64, 64, coordinates.desks[i][0] + 32, coordinates.desks[i][1], null, 32, 32);
        }
    }
    //walls
    for (i = 0; i < coordinates.walls.length; i++) {
        new gameObject(staticObjects, "staticObject", 'sprites/SpriteSheet32x32.png', (coordinates.walls[i])[0], (coordinates.walls[i])[1], 32, 32, (coordinates.walls[i])[2], (coordinates.walls[i])[3], null, 32, 32); //Might have issue with srcX and srcY being reversed somehow
    }
    new gameObject(staticObjects, "staticObject", 'sprites/spritesheet.png', 64 * 7, 64, 64, 64, 608, 64, null, 32, 32); // patty
}

export function initCollectables() {
    for (var i = 0; i < coordinates.interactables.length; i++) {
        if (rollChance(1) > 95) {
            new gameObject(collectables, "collectable", "sprites/spritesheet.png", 0, 0, 64, 64, randomInterval32(), coordinates.interactables[i], null, 32, 32);
        }
    }
}

function initObjectives() {
    var deskMap = [[4, 6], [4, 7], [4, 8], [6, 7], [6, 8]];
    for (var i = 0; i < coordinates.objectives.length; i++) {
        var randomInt = getRandomInt(0, 4);
        //Spawn objective desk.
        //Occupied desks = goal
        //Unoccupied does not.
        //Max 5
        new gameObject(staticObjects, "staticObjects", "sprites/spritesheet.png", 64 * (deskMap[randomInt])[0], 64 * (deskMap[randomInt])[1], 64, 64, coordinates.objectives[i], 32, null, 32, 32);
        new gameObject(staticObjects, "staticObjects", "sprites/spritesheet.png", 64 * (deskMap[randomInt])[0] + 64, 64 * (deskMap[randomInt])[1], 64, 64, coordinates.objectives[i] + 32, 32, null, 32, 32);
    }
}

export function nextLevel() {
    gameMaster.gameOn = true;
    gameMaster.difficulty += 1;
    gameMaster.victoryPoints = gameMaster.difficulty; //Needs to be initialized on start of game
    updateUIElements();
    obstacles = [];
    collectables = [];
    staticObjects = [];
    timer();
    initObjects();
    requestAnimationFrame(update);
    document.getElementById("wrapper").style.display = "none";
    
};

