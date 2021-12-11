/* Labelled indicator lights found on the sides of the bomb casing. Each has three letters and a
 * light which will either be lit or unlit.
 *
 * Common indicators include:
 *  SND, CLR, CAR, IND, FRQ, SIG, NSA, MSA, TRN, BOB, and FRK
 */

export default class Indicator {
  label: string;

  lit: boolean;

  constructor(label: string, lit: boolean) {
    this.label = label;
    this.lit = lit;
  }
}
