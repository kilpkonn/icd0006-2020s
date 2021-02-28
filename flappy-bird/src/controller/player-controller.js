import PlayerView from '../view/player-view';

class PlayerController {
    constructor(player, baseContainer) {
        this.player = player;
        this.view = new PlayerView(baseContainer);
    }

    step(dt) {
        this.player.dt += dt;
        this.view.render(this.player);
    }
}

export default PlayerController;
