import Bomb from "./bomb";
export default class Solver {
  bombs: Bomb[];

  currentBomb: Bomb | null;

  initialized = false;

  // Turn to true if you want to see what the speech-to-text is interpreting what you say as
  verbose = true;

  constructor() {
    this.bombs = [];
    this.currentBomb = null;
  }
}
