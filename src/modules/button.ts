import Bomb from "../bomb";
import Module from "./module";
/*
 * Module description pulled from the manual: https://www.bombmanual.com/print/KeepTalkingAndNobodyExplodes-BombDefusalManual-v1.pdf
 *
 * Perform the first action that applies:
 *    1. If the button is blue and the button says "Abort", hold the button and refer to
 *      "Releasing a Held Button".
 *    2. If there is more than 1 battery on the bomb and the button says "Detonate", press and
 *      immediately release the button.
 *    3. If the button is white and there is a lit indicator with label CAR, hold the button and
 *      refer to "Releasing a Held Button".
 *    4. If there are more than 2 batteries on the bomb and there is a lit indicator with label
 *      FRK, press and immediately release the button.
 *    5. If the button is yellow, hold the button and refer to "Releasing a Held Button".
 *    6. If the button is red and the button says "Hold", press and immediately release the button.
 *    7. If none of the above apply, hold the button and refer to "Releasing a Held Button".
 *
 * If you start holding the button down, a colored strip will light up on the right side of the
 * module. Based on its color, you must release the button at a specific point in time:
 *    Blue strip: release when the countdown timer has a 4 in any position.
 *    White strip: release when the countdown timer has a 1 in any position.
 *    Yellow strip: release when the countdown timer has a 5 in any position.
 * Any other color strip: release when the countdown timer has a 1 in any position
 */
export default class Button extends Module {
  /* Member Variables */
  buttonColor: string;

  buttonText: string;

  stripColor: string;

  constructor(bomb: Bomb) {
    super(bomb);
    this.buttonColor = "";
    this.buttonText = "";
    this.stripColor = "";
  }

  /* Methods */
  setButtonColor(color: string) {
    this.buttonColor = color;
  }

  setButtonText(text: string) {
    this.buttonText = text;
  }

  setStripColor(color: string) {
    this.stripColor = color;
  }

  determineButtonAction() {
    if (this.buttonColor === "blue" && this.buttonText === "Abort") {
      return "hold";
    } else if (this.bomb.batteries > 1 && this.buttonText === "Detonate") {
      return "press";
    } else if (this.stripColor === "white" && this.bomb.litCARIndicator) {
      return "hold";
    } else if (this.bomb.batteries > 2 && this.bomb.litFRKIndicator) {
      return "press";
    } else if (this.buttonColor === "yellow") {
      return "hold";
    } else if (this.buttonColor === "red" && this.buttonText === "Hold") {
      return "press";
    } else {
      return "hold";
    }
  }

  determineButtonRelease() {
    if (this.stripColor === "blue") {
      return "4";
    } else if (this.stripColor === "white") {
      return "1";
    } else if (this.stripColor === "yellow") {
      return "5";
    } else {
      return "1";
    }
  }
}
