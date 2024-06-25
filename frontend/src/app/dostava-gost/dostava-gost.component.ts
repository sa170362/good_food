import { Component, OnInit } from '@angular/core';
import { Porudzbina } from '../models/porudzbina';
import { DostavaService } from '../dostava.service';

@Component({
  selector: 'app-dostava-gost',
  templateUrl: './dostava-gost.component.html',
  styleUrls: ['./dostava-gost.component.css']
})
export class DostavaGostComponent implements OnInit {
  aktuelneDostave: Porudzbina[] = [];
  korisnik: string;

  constructor(private dostavaService: DostavaService) {
    // const storedUser = localStorage.getItem('selectedUser');
    // this.korisnik = storedUser ? JSON.parse(storedUser).korIme : null;
    const storedUser = "user67";
    this.korisnik = storedUser;
  }

  ngOnInit(): void {
    this.getAktuelneDostave();
  }

  getAktuelneDostave(): void {
    this.dostavaService.getAktuelneDostave(this.korisnik).subscribe(
      (dostave) => {
        this.aktuelneDostave = dostave;
      },
      (error) => console.error('Error fetching aktuelne dostave:', error)
    );
  }

}
