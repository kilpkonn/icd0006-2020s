import GameController from "./controller/game-controller";

const baseContainer  = document.querySelector('#body')!;

let gameController = new GameController(baseContainer);

setInterval(() => {
    gameController.step(10);
}, 10);
