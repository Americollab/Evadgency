var rightPress = false;
var leftPress = false;
var upPress = false;
var downPress = false;
var up = true;
var down = true;
var right = true;
var left = true;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.keyCode == 39){rightPress = true; console.log("Right.");}
    if(e.keyCode == 37){leftPress = true; console.log("Left.");}
    if(e.keyCode == 38){upPress = true; console.log("Up.");}
    if(e.keyCode == 40){downPress = true; console.log("Down.");}
}

function keyUpHandler(e){
    if(e.keyCode == 39){rightPress = false;}
    if(e.keyCode == 37){leftPress = false;}
    if(e.keyCode == 38){upPress = false;}
    if(e.keyCode == 40){downPress = false;}
}
