export class Restoran {
    ime: string = '';
    adresa: string = '';
    tip: string = '';
    kratakOpis:string='';
    kontaktOsoba: string='';
    layout?:any;
    workingHours: {
      [key: string]: {
          open: boolean;
          from?: string;
          to?: string;
      };
  } = {
      ponedeljak: { open: false },
      utorak: { open: false },
      sreda: { open: false },
      cetvrtak: { open: false },
      petak: { open: false },
      subota: { open: false },
      nedelja: { open: false },
  };
  }
  