import Bomb from "./bomb";
export default class Solver {
  bombs: Bomb[];

  currentBomb: Bomb | null;

  constructor() {
    this.bombs = [];
    this.currentBomb = null;
  }

  interpret(transcript: string | Uint8Array) {
    console.log(transcript);
  }
}
