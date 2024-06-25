import { StavkaKorpe } from "./cartItem";

export class Porudzbina {
  customerKorIme: string = '';
  stavke: StavkaKorpe[] = [];
  ukupnaCena: number = 0;
  status: 'pending' | 'confirmed' | 'rejected' = 'pending';
  estimatedDeliveryTime: '20-30 minutes' | '30-40 minutes' | '50-60 minutes' | null = null;
  createdAt: Date = new Date();
  adresaDostave: string = '';
  kontaktTelefon: string = '';
  restoran:string=''
  }
  