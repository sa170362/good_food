

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KorpaService } from "../korpa.service";
import { StavkaKorpe } from "../models/cartItem";
import { Korisnik } from "../models/korisnik";
import { Porudzbina } from "../models/porudzbina";
import { Restoran } from "../models/restoran";
import { PorudzbinaService } from "../porudzbina.service";

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit {

cart: { restoran: string, stavka: StavkaKorpe, korisnickoIme: string }[] = [];
restoran:string=''
gost:Korisnik
showOrderDetails = false;
zatvoriDugme = false;
ime:string=''
prezime:string=''
adresa:string=''
telefon:string=''
currentYear: number = new Date().getFullYear();
  constructor(private korpaService: KorpaService, private orderService: PorudzbinaService, private router: Router) {
    const storedUser = localStorage.getItem('selectedUser');
    this.gost = storedUser ? JSON.parse(storedUser) : null;
  }



ngOnInit(): void {
  this.loadCartFromLocalStorage();
}
loadCart(): void {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    this.cart = JSON.parse(storedCart);
  }
}
ukloniIzKorpe(item: any): void {
  const index = this.cart.findIndex(i => i === item);
  if (index !== -1) {
    this.cart.splice(index, 1);
    this.saveCartToLocalStorage();
  }

}
prikaziDetaljeZaDostavu(): void {
  this.showOrderDetails = true;
}
  obrisiStavku(index: number): void {
    this.korpaService.obrisiStavku(index);
  }
  private loadCartFromLocalStorage(): void {
    const restoran = localStorage.getItem('restoran');
    const cartStr = localStorage.getItem('cart');
    if (cartStr && restoran) {
      this.cart = JSON.parse(cartStr);
      this.restoran = JSON.parse(restoran);
    }
  }

  validatePhone(phone: string): boolean {
    const pattern = /^06[0-9]{7}$/;
    return pattern.test(phone);
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  validacijaForme(): boolean {
    return (
      this.ime.trim() !== '' &&
      this.prezime.trim() !== '' &&
      this.adresa.trim() !== '' &&
      this.validatePhone(this.telefon) &&
      this.cart.length > 0
    );
  }
  
  naruci(): void {
    if (this.validacijaForme()) {
      let ukupnaCena = 0;
      for (const stavka of this.cart) {
        ukupnaCena += stavka.stavka.jelo.cena * stavka.stavka.kolicina;
      }
  
    
      const porudzbina: Porudzbina = {
        customerKorIme: this.gost.korisnickoIme,
        stavke: this.cart.map(item => item.stavka), // Mapiramo samo stavke
        ukupnaCena,
        status: 'pending',
        estimatedDeliveryTime: null,
        adresaDostave: this.adresa,
        kontaktTelefon: this.telefon,
        createdAt: new Date(),
        restoran: this.restoran
      };
  
     
      this.orderService.createOrder(porudzbina).subscribe(response => {
        console.log(porudzbina);
        alert("Porudžbina je uspešno kreirana!");
        localStorage.removeItem('cart');
        this.cart = [];
        this.showOrderDetails = false; 
        this.zatvoriDugme = true;
      });
    } else {
      console.log('Molimo Vas da popunite sva polja.');
    }
  }

  incrementQuantity(item: any): void {
    item.stavka.kolicina++;
    this.saveCartToLocalStorage();
  }

  decrementQuantity(item: any): void {
    if (item.stavka.kolicina > 1) {
      item.stavka.kolicina--;
      this.saveCartToLocalStorage();
    }
  }


}
