var upPress = false;
var downPress = false;
var leftPress = false;
var rightPress = false;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {

    if (e.keyCode == 39) {
        rightPress = true;
        console.log("Right.");
    }
    if (e.keyCode == 37) {
        leftPress = true;
        console.log("Left.");
    }
    if (e.keyCode == 38) {
        upPress = true;
        console.log("Up.");
    }
    if (e.keyCode == 40) {
        downPress = true;
        console.log("Down.");
    }
}

function controlPlayer() {

        if (upPress == true && player.y > 10) {
            player.y = player.y - player.spd;
            upPress = false;
        } else if (downPress && player.y < 510) {
            player.y = player.y + player.spd;
            downPress = false;
        } else if (leftPress && player.x > 10) {
            player.x = player.x - player.spd;
            leftPress = false;
        } else if (rightPress && player.x < 540) {
            player.x = player.x + player.spd;
            rightPress = false;
        }
}
