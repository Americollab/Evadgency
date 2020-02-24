
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function rollChance(bias, difficulty = 1) {
    return Math.round(Math.random() * 100) + bias * difficulty;
}