import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';
import { Rezervacija } from '../models/rezervacija';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../restoran.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  neobradjeneRezervacije: Rezervacija[] = [];
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  konobar: Korisnik;
  restoran: Restoran = new Restoran();
  availableTables: { id: number, maxPeople: number }[] = [];
  selectedTable: string | undefined; // za selektovani sto
  redTables: Set<string> = new Set(); // Set za čuvanje ID-jeva crvenih stolova
  constructor(private reservationsService: ReservationsService, private restoranService: RestoranService) 
  {const storedUser = localStorage.getItem('selectedUser');
  this.konobar = storedUser ? JSON.parse(storedUser) : null; }

  async ngOnInit(): Promise<void> {
    this.ucitajNeobradjeneRezervacije();
    this.fetchRestoran();
    await new Promise(f => setTimeout(f, 100));
    this.setupCanvas();
    
  }

  setupCanvas(): void {
    if (this.restoran.layout) {
    
      this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
      this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
      console.log(this.restoran.layout)
      this.drawTables(this.restoran.layout);
    } else {
      console.error('Layout is not defined for the restaurant.');
    }
  }

  drawTables(layout: any): void {
    // Ensure canvas has enough space
    this.canvas.width = 800;
    this.canvas.height = 600;

    // Log the layout details
    console.log('Layout:', layout);

    // Draw the kitchen
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(layout.kitchen.x, layout.kitchen.y, layout.kitchen.width, layout.kitchen.height);
    this.ctx.strokeRect(layout.kitchen.x, layout.kitchen.y, layout.kitchen.width, layout.kitchen.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(layout.kitchen.id, layout.kitchen.x + layout.kitchen.width / 2, layout.kitchen.y + layout.kitchen.height / 2);

    // Draw the restroom
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(layout.restroom.x, layout.restroom.y, layout.restroom.width, layout.restroom.height);
    this.ctx.strokeRect(layout.restroom.x, layout.restroom.y, layout.restroom.width, layout.restroom.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(layout.restroom.id, layout.restroom.x + layout.restroom.width / 2, layout.restroom.y + layout.restroom.height / 2);

    // Draw the tables
    layout.tables.forEach((table: any, index: number) => {
      console.log(`Table ${index + 1}:`, table);
      this.ctx.beginPath();
      this.ctx.arc(table.x, table.y, table.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = 'white';
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.fillStyle = 'black';
      // Draw table id
      this.ctx.fillText(`Sto ${table.id.split('e')[1]}`, table.x, table.y - table.radius - 10);


      // Draw maxPeople in the center of the table
      this.ctx.fillText(table.maxPeople.toString(), table.x, table.y);
    });
  }

  
  getTableById(tableId: number): any {
    return this.restoran.layout.tables.find((table: any) => table.id === "table" + tableId);
  }

  ucitajNeobradjeneRezervacije(): void {
    if (!this.konobar?.restoran) {
      console.error('Restoran is not defined for the konobar.');
      return;
    }
    this.reservationsService.getNeobradjeneRezervacije(this.konobar.restoran).subscribe(
      data => {
        this.neobradjeneRezervacije = data;
        // this.markUnprocessedReservations();
      },
      error => {
        console.error('Failed to load unprocessed reservations:', error);
      }
    );
  }

  populateAvailableTables(): void {
    if (!this.restoran.layout) {
      console.error('Layout is not defined for the restaurant.');
      return;
    }
    // Filtriramo stolove koji nisu obojeni crveno
    this.availableTables = this.restoran.layout.tables.filter((table: any) => !this.redTables.has(table.id));
  }
  fetchRestoran(): void {
    if (!this.konobar?.restoran) {
      console.error('Restoran is not defined for the konobar.');
      return;
    }
    this.restoranService.fetchRestoran(this.konobar.restoran).subscribe(
      data => {
       this.restoran= data
       this.populateAvailableTables();
      },
      error => {
        console.error('Failed to load unprocessed reservations:', error);
      }
    );
    // alert(this.restoran.ime)
  }

  
   extractNumberFromTableId(tableId: string): number | undefined {
    const match = tableId.match(/^table(\d+)$/); // Regularni izraz koji traži "table" i zatim broj \d+
    if (match) {
      return parseInt(match[1], 10); // Parsiramo prvi zahvaćeni deo kao broj
    }
    return undefined; // Ako nema podudaranja, vraćamo undefined
  }

  // potvrdiRezervaciju(reservation: Rezervacija): void {
 
    
   
  //   if (table !== undefined) { // proveravamo da li je izabran sto
  //     this.reservationsService.potvrdiRezervaciju(reservation.imeGosta, table, this.konobar.korisnickoIme).subscribe(
  //       () => {
  //         reservation.brojStola = table;
  //         reservation.statusRezervacije = 'obradjena';
  //         // this.colorTableRed(this.selectedTable!);
  //         this.ucitajNeobradjeneRezervacije();
  //       },
  //       error => {
  //         console.error('Failed to confirm reservation:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Nije izabran sto za potvrdu rezervacije.');
  //   }
  // }
   
  potvrdiRezervaciju(reservation: Rezervacija): void {
    const tableId = this.selectedTable;
    alert(tableId)
    const tableNumber = this.extractNumberFromTableId(tableId!);
  
    if (tableNumber !== undefined) {
      // Pozivamo servis za potvrdu rezervacije
      this.reservationsService.potvrdiRezervaciju(reservation.imeGosta, tableNumber, this.konobar.korisnickoIme).subscribe(
        () => {
          reservation.brojStola = tableNumber;
          reservation.statusRezervacije = 'obradjena';
          
          // Bojimo sto u crveno na canvasu
          this.colorTableRed(tableNumber);
          
          // Ažuriramo listu neobrađenih rezervacija
          this.ucitajNeobradjeneRezervacije();
        },
        error => {
          console.error('Failed to confirm reservation:', error);
        }
      );
    } else {
      console.error('Nije izabran sto za potvrdu rezervacije.');
    }
  }
  
  colorTableRed(tableNumber: number): void {

    const table = this.getTableById(tableNumber);
    if (table) {
      if (!this.redTables.has(table.id)) {
        this.redTables.add(table.id);
      }
      this.ctx.beginPath();
      this.ctx.arc(table.x, table.y, table.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = 'red';
      this.ctx.fill();
      this.ctx.stroke();
    }

    this.populateAvailableTables();
  }

  odbijRezervaciju(reservation: Rezervacija): void {
    const reason = prompt('Unesite razlog odbijanja:');
    if (reason) {
      const brojStola = reservation.brojStola || 0; 
      this.reservationsService.odbijRezervaciju(reservation.imeGosta, brojStola, reason).subscribe(
        () => {
          reservation.statusRezervacije = 'obradjena'; 
          reservation.razlogOdbijanja = reason; 
          // this.colorTableRed(brojStola); 
          this.ucitajNeobradjeneRezervacije(); 

       

        },
        error => {
          console.error('Greška pri odbijanju rezervacije:', error);
        }
      );
    }
  }
  
  
}

