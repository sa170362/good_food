import { Jelo } from './jelo';

export class StavkaKorpe {
  jelo: Jelo;
  kolicina: number = 1;

  constructor(jelo: Jelo, kolicina: number) {
    this.jelo = jelo;
    this.kolicina = kolicina;
  }
}