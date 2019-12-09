//gameObjects arrays
var obstacles = [], collectables = [], staticObjects = [];

var img = new Image();
img.src = 'sprites/SpriteSheet.png';
var player = {
    sprite: img,
    sx: 0,
    sy: 32,
    srcW: 32,
    srcH: 32,
    x: 320,
    y: 576,
    width: 32,
    height: 32,
    spd: 32
};

//gameObject calls
function initObstacles() {
    var laneSpawn1 = [451, 483, 515, 547];
    for (var i = 0; i < laneSpawn1.length; i++) {
        new gameObject(obstacles, "obstacle", "sprites/obstacle.png", 0, 0, 500, 385, Math.round(Math.random() * 640), laneSpawn1[i], 1, 32, 32);
    }
}

function initCollectables(x) {
    new gameObject(collectables, "collectable", "sprites/collectable.png", 0, 0, 200, 200, 250, 451, null, 32, 32);
}

function drawGameObjects() {
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
    }
}

//Constructs game objects
function gameObject(gameObjectArray, gameObjectType, img, sx, sy, srcW, srcH, x, y, spd, width, height) {

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
//Draws game object sprites
function drawEntity(entity) {
    ctx.drawImage(entity.sprite, entity.sx, entity.sy, entity.srcW, entity.srcH, entity.x, entity.y, entity.width, entity.height);

}

//Draw level
window.addEventListener("resize", resizeCanvas, false);
function drawBG() {
    //Tiling
    tile = new Image();
    tile.src = 'sprites/DarkTextureBlueCarpet.png';
    var tilePattern = ctx.createPattern(tile, 'repeat');
    ctx.fillStyle = tilePattern;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillRect(0, 410, 570, 96);
    //Carpet
    carpet = new Image();
    carpet.src = 'sprites/TileBlueGreen.png';
    var carpetPattern = ctx.createPattern(carpet, 'repeat');
    ctx.fillStyle = carpetPattern;
    ctx.fillRect(0, 580, window.innerWidth, 64);
    ctx.fillRect(0, 384, window.innerWidth, 64);
    ctx.fillRect(0, 0, window.innerWidth, 96);
}

function drawStaticObstacles() {
    // wallpos params [source x, source y, x, y]
    var wallPos = [
        [256, 32, 0, 0], [288, 32, 32, 0], [320, 32, 64, 0], [288, 32, 96, 0], [320, 32, 128, 0], [288, 32, 160, 0], [320, 32, 192, 0], [288, 32, 224, 0], [320, 32, 256, 0], [288, 32, 288, 0], [320, 32, 320, 0], [288, 32, 352, 0], [320, 32, 384, 0], [288, 32, 416, 0], [320, 32, 448, 0], [288, 32, 480, 0], [320, 32, 512, 0], [288, 32, 544, 0], [320, 32, 576, 0], [352, 32, 608, 0],
        [0, 32, 0, 32], [320, 64, 64, 32], [320, 64, 128, 32], [320, 64, 192, 32], [320, 64, 256, 32], [320, 64, 320, 32], [320, 64, 384, 32], [320, 64, 448, 32], [320, 64, 512, 32], [320, 64, 576, 32],
        [256, 0, 0, 64], [320, 0, 64, 64], [320, 0, 128, 64], [320, 0, 192, 64], [320, 0, 256, 64], [320, 0, 320, 64], [320, 0, 384, 64], [320, 0, 448, 64], [320, 0, 512, 64], [320, 0, 576, 64],
        [320, 32, 64, 352], [288, 32, 128, 352],[320, 32, 160, 352],
        [320, 64, 64, 384], [320, 64, 160, 384],
        [320, 0, 64, 416], [288, 0, 128, 416], [320, 0, 160, 416]
    ];
    for (i = 0; i < wallPos.length; i++) {
        new gameObject(staticObjects, "staticObject", "sprites/SpriteSheet.png", (wallPos[i])[0], (wallPos[i])[1], 32, 32, (wallPos[i])[2], (wallPos[i])[3], null, 32, 32); //Might have issue with srcX and srcY being reversed somehow
    }
    new gameObject(staticObjects, "staticObject", "sprites/SpriteSheet.png", 224, 0, 32, 32, 608, 64, null, 32, 32);

}

function resizeCanvas() {
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
}