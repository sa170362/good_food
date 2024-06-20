import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';
import { Rezervacija } from '../models/rezervacija';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  neobradjeneRezervacije: Rezervacija[] = [];
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  constructor(private reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.ucitajNeobradjeneRezervacije();
    this.setupCanvas();
  }

  setupCanvas(): void {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.drawTables();
  }

  drawTables(): void {
    const tables = [
      { id: 1, x: 50, y: 50 },
      { id: 2, x: 150, y: 50 },
      { id: 3, x: 250, y: 50 },
      { id: 4, x: 350, y: 50 },
      { id: 5, x: 450, y: 50 }
    ];

    tables.forEach(table => {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(table.x, table.y, 50, 50);
      this.ctx.strokeRect(table.x, table.y, 50, 50);
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(table.id.toString(), table.x + 20, table.y + 30);
    });
  }

  colorTable(tableId: number, color: string): void {
    const table = this.getTableById(tableId);
    if (table) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(table.x, table.y, 50, 50);
      this.ctx.strokeRect(table.x, table.y, 50, 50);
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(table.id.toString(), table.x + 20, table.y + 30);
    }
  }

  getTableById(tableId: number): any {
    const tables = [
      { id: 1, x: 50, y: 50 },
      { id: 2, x: 150, y: 50 },
      { id: 3, x: 250, y: 50 },
      { id: 4, x: 350, y: 50 },
      { id: 5, x: 450, y: 50 }
    ];
    return tables.find(table => table.id === tableId);
  }

  ucitajNeobradjeneRezervacije(): void {
    this.reservationsService.getNeobradjeneRezervacije().subscribe(
      data => {
        this.neobradjeneRezervacije = data;
        this.markUnprocessedReservations();
      },
      error => {
        console.error('Failed to load unprocessed reservations:', error);
      }
    );
  }

  markUnprocessedReservations(): void {
    this.neobradjeneRezervacije.forEach(reservation => {
      if (reservation.statusRezervacije === 'neobradjena' && reservation.brojStola) {
        this.colorTable(reservation.brojStola, 'yellow');
      } else if (reservation.statusRezervacije === 'obradjena' && reservation.brojStola) {
        this.colorTable(reservation.brojStola, 'red');
      } else if (reservation.statusRezervacije === 'obradjena' && reservation.razlogOdbijanja && reservation.brojStola) {
        this.colorTable(reservation.brojStola, 'white');
      }
    });
  }

  potvrdiRezervaciju(reservation: Rezervacija): void {
    if (reservation.brojStola) {
      this.reservationsService.potvrdiRezervaciju(reservation.imeGosta, reservation.brojStola).subscribe(
        () => {
          reservation.statusRezervacije = 'obradjena';
          this.colorTable(reservation.brojStola!, 'red');
          this.ucitajNeobradjeneRezervacije();
        },
        error => {
          console.error('Failed to confirm reservation:', error);
        }
      );
    } else {
      const selectedTable = prompt("Unesite broj stola:");
      if (selectedTable && !isNaN(Number(selectedTable))) {
        this.reservationsService.potvrdiRezervaciju(reservation.imeGosta, Number(selectedTable)).subscribe(
          () => {
            reservation.brojStola = Number(selectedTable); 
            reservation.statusRezervacije = 'obradjena'; 
            this.colorTable(Number(selectedTable), 'red');
            this.ucitajNeobradjeneRezervacije();
          },
          error => {
            console.error('Failed to confirm reservation:', error);
          }
        );
      }
    }
  }

  odbijRezervaciju(reservation: Rezervacija): void {
    const reason = prompt('Unesite razlog odbijanja:');
    if (reason) {
      const brojStola = reservation.brojStola || 0; 
      this.reservationsService.odbijRezervaciju(reservation.imeGosta, brojStola, reason).subscribe(
        () => {
          reservation.statusRezervacije = 'obradjena'; 
          reservation.razlogOdbijanja = reason; 
          this.colorTable(brojStola, 'white'); 
          this.ucitajNeobradjeneRezervacije(); 

          console.log(brojStola);
          console.log(reservation.statusRezervacije);
          console.log(reservation.razlogOdbijanja);

        },
        error => {
          console.error('Greška pri odbijanju rezervacije:', error);
        }
      );
    }
  }
  
  
}

