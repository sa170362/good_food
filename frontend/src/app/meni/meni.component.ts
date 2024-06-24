import { Component, OnInit } from '@angular/core';
import { Jelo } from '../models/jelo';
import { JeloService } from '../jelo.service';
import { KorpaService } from '../korpa.service';
import { StavkaKorpe } from '../models/cartItem';
import { MeniService } from '../meni.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnInit{
  jela: Jelo[] = [];
  jelovnik: any[] = [];

  constructor(private mealService: JeloService, private korpaService: KorpaService,
    private meniService: MeniService, private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    this.mealService.getJela().subscribe((data: Jelo[]) => {
      this.jela = data;
    });
  }

  loadMenu(): void {
    this.meniService.getMenu()
      .subscribe(
        data => {
          this.jelovnik = data;
        },
        error => {
          console.error('Error loading menu:', error);
        }
      );
  }

  dodajUKorpu(jelo: Jelo): void {
    const kolicina = prompt("Unesite količinu:", "1");
    if (kolicina) {
      const stavka: StavkaKorpe = {
        jelo: jelo,
        kolicina: parseInt(kolicina, 10)
      };
      this.korpaService.dodajStavku(stavka);
      alert("Dodato u korpu!");
    }
  }

   prikaziKorpu(): void {
    this.router.navigate(['/korpa']); // Preusmeri na /korpa
  }

}
