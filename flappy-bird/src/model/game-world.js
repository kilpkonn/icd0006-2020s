import Player from './player';

class GameWorld {
    constructor() {
        this.player = new Player();

        this.walls = [];
        this.wallAddCooldown = 1800;
        this.wallAddChance = 0.9;

        this.currentWallAddCooldown = 1000;
    }
}

export default GameWorld;
