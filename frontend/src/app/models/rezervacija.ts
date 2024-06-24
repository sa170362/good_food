export class Rezervacija {
    korisnickoIme: string = '';
    imeGosta: string = '';
    datumVremeRezervacije: Date =  new Date(); ;
    brojGostiju: number | undefined;
    komentarGosta: string | undefined;
    statusRezervacije: string = 'neobradjena';
    razlogOdbijanja: string | undefined;
    brojStola: number | undefined;
    datumKreiranja: Date | undefined;
    restoran:string = '';
    konobar?:string = '';

}
  