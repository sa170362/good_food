import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Rezervacija } from '../models/rezervacija';
import { ReservationsService } from '../reservations.service';
import { Chart , registerables} from 'chart.js';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})
export class StatistikaComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  rezervacije: Rezervacija[] = [];
  rezervacije1: Rezervacija[] = [];
  konobarTrenutni:Korisnik
  chart:any;
  chart1:any;
  histogramChart:any;
  konobarUsernames: string[] = [];
  konobari:Korisnik[]=[]

  constructor(private rezervacijaService: ReservationsService, private usersService:UsersService) {const storedUser = localStorage.getItem('selectedUser');
  this.konobarTrenutni = storedUser ? JSON.parse(storedUser) : null;
  Chart.register(...registerables); }
  ngOnInit(): void {
    this.getRezervacije();
    this.getKonobari()
    this.getRezervacije1();
    this.getRezervacije2();
  }
  getRezervacije(): void {
    this.rezervacijaService.getAllReservations().subscribe(
      (rezervacije) => {
        this.rezervacije = rezervacije.filter(rez => rez.konobar === this.konobarTrenutni.korisnickoIme);
        this.generateChartData();
      },
      (error) => console.error('Error fetching rezervacije:', error)
    );
  }
  getRezervacije2(): void {
    this.rezervacijaService.getRezervacijeR(this.konobarTrenutni.restoran!).subscribe(
      (rezervacije) => {
        this.rezervacije1 = rezervacije;
        this.generateHistogramChart();
      },
      (error) => console.error('Error fetching rezervacije:', error)
    );
  }
  
  getKonobari(): void {
    this.usersService.getUsersByType('konobar').subscribe(
      (konobari) => {
        this.konobari = konobari;
        console.log('Konobari:', this.konobari);
      },
      (error) => {
        console.error('Error fetching konobari:', error);
      }
    );
    const konobariWithMatchingRestoran: string[] = [];

  for (let i = 0; i < this.konobari.length; i++) {
    const konobar = this.konobari[i];
    if (konobar.restoran === this.konobarTrenutni.restoran) {
      konobariWithMatchingRestoran.push(konobar.korisnickoIme);
    }
   
}
      this.konobarUsernames=konobariWithMatchingRestoran;
      this.konobarUsernames.push(this.konobarTrenutni.korisnickoIme)
     
    
  }

  getRezervacije1(): void {
    this.rezervacijaService.getAllReservations().subscribe(
      (rezervacije) => {
        this.rezervacije = rezervacije.filter(rez => this.konobari.some(konobar => konobar.korisnickoIme === rez.konobar));
        this.generateChartData1();
      },
      (error) => console.error('Error fetching rezervacije:', error)
    );
  }
  generateHistogramChart(): void {
    const twentyFourMonthsAgo = new Date();
    twentyFourMonthsAgo.setMonth(twentyFourMonthsAgo.getMonth() - 24);
  
    const filteredRezervacije = this.rezervacije1.filter(rez => {
      if (rez.datumVremeRezervacije) {
        const rezDate = new Date(rez.datumVremeRezervacije);
        return rezDate >= twentyFourMonthsAgo;
      }
      return false;
    });
  
    const dayCounts = filteredRezervacije.reduce((acc: { [key: string]: number }, rez) => {
      if (rez.datumVremeRezervacije) {
        const dayOfWeek = new Date(rez.datumVremeRezervacije).toLocaleDateString('en-US', { weekday: 'short' });
        if (!acc[dayOfWeek]) {
          acc[dayOfWeek] = 0;
        }
        acc[dayOfWeek] += 1;
      }
      return acc;
    }, {});
  
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const values = labels.map(label => dayCounts[label] || 0);
  
    this.renderHistogramChart(labels, values);
  }
  
  renderHistogramChart(labels: string[], values: number[]): void {
    const ctx = document.getElementById('histogramChart') as HTMLCanvasElement;
    if (this.histogramChart) {
      this.histogramChart.destroy();
    }
    this.histogramChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Broj Rezervacija',
          data: values,
          backgroundColor: '#ff7e5f',
          borderColor: '#feb47b',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            type: 'linear'
          }
        }
      }
    });
  }
  generateChartData(): void {
    const data = this.rezervacije.reduce((acc: { [key: string]: number }, rez) => {
      if (rez.datumVremeRezervacije && rez.brojGostiju !== undefined) {
        const date = new Date(rez.datumVremeRezervacije).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += rez.brojGostiju;
      }
      return acc;
    }, {});

    const labels = Object.keys(data);
    const values = Object.values(data);

    this.renderChart(labels, values);
  }
  generateChartData1(): void {
    const data = this.rezervacije.reduce((acc: { [key: string]: number }, rez) => {
      const konobar = rez.konobar;
      if (rez.brojGostiju !== undefined) {
        if (!acc[konobar!]) {
          acc[konobar!] = 0;
        }
        acc[konobar!] += rez.brojGostiju;
      }
      return acc;
    }, {});

    const labels = Object.keys(data);
    const values = Object.values(data);

    this.renderPieChart(labels, values);
  }

  renderPieChart(labels: string[], values: number[]): void {
    const ctx = document.getElementById('myChart1') as HTMLCanvasElement;
    if (this.chart1) {
      this.chart1.destroy();
    }
    this.chart1 = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Guest Distribution',
          data: values,
          backgroundColor: ['#ff7e5f', '#feb47b', '#ffcc67', '#b3a2c7', '#6a89cc'],
          borderColor: '#fff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem: any) {
                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2);
              }
            }
          }
        }
      }
    });
  }

  renderChart(labels: string[], values: number[]): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Broj Gostiju',
          data: values,
          backgroundColor: '#ff7e5f',
          borderColor: '#feb47b',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            type: 'linear' 
          }
        }
      }
    });
  }
}
