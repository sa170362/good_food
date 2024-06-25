export class Jelo {
    _id: string = '';
    naziv: string = '';
    slika?: string = '';
    cena: number = 0;
    sastojci: string[] = [];

    constructor(naziv: string, cena: number, sastojci: string[], slika?: string) {
      this.naziv = naziv;
      this.cena = cena;
      this.sastojci = sastojci;
      this.slika = slika;
    }
  }