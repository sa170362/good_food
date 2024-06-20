export class Korisnik {
  korisnickoIme: string = '';
  lozinka: string = '';
  sigurnosnoPitanje: string = '';
  sigurnosniOdgovor: string= '';
  ime: string = '';
  prezime: string = '';
  pol: string = '';
  adresa: string = '';
  kontaktTelefon: string = '';
  mejl: string = '';
  profilnaSlika?: File;
  profilnaSlikaUrl?: string;
  brojKreditneKartice: string = '';
  tip:string = '';
  status?:string ='';
  restoran?:string ='';
}
  