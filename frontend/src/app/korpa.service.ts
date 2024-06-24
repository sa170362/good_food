import { Injectable } from '@angular/core';
import { StavkaKorpe } from './models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class KorpaService {

private stavke: StavkaKorpe[] = [];

  dodajStavku(stavka: StavkaKorpe): void {
    this.stavke.push(stavka);
  }

  getStavke(): StavkaKorpe[] {
    return this.stavke;
  }

  obrisiStavku(index: number): void {
    this.stavke.splice(index, 1);
  }

  isprazniKorpu(): void {
    this.stavke = [];
  }
}
