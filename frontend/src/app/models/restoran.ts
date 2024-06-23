export interface Restoran {
  _id: string;
  ime: string;
  adresa: string;
  tip: string;
  kratakOpis?: string;
  kontaktOsoba?: string;
  telefon?: string;  
  workingHoursFrom?: string;
  workingHoursTo?: string;
  layout?: Layout;
  ocena?: number;
  komentari?: string[]; // Array of comment IDs
}

export interface Layout {
  tables: Table[];
  kitchen: Rectangle;
  restroom: Rectangle;
}

export interface Table {
  id: string;
  x: number;
  y: number;
  radius?: number;
  maxPeople: number;
}

export interface Rectangle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
