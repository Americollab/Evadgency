



//Picks 8 random unique numbers between 1 - 100
var arr = [];
while(arr.length < 8){
    var r = Math.floor(Math.random() * 100) + 1;
    if(arr.indexOf(r) === -1) arr.push(r);
}
console.log(arr);

//Rounds to nearest 5
const roundToNearest5 = x => Math.round(x/5)*5