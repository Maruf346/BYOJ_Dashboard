export interface Metal {
  id: string;
  name: string;
  carat: string;
}

export interface Diamond {
  id: string;
  name: string;
}

export const initialMetals: Metal[] = [
  { id: '1', name: 'Yellow Gold', carat: '18K' },
  { id: '2', name: 'White Gold', carat: '14K' },
  { id: '3', name: 'Rose Gold', carat: '18K' },
  { id: '4', name: 'Platinum', carat: '950' },
];

export const initialDiamonds: Diamond[] = [
  { id: '1', name: 'Yellow Diamond' },
  { id: '2', name: 'White Diamond' },
  { id: '3', name: 'Pink Diamond' },
  { id: '4', name: 'Blue Diamond' },
];

export const initialClarityGrades = ['VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];
