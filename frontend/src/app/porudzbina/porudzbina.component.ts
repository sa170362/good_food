import { Component, OnInit } from '@angular/core';
import { Porudzbina } from '../models/porudzbina';
import { PorudzbinaService } from '../porudzbina.service';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit {
  orders: Porudzbina[] = [];
  currentYear: number = new Date().getFullYear();
  constructor(private porudzbinaService: PorudzbinaService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.porudzbinaService.getOrders().subscribe(
      (orders) => {
        this.orders = orders;
        console.log('Orders:', this.orders);
      },
      (error) => console.error('Error fetching orders:', error)
    );
  }

  confirmOrder(order: Porudzbina, selectedDeliveryTime: string): void {
    this.porudzbinaService.confirmOrder(order.customer, selectedDeliveryTime).subscribe(
      () => {
        this.getOrders();
      },
      (error) => console.error(error)
    );
  }

  rejectOrder(order: Porudzbina): void {
    this.porudzbinaService.rejectOrder(order.customer).subscribe(
      () => {
        this.orders = this.orders.filter(o => o !== order);
      },
      (error) => console.error(error)
    );
  }
  promptDeliveryTime(): '20-30 minutes' | '30-40 minutes' | '50-60 minutes' | null {
    const deliveryTimes = ['20-30 minutes', '30-40 minutes', '50-60 minutes'];
    const selectedTime = window.prompt('Odaberite procenjeno vreme dostave:\n\n' + deliveryTimes.join('\n'));
  
    if (selectedTime && deliveryTimes.includes(selectedTime)) {
      return selectedTime as '20-30 minutes' | '30-40 minutes' | '50-60 minutes';
    } else {
      return null;
    }
  }
  openDeliveryTimeModal(order: Porudzbina): void {
    const deliveryTimes = ['20-30 minutes', '30-40 minutes', '50-60 minutes'];
    const result = window.confirm('Odaberite procenjeno vreme dostave:\n\n' + deliveryTimes.join('\n'));
  
    if (result) {
      const selectedDeliveryTime = this.selectDeliveryTimeFromUser();
      if (selectedDeliveryTime) {
        this.confirmOrder(order, selectedDeliveryTime);
      }
    }
  }
  
  private selectDeliveryTimeFromUser(): '20-30 minutes' | '30-40 minutes' | '50-60 minutes' | null {
    const selectedTime = window.prompt('Unesite procenjeno vreme dostave:', '20-30 minutes');
    if (!selectedTime) {
      return null;
    }
  
    if (['20-30 minutes', '30-40 minutes', '50-60 minutes'].includes(selectedTime)) {
      return selectedTime as '20-30 minutes' | '30-40 minutes' | '50-60 minutes';
    } else {
      alert('Molimo izaberite jedno od ponuđenih vremena dostave.');
      return null;
    }
  }
  
  
}
