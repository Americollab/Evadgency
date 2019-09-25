var ctx = document.getElementById("gameWindow").getContext("2d");
ctx.font = '30px Arial';
console.log("Game loaded!");

setInterval(update, 40);

var player = {
    sprite: "p",
    x: 50,
    y: 40,
    spd: 10,
    width: 20,
    height: 20,
    
};

// Game Logic Updates
function updateEntity(entity) {
    entity.x += entity.spd;
    entity.y += entity.spd;
    ctx.fillStyle = "white";
    ctx.fillRect(entity.x, entity.y,entity.width,entity.height);
    
}

function update() {
    
    updateEntity(player);
}
function draw() {
    $.getScript("gameDraw.js", function () {
        drawBackground();
    });

    requestAnimationFrame(draw);
}

draw();




