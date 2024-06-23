export interface Rezervacija {
    _id: string;
    korisnickoIme: string;
    imeGosta: string;
    datumVremeRezervacije: Date;
    brojGostiju: number;
    komentarGosta?: string;
    statusRezervacije?: string;
    razlogOdbijanja?: string;
    brojStola?: number;
    datumKreiranja: Date;
    imeRestorana: string;
  }
  