import Player from './player';
import WallController from "../controller/wall-controller";

class GameWorld {
    static wallAddCooldown = 2100;
    static wallAddChance = 0.9;
    static gravity = 0.013;
    player: Player = new Player();
    walls: WallController[] = [];
    currentWallAddCooldown: number = 0;
}

export default GameWorld;
