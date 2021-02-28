import GameWorld from '../model/game-world';
import WallController from './wall-controller';
import PlayerController from './player-controller';

class GameController {
    constructor(baseContainer) {
        this.container = baseContainer;
        this.gameWorld = new GameWorld();
        this.player = new PlayerController(this.gameWorld.player, baseContainer);
        this.isRunning = true;
    }

    step(dt) {
        this.gameWorld.currentWallAddCooldown -= dt;

        if (this.gameWorld.currentWallAddCooldown < 0) {
            if (Math.random() < this.gameWorld.wallAddChance * dt / 1000) {
                this.gameWorld.walls.push(new WallController(this.container))
                this.gameWorld.currentWallAddCooldown = this.gameWorld.wallAddCooldown;
            }
        }

        for (let wall of  this.gameWorld.walls) {
            wall.step(dt);
        }

        this.player.step(dt)

    }

}

export default GameController;
