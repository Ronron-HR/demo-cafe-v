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
  // Koncerter i Viruphusets kultursal. Kilde: hvaderpaa.dk/da/spillested/viruphuset-hjortshoej/ (hentet 17. nov. 2026).
  // Årstal står ikke på listen; de er udledt af ugedagene (fre 20.11. = 2026 osv.). "tjek": datoen passer ikke med ugedagen.
  koncerter: [
    { iso: '2026-11-20', dag: 'Fre', dato: '20.11.', tid: '20.00', navn: 'Augusta Schackinger', pris: 80,  url: 'https://hvaderpaa.dk/da/event/12214/' },
    { iso: '2026-12-11', dag: 'Fre', dato: '11.12.', tid: '20.00', navn: 'Baby Did a Bad Thing', pris: 160, url: 'https://hvaderpaa.dk/da/event/12355/' },
    { iso: '2026-12-12', dag: 'Lør', dato: '11.12.', tid: '20.00', navn: 'Nabiha · julekoncert', pris: 250, url: 'https://hvaderpaa.dk/da/event/35026/', tjek: true },
    { iso: '2027-02-06', dag: 'Lør', dato: '6.2.',   tid: '20.00', navn: 'Sofia Hedia + Kom vi løber', pris: 160, url: 'https://hvaderpaa.dk/da/event/34194/' },
    { iso: '2027-02-27', dag: 'Lør', dato: '27.2.',  tid: '20.00', navn: 'Tigeroak', pris: 160, url: 'https://hvaderpaa.dk/da/event/34570/' },
    { iso: '2027-03-06', dag: 'Lør', dato: '6.3.',   tid: '20.00', navn: 'Tue West m. band', pris: 200, url: 'https://hvaderpaa.dk/da/event/23788/' },
    { iso: '2027-03-19', dag: 'Fre', dato: '19.3.',  tid: '20.00', navn: 'Fenja', pris: 80,  url: 'https://hvaderpaa.dk/da/event/12536/' },
    { iso: '2027-04-30', dag: 'Fre', dato: '30.4.',  tid: '20.00', navn: 'Charlotte Skadhauge m. band feat. Højlydt', pris: 160, url: 'https://hvaderpaa.dk/da/event/35022/' },
    { iso: '2027-05-14', dag: 'Fre', dato: '14.5.',  tid: '20.00', navn: 'Ki!', pris: 180, url: 'https://hvaderpaa.dk/da/event/24405/' }
  ],
  mailBestilling: 'cafe@viruphuset.dk',
  mailHuset: 'info@viruphuset.dk',
  telefon: '+4593838530',
  telefonVis: '93 83 85 30',
  telefontid: 'mandag, tirsdag og torsdag kl. 10–14',
  adresse: 'Virupvej 73, 8530 Hjortshøj',
  kort_url: 'https://www.google.com/maps/search/?api=1&query=Virupvej+73+8530+Hj%C3%B8rtsh%C3%B8j'
};
