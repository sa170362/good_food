import { Component, OnInit } from '@angular/core';
import { Porudzbina } from '../models/porudzbina';
import { DostavaService } from '../dostava.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-dostava-gost',
  templateUrl: './dostava-gost.component.html',
  styleUrls: ['./dostava-gost.component.css']
})
export class DostavaGostComponent implements OnInit {
  aktuelneDostave: Porudzbina[] = [];
  arhiva: Porudzbina[] = [];
  presek:Porudzbina[] = [];
  korisnik: Korisnik;
  currentYear: number = new Date().getFullYear();
  constructor(private dostavaService: DostavaService) {
    const storedUser = localStorage.getItem('selectedUser');
    this.korisnik = storedUser ? JSON.parse(storedUser) : null;

  }

  ngOnInit(): void {
    this.getAktuelneDostave();
    this.getArhiva();
  }

  getAktuelneDostave(): void {
    this.dostavaService.getAktuelneDostave(this.korisnik.korisnickoIme).subscribe(
      (dostave) => {
        const now = new Date();
        this.aktuelneDostave = dostave.filter(dostava => {
          if (dostava.status === 'pending') {
            return true;
          } else if (dostava.status === 'confirmed' && dostava.estimatedDeliveryTime) {
            const estimatedMinutes = this.extractEstimatedTime(dostava.estimatedDeliveryTime);
            const createdAt = new Date(dostava.createdAt);
            const deliveryTime = new Date(createdAt.getTime() + estimatedMinutes * 60000);
            return deliveryTime > now;
          }
          return false;
        });
      },
      (error) => console.error('Error fetching aktuelne dostave:', error)
    );
  }

  extractEstimatedTime(estimatedDeliveryTime: string): number {
    const parts = estimatedDeliveryTime.split('-');
    if (parts.length === 2) {
      const minutesPart = parts[1].split(' ')[0];
      return parseInt(minutesPart, 10);
    }
    return 0; 
  }
  sortPorudzbineByCreatedAt(porudzbine: Porudzbina[]): Porudzbina[] {
    return porudzbine.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime(); 
    });
  }
getArhiva():void{
  this.dostavaService.getDostave(this.korisnik.korisnickoIme).subscribe(
    (dostave) => {
      const now = new Date();
      this.arhiva = dostave;
       
    },
    (error) => console.error('Error fetching dostave:', error)
  );
  const presek = this.arhiva.filter(porudzbina => 
    !this.aktuelneDostave.some(drugaPorudzbina => drugaPorudzbina.createdAt === porudzbina.createdAt)
  );

  this.sortPorudzbineByCreatedAt(this.presek)
}


}
