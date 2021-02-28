import GameWorld from '../model/game-world';
import WallController from './wall-controller';
import PlayerController from './player-controller';

class GameController {
    constructor(baseContainer) {
        this.container = baseContainer;
        this.gameWorld = new GameWorld();
        this.player = new PlayerController(this.gameWorld.player, this.gameWorld.gravity, baseContainer);
        this.isRunning = true;
    }

    step(dt) {
        this.checkCrash();
        if (!this.isRunning) return;

        this.gameWorld.currentWallAddCooldown -= dt;

        if (this.gameWorld.currentWallAddCooldown < 0) {
            if (Math.random() < this.gameWorld.wallAddChance * dt / 1000) {
                this.gameWorld.walls.push(new WallController(this.container));
                this.gameWorld.currentWallAddCooldown = this.gameWorld.wallAddCooldown;
            }
        }

        // this.gameWorld.walls = this.gameWorld.walls.filter(w => w.x + w.width >= 0);
        for (const wall of this.gameWorld.walls) {
            wall.step(dt);
        }

        this.player.step(dt)
    }

    checkCrash() {
        if (!this.isRunning) return;

        if (this.gameWorld.player.y - 1.3 * this.gameWorld.player.sizeX <= 0 || this.gameWorld.player.y >= 1) {
            this.isRunning = false;
        }

        for (const wall of this.gameWorld.walls) {
            if (wall.pos.x <= this.gameWorld.player.x + this.gameWorld.player.sizeX / 2 &&
                wall.pos.x + wall.pos.width >= this.gameWorld.player.x) {
                console.log("wall");
                if (1 - this.gameWorld.player.y + this.gameWorld.player.sizeY / 2 <= wall.pos.height) {
                    console.log("Top")
                    console.log(this.gameWorld.player, wall.pos)
                    this.isRunning = false;
                }
                if (this.gameWorld.player.y - this.gameWorld.player.sizeY <= (1 - wall.pos.height - wall.pos.gap)) {
                    console.log("bottom")
                    console.log(this.gameWorld.player, wall.pos)
                    this.isRunning = false;
                }
            }
        }
    }

}

export default GameController;
