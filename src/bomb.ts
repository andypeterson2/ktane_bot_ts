export default class Bomb {
  strikes: number;

  batteryCount: number;

  parallelPresent: boolean;

  carIndicator: boolean;

  frkIndicator: boolean;

  vowel: boolean;

  serielOdd: boolean;

  constructor(
    batteryCount: number,
    parallelPresent: boolean,
    carIndicator: boolean,
    frkIndicator: boolean,
    vowel: boolean,
    serielOdd: boolean
  ) {
    this.strikes = 0;
    this.batteryCount = batteryCount;
    this.parallelPresent = parallelPresent;
    this.carIndicator = carIndicator;
    this.frkIndicator = frkIndicator;
    this.vowel = vowel;
    this.serielOdd = serielOdd;
  }

  setStrikes(strikes: number) {
    this.strikes = strikes;
  }
}
