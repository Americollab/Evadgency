//gameObjects arrays
var obstacles = [], collectables = [];

var img = new Image();
img.src = 'sprites/spritemap.png';
var player = {
    sprite: img,
    sx: 0,
    sy: 0,
    srcW: 80,
    srcH: 80,
    x: 320,
    y: 576,
    width: 32,
    height: 32,
    spd: 32
};

//gameObject calls

function drawObstacles(){
    var laneSpawn1 = [451,483,515,547];
    for( var i = 0; i < laneSpawn1.length; i++){
        new gameObject(obstacles, "obstacle", "sprites/obstacle.png", 0, 0, 500, 385, Math.round(Math.random() * 640), laneSpawn1[i], 1, 32, 32);    
    }
    
}

function drawCollectables(x){
    var srcClip = [0,200,400,600,800,1000];
    new gameObject(collectables, "collectable", "sprites/collectable.png", srcClip[x], 0, 200, 200, 300, 300, null, 32, 32);
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
    tile.src = 'sprites/CenterTileBlue.png';
    var tilePattern = ctx.createPattern(tile, 'repeat');
    ctx.fillStyle = tilePattern;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillRect(0, 410, 570, 96);
    //Carpet
    carpet = new Image();
    carpet.src = 'sprites/CarpetGreenSolid.png';
    var carpetPattern = ctx.createPattern(carpet, 'repeat');
    ctx.fillStyle = carpetPattern;
    ctx.fillRect(0, 580, window.innerWidth, 60);
    ctx.fillRect(0, 387, window.innerWidth, 60);

}

function drawStaticObstacles() {
    //Will draw desks and wall
}

function resizeCanvas() {
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
}