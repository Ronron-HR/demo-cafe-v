/* Fælles oplysninger om Café V. Kilde: viruphuset.dk/cafe-v/ og viruphuset.dk, hentet 17. november 2026.
   Alt, der ikke stod på kilden, er null og vises som "[tjek med stedet]". Ret her, så følger hjemmesiden med. */
window.CAFEV_DATA = {
  dagensRet: null,            // navnet står kun i en PDF på stedets side
  dagensRetPdf: 'https://viruphuset.dk/wp-content/uploads/2.pdf',
  pris: '95,-',
  dageMedDagensRet: [2, 3, 4], // tirsdag, onsdag, torsdag (JS: 0 = søndag)
  fristTime: 12,               // forudbestilling senest kl. 12.00
  serveresFra: '16.30',
  aabningstider: [
    ['Mandag', '15.30–19.30'],
    ['Tirsdag–torsdag', '11.00–19.30'],
    ['Fredag', '11.00–19.00'],
    ['Lørdag og søndag', null]
  ],
  kort: [
    { navn: 'Salatbowle', note: 'med kylling eller falafel og dressing', pris: 75 },
    { navn: 'Paneret kylling med fritter', note: '', pris: 75 },
    { navn: 'Fredags-tapas', note: 'spises i caféen eller tages med hjem', pris: 95 },
    { navn: 'Panini', note: 'med kylling eller Serrano-skinke', pris: 40 },
    { navn: 'Toast', note: '', pris: 20 },
    { navn: 'Hjemmebagt bolle', note: 'med ost eller marmelade', pris: 25 },
    { navn: 'Hjemmebagt kage', note: '', pris: 15 },
    { navn: 'Fritter', note: '', pris: 35 }
  ],
  mailBestilling: 'cafe@viruphuset.dk',
  mailHuset: 'info@viruphuset.dk',
  telefon: '+4593838530',
  telefonVis: '93 83 85 30',
  telefontid: 'mandag, tirsdag og torsdag kl. 10–14',
  adresse: 'Virupvej 73, 8530 Hjortshøj',
  kort_url: 'https://www.google.com/maps/search/?api=1&query=Virupvej+73+8530+Hj%C3%B8rtsh%C3%B8j'
};
