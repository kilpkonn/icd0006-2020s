import GameWorld from '../model/game-world';
import WallController from './wall-controller';
import PlayerController from './player-controller';
import GameView from '../view/game-view';
import MenuController from './menu-controller';
import Player from "../model/player";

class GameController {
    container: Element
    gameWorld: GameWorld
    player: PlayerController
    menu: MenuController
    view: GameView
    isRunning: boolean
    constructor(baseContainer: Element) {
        this.container = baseContainer;
        this.gameWorld = new GameWorld();
        this.player = new PlayerController(this.gameWorld.player, GameWorld.gravity, baseContainer);
        this.menu = new MenuController(baseContainer);
        this.view = new GameView(baseContainer);
        this.isRunning = false;

        window.addEventListener('keypress', (e) => this.onKeyPressed(e))
    }

    step(dt: number) {
        if (!this.isRunning) {
            return this.menu.step(dt);
        }
        this.checkCrash();
        if (!this.isRunning) return;

        this.gameWorld.currentWallAddCooldown -= dt;

        if (this.gameWorld.currentWallAddCooldown < 0) {
            if (Math.random() < GameWorld.wallAddChance * dt / 1000) {
                this.gameWorld.walls.push(new WallController(this.container));
                this.gameWorld.currentWallAddCooldown = GameWorld.wallAddCooldown;
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

        if (this.gameWorld.player.y - 1.3 * Player.sizeX <= 0 || this.gameWorld.player.y >= 1) {
            this.onGameOver();
        }

        for (const wall of this.gameWorld.walls) {
            if (wall.pos.x <= this.gameWorld.player.x + Player.sizeX / 2 &&
                wall.pos.x + wall.pos.width >= this.gameWorld.player.x) {

                if (wall.pos.x <= this.gameWorld.player.x && !wall.pos.crossed) {
                    this.gameWorld.player.score += 1;
                    wall.pos.crossed = true;
                }

                if (1 - this.gameWorld.player.y + Player.sizeY / 2 <= wall.pos.height) {
                    console.log("Top")
                    this.onGameOver();
                }
                if (this.gameWorld.player.y - Player.sizeY <= (1 - wall.pos.height - wall.pos.gap)) {
                    console.log("bottom")
                    this.onGameOver();
                }
            }
        }
    }

    onKeyPressed(keyEvent: KeyboardEvent) {
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
            name: name || "anonymous",
            score: this.gameWorld.player.score
        });
    }

}

export default GameController;
