export class Porudzbina {
    customer: string = '';
    customerkorIme: string = '';
    restoran: string = '';
    items: { name: string, quantity: number }[] = [];
    status: 'pending' | 'confirmed' | 'rejected' = 'pending';
    estimatedDeliveryTime: '20-30 minutes' | '30-40 minutes' | '50-60 minutes' | null = null;
    createdAt: Date = new Date();
  }
  