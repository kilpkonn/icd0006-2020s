import Wall from '../model/wall';
import WallView from '../view/wall-view';

class WallController {
    constructor(baseContainer) {
        this.pos = new Wall(1, 0.1 + Math.random() * 0.5, 0.2 + Math.random() * 0.2, 0.05 + Math.random() * 0.05);
        this.view = new WallView(baseContainer);
        this.speed = 0.07;
    }

    step(dt) {
        this.pos.x -= dt * this.speed / 1000;
        this.view.render(this.pos);
    }
}

export default WallController;
