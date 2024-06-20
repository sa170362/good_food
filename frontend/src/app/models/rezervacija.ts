export class Rezervacija {
    korisnickoIme: string = '';
    imeGosta: string = '';
    datumVremeRezervacije: Date | undefined;
    brojGostiju: number | undefined;
    komentarGosta: string | undefined;
    statusRezervacije: string = 'neobradjena';
    razlogOdbijanja: string | undefined;
    brojStola: number | undefined;
    datumKreiranja: Date | undefined;

}
  