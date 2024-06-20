import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestoranService } from '../restoran.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-restoran-layout',
  templateUrl: './restoran-layout.component.html',
  styleUrls: ['./restoran-layout.component.css']
})
export class RestoranLayoutComponent implements OnInit{
  restoranIme: string = '';
  @ViewChild('layoutCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  layout: {
    tables: { x: number, y: number, radius: number, maxPeople: number }[],
    kitchen: { x: number, y: number, width: number, height: number },
    restroom: { x: number, y: number, width: number, height: number }
  } = {
    tables: [],
    kitchen: { x: 100, y: 100, width: 100, height: 100 },
    restroom: { x: 300, y: 100, width: 100, height: 100 }
  };
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestoranService,
    private router: Router
  ) {}
  ngOnInit() {
    this.restoranIme = this.route.snapshot.paramMap.get('ime') as string;
    // alert(this.restoranIme)
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.drawLayout();
  }

  drawLayout() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.layout.tables.forEach(table => {
      this.ctx.beginPath();
      this.ctx.arc(table.x, table.y, table.radius, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.closePath();
      
      // Draw the number of people for each table
      this.ctx.font = "12px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(`${table.maxPeople}`, table.x, table.y);
    });
    this.drawRectangle(this.layout.kitchen, 'Kitchen');
    this.drawRectangle(this.layout.restroom, 'Restroom');
  }

  drawRectangle(rect: { x: number, y: number, width: number, height: number }, label: string) {
    this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(label, rect.x + rect.width / 2, rect.y + rect.height / 2);
  }

  // loadFromJson() {
  //   const layoutJson = `{
  //     "tables": [
  //       { "x": 150, "y": 150, "radius": 30, "maxPeople": 4 },
  //       { "x": 250, "y": 150, "radius": 30, "maxPeople": 4 },
  //       { "x": 350, "y": 150, "radius": 30, "maxPeople": 4 }
  //     ],
  //     "kitchen": { "x": 100, "y": 300, "width": 100, "height": 100 },
  //     "restroom": { "x": 300, "y": 300, "width": 100, "height": 100 }
  //   }`;
  //   this.layout = JSON.parse(layoutJson);
  //   this.drawLayout();
  // }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        this.layout = JSON.parse(e.target.result as string);
        this.drawLayout();
      }
    };
    reader.readAsText(file);
  }
  saveLayoutToDatabase() {
    this.restaurantService.saveLayoutForRestoran(this.restoranIme, this.layout).subscribe(
      () => {
        console.log('Layout successfully saved.');
        // Dodajte logiku za obaveštenje korisnika o uspešnom čuvanju
      }
    );
  }

}
