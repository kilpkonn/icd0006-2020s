
class GameWorld {
    constructor() {
        this.playerPos = {
            y: 0.5,
            x: 0.3,
        }
        this.walls = [];
        this.wallAddCooldown = 1800;
        this.wallAddChance = 0.9;

        this.currentWallAddCooldown = 1000;
    }
}

export default GameWorld;
