import Player from './player';

class GameWorld {
    constructor() {
        this.player = new Player();

        this.walls = [];
        this.wallAddCooldown = 2100;
        this.wallAddChance = 0.9;

        this.gravity = 0.013;

        this.currentWallAddCooldown = 0;
    }
}

export default GameWorld;
