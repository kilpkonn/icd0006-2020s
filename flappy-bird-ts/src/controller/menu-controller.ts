import Leaderboard from '../model/leaderboard';
import StartGameView from '../view/start-game-view';
import GameOverView from '../view/game-over-view';

class MenuController {
    leaderboard: Leaderboard
    startGameView: StartGameView
    gameOverView: GameOverView
    isGameOver: boolean
    constructor(baseContainer: Element) {
        this.leaderboard = new Leaderboard();
        this.startGameView = new StartGameView(baseContainer);
        this.gameOverView = new GameOverView(baseContainer);
        this.isGameOver = false;
    }

    step(dt: number) {
        if (this.isGameOver) {
            this.startGameView.hide();
            this.gameOverView.show();
            this.gameOverView.render(this.leaderboard);
        } else {
            this.gameOverView.hide();
            this.startGameView.show();
            this.startGameView.render({});
        }
    }

    hide() {
        this.startGameView.hide();
        this.gameOverView.hide();
    }
}

export default MenuController;
