import Indicator from "./information_modules/indicator";
/*
 * This file contains the bomb class. The bomb is made up of at most 12 modules, each of which
 * is detailed in their own file. A bomb has various other properties, such as having (but not
 * necessarily guaranteed to have)
 *    - one or more of the following ports: DVI-D, Parallel, PS/2, RJ-45, Serial, and Stereo RCA
 *    - batteries
 *    - a three letter indicator (which may or may not be lit)
 *    - and a six-digit serial number (of which is guarenteed to be present)
 * The bomb has at most three strikes, and the number of strikes is initialized before the bomb
 * defusal process begins by the user. Also initialized before the defusal process begins is the
 * amount of time the user has to defuse the bomb (both of which are given in-game before the bomb
 * is begun).
 * Trivially, if time runs out, the bomb has exploded. If the user has no strikes left, the bomb
 * has exploded. If the user defuses the bomb, the bomb has defused.
 *
 * Descriptions of components are pulled from the manual: https://www.bombmanual.com/print/KeepTalkingAndNobodyExplodes-BombDefusalManual-v1.pdf
 */
export default class Bomb {
  /* Member Variables */
  // Bomb number (only useful if defusing multiple bombs)
  bombNumber: number;

  // The number of strikes the user has left, at most three.
  strikes: number;

  // The amount of time the user has to defuse the bomb, in seconds.
  time: number;

  // Amount of batteries found within enclosures on the sides of the bomb casing.
  batteries = 0;

  // The serial number of the bomb
  serialNumber = "";

  // A quick way to check if the serial number has a vowel in it (useful in vanilla modules)
  vowel = false;

  // A quick way to check if the last didit in the serial number is odd (useful in vanilla modules)
  serielOdd = false;

  // List of labelled indicator lights found on the sides of the bomb casing.
  indicators: Indicator[] = [];

  // A quick way to check if either the CAR or FRK indicator is lit (useful in vanilla modules)
  litCARIndicator = false;

  litFRKIndicator = false;

  /* Present ports on the bomb, stored in an array of boolean values corresponding to the following:
   * - DVI-D, Parallel, PS/2, RJ-45, Serial, and Stereo RCA */
  ports = [false, false, false, false, false, false];

  // Indicates whether the bomb's defusal process has begun.
  defusing = false;

  // Indicates whether the bomb has exploded.
  exploded = false;

  /* Constructor */
  constructor(time: number, strikes: number, bombNumber: number) {
    this.time = time;
    this.strikes = strikes;
    this.bombNumber = bombNumber;
  }

  /* Member Functions */
  // Sets the defusing flag to true.
  startDefusing() {
    this.defusing = true;
  }

  // Sets the serial number of the bomb.
  setSerialNumber(serialNumber: string) {
    this.serialNumber = serialNumber;
    this.vowel =
      serialNumber.includes("A") ||
      serialNumber.includes("E") ||
      serialNumber.includes("I") ||
      serialNumber.includes("O") ||
      serialNumber.includes("U");
    this.serielOdd =
      parseInt(serialNumber.charAt(serialNumber.length - 1)) % 2 === 1;
  }

  // Quickly set the vowel indicator if only dealing with vanilla modules.
  setVowel(vowel: boolean) {
    this.vowel = vowel;
  }

  // Quickly set the odd indicator indicator if only dealing with vanilla modules.
  setSerielOdd(serielOdd: boolean) {
    this.serielOdd = serielOdd;
  }

  // Adds an indicator to the bomb.
  addIndicator(label: string, lit: boolean) {
    this.indicators.push(new Indicator(label.toUpperCase(), lit));
    this.litCARIndicator =
      this.litCARIndicator || (label.toUpperCase() === "CAR" && lit);
    this.litFRKIndicator =
      this.litFRKIndicator || (label.toUpperCase() === "FRK" && lit);
  }

  // Quickly set the CAR indicator indicator if only dealing with vanilla modules.
  setCarIndicator(carIndicator: boolean) {
    this.litCARIndicator = carIndicator;
  }

  // Quickly set the FRK indicator indicator if only dealing with vanilla modules.
  setFrkIndicator(frkIndicator: boolean) {
    this.litFRKIndicator = frkIndicator;
  }

  // Adds a port to the bomb.
  addPort(port: string) {
    switch (port) {
      case "DVI-D":
        this.ports[0] = true;
        break;
      case "Parallel":
        this.ports[1] = true;
        break;
      case "PS/2":
        this.ports[2] = true;
        break;
      case "RJ-45":
        this.ports[3] = true;
        break;
      case "Serial":
        this.ports[4] = true;
        break;
      case "Stereo RCA":
        this.ports[5] = true;
        break;
    }
  }

  // Sets the number of batteries found on the bomb.
  setBatteryCount(batteryCount: number) {
    this.batteries = batteryCount;
  }

  // Adds a strike to the bomb. If the bomb has no strikes left, the bomb has exploded.
  addStrike() {
    this.strikes--;
    if (this.strikes < 0) {
      this.exploded = true;
    }
  }
}
