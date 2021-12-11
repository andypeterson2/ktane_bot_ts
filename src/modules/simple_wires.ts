import Bomb from "../bomb";
import Module from "./module";
/*
 * Module description pulled from the manual: https://www.bombmanual.com/print/KeepTalkingAndNobodyExplodes-BombDefusalManual-v1.pdf
 * A wire module can have 3-6 wires on it. Only the one correct wire needs to be cut to disarm
 * the module. Wire ordering begins with the first on the top. Potential wire colors are red, white,
 * blue, yellow, and black.
 *
 * Defusal:
 * 3 wires:
 *    If there are no red wires, cut the second wire.
 *    Otherwise, if the last wire is white, cut the last wire.
 *    Otherwise, if there is more than one blue wire, cut the last blue wire.
 *    Otherwise, cut the last wire.
 * 4 wires:
 *    If there is more than one red wire and the last digit of the serial number is odd, cut the
 *      last red wire.
 *    Otherwise, if the last wire is yellow and there are no red wires, cut the first wire.
 *    Otherwise, if there is exactly one blue wire, cut the first wire.
 *    Otherwise, if there is more than one yellow wire, cut the last wire.
 *    Otherwise, cut the second wire.
 * 5 wires:
 *    If the last wire is black and the last digit of the serial number is odd, cut the fourth wire.
 *    Otherwise, if there is exactly one red wire and there is more than one yellow wire, cut the
 *      first wire.
 *    Otherwise, if there are no black wires, cut the second wire.
 *    Otherwise, cut the first wire.
 * 6 wires:
 *    If there are no yellow wires and the last digit of the serial number is odd, cut the third wire.
 *    Otherwise, if there is exactly one yellow wire and there is more than one white wire, cut the
 *      fourth wire.
 *    Otherwise, if there are no red wires, cut the last wire.
 *    Otherwise, cut the fourth wire.
 */
export default class SimpleWires extends Module {
  /* Member Variables */
  // The wires on the module
  wires: string[] = [];

  /* Constructor */
  constructor(wires: string[], bomb: Bomb) {
    super(bomb);
    wires.forEach((wire) => {
      this.validateWire(wire);
      this.addWire(wire);
    });
  }

  /* Functions */
  addWire(wire: string) {
    this.validateWire(wire);
    this.wires.push(wire);
  }

  clearWires() {
    this.wires = [];
  }

  removeLastWire() {
    this.wires.pop();
  }

  validateWire(wire: string) {
    if (
      wire !== "red" &&
      wire !== "white" &&
      wire !== "blue" &&
      wire !== "yellow" &&
      wire !== "black"
    ) {
      throw new Error(`Invalid wire color: ${wire}`);
    }
  }

  solve() {
    switch (this.wires.length) {
      case 3:
        return this.solve3Wires();
      case 4:
        return this.solve4Wires();
      case 5:
        return this.solve5Wires();
      case 6:
        return this.solve6Wires();
      default:
        throw new Error(`Invalid number of wires: ${this.wires.length}`);
    }
  }

  solve3Wires() {
    if (this.wires.indexOf("red") === -1) {
      return "cut the second wire";
    } else if (this.wires[this.wires.length - 1] === "white") {
      return "cut the last wire";
    } else if (this.wires.filter((wire) => wire === "blue").length > 1) {
      return "cut the last blue wire";
    } else {
      return "cut the last wire";
    }
  }

  solve4Wires() {
    if (
      this.wires.filter((wire) => wire === "red").length > 1 &&
      this.bomb.serielOdd
    ) {
      return "cut the last red wire";
    } else if (
      this.wires[this.wires.length - 1] === "yellow" &&
      this.wires.indexOf("red") === -1
    ) {
      return "cut the first wire";
    } else if (this.wires.filter((wire) => wire === "blue").length === 1) {
      return "cut the first wire";
    } else if (this.wires.filter((wire) => wire === "yellow").length > 1) {
      return "cut the last wire";
    } else {
      return "cut the second wire";
    }
  }

  solve5Wires() {
    if (this.wires[this.wires.length - 1] === "black" && this.bomb.serielOdd) {
      return "cut the fourth wire";
    } else if (
      this.wires.filter((wire) => wire === "red").length === 1 &&
      this.wires.filter((wire) => wire === "yellow").length > 1
    ) {
      return "cut the first wire";
    } else if (this.wires.indexOf("yellow") === -1) {
      return "cut the second wire";
    } else {
      return "cut the first wire";
    }
  }

  solve6Wires() {
    if (this.wires.indexOf("yellow") === -1 && this.bomb.serielOdd) {
      return "cut the third wire";
    } else if (
      this.wires.filter((wire) => wire === "yellow").length === 1 &&
      this.wires.filter((wire) => wire === "white").length > 1
    ) {
      return "cut the fourth wire";
    } else if (this.wires.indexOf("red") === -1) {
      return "cut the last wire";
    } else {
      return "cut the fourth wire";
    }
  }
}
