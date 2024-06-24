import { Component, OnInit } from '@angular/core';
import { StavkaKorpe } from '../models/cartItem';
import { KorpaService } from '../korpa.service';
import { PorudzbinaService } from '../porudzbina.service';
import { Porudzbina } from '../models/porudzbina';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit{

  stavke: StavkaKorpe[] = [];

  constructor(private korpaService: KorpaService, private orderService: PorudzbinaService) {}

  ngOnInit(): void {
    this.stavke = this.korpaService.getStavke();
  }

  obrisiStavku(index: number): void {
    this.korpaService.obrisiStavku(index);
  }

  zavrsiPorudzbinu(): void {
    const customer = prompt("Unesite vaše ime:", "") || ""; // Ako je null, dodeljuje se prazan string
    const adresaDostave = prompt("Unesite adresu dostave:", "") || ""; // Ako je null, dodeljuje se prazan string
    const kontaktTelefon = prompt("Unesite kontakt telefon:", "") || ""; // Ako je null, dodeljuje se prazan string
    const ukupnaCena = this.stavke.reduce((total, stavka) => total + stavka.jelo.cena * stavka.kolicina, 0);

    const porudzbina: Porudzbina = {
      customer: customer,
      stavke: this.stavke,
      ukupnaCena,
      status: 'pending',
      estimatedDeliveryTime: null,
      adresaDostave,
      kontaktTelefon,
      createdAt: new Date()
    };

    console.log(porudzbina);
    

    this.orderService.createOrder(porudzbina).subscribe(response => {
      console.log(porudzbina);
      
      alert("Porudžbina je uspešno kreirana!");
      this.korpaService.isprazniKorpu();
    });
  }

}
