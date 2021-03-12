import GameWorld from '../model/game-world';
import WallController from './wall-controller';
import PlayerController from './player-controller';
import GameView from '../view/game-view';
import MenuController from './menu-controller';

class GameController {
    constructor(baseContainer) {
        this.container = baseContainer;
        this.gameWorld = new GameWorld();
        this.player = new PlayerController(this.gameWorld.player, this.gameWorld.gravity, baseContainer);
        this.menu = new MenuController(baseContainer);
        this.view = new GameView(baseContainer);
        this.isRunning = false;

        window.addEventListener('keypress', (e) => this.onKeyPressed(e))
    }

    step(dt) {
        if (!this.isRunning) {
            return this.menu.step(dt);
        }
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
        this.view.render(this.gameWorld.player);
    }

    checkCrash() {
        if (!this.isRunning) return;

        if (this.gameWorld.player.y - 1.3 * this.gameWorld.player.sizeX <= 0 || this.gameWorld.player.y >= 1) {
            this.onGameOver();
        }

        for (const wall of this.gameWorld.walls) {
            if (wall.pos.x <= this.gameWorld.player.x + this.gameWorld.player.sizeX / 2 &&
                wall.pos.x + wall.pos.width >= this.gameWorld.player.x) {

                if (wall.pos.x <= this.gameWorld.player.x && !wall.crossed) {
                    this.gameWorld.player.score += 1;
                    wall.crossed = true;
                }

                if (1 - this.gameWorld.player.y + this.gameWorld.player.sizeY / 2 <= wall.pos.height) {
                    console.log("Top")
                    this.onGameOver();
                }
                if (this.gameWorld.player.y - this.gameWorld.player.sizeY <= (1 - wall.pos.height - wall.pos.gap)) {
                    console.log("bottom")
                    this.onGameOver();
                }
            }
        }
    }

    onKeyPressed(keyEvent) {
        if (keyEvent.code !== 'Space') {
            return;
        }

        if (!this.isRunning) {
            if (this.menu.isGameOver) {
                this.menu.isGameOver = false;
            } else {
                this.isRunning = true;
                this.menu.isGameOver = true;
                this.menu.hide();
                this.player.reset();
                this.gameWorld.walls.forEach((w) => w.dispose());
                this.gameWorld.walls = [];
            }
        }
    }

    onGameOver() {
        this.isRunning = false;
        const name = prompt("Enter your name");
        this.menu.leaderboard.scores.push({
            name: name,
            score: this.gameWorld.player.score
        });
    }

}

export default GameController;
