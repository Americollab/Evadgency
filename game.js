var ctx = document.getElementById("gameWindow").getContext("2d");
ctx.font = '30px Arial';

setInterval(update, 40);
console.log("Game loaded!");

var player = {
    sprite: "p",
    x: 50,
    y: 50,
    spd: 10,
};

function updateEntity(entity) {
    entity.x += entity.spd;
    entity.y += entity.spd;
    ctx.fillText(entity.sprite, entity.x, entity.y);
}

function update() {
    console.log(ctx);
    updateEntity(player);
}