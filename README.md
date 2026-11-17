# Café V · Dagens ret (demo, retning C: varm og taktil)

Demo lavet af OviaSpecs til Café V i Viruphuset. Ikke en officiel side, ingen aftale. `noindex` er sat. Del ikke linket offentligt.

## Hvad den viser
- `index.html`: kundeside med dagens ret (ugedag lodret), nedtælling til kl. 12, samtaleflow (portioner → allergi/vegetar → navn → bekræft), tallerken der fyldes som fremskridt, kvittering der "printes". Efter kl. 12 står der "Bestillingen er lukket for i dag – vi ses i morgen."
- `ejer.html`: ejer-visning med samlet antal portioner, opdeling efter kost, henvendelser med status (Ny → Set → Godkendt → Klar → Afsluttet, ét tryk), røde "mangler", markerede ændringer, en køkkenliste og knappen "Luk bestilling".

## Kør lokalt
Åbn `index.html` i en browser, eller kør `python -m http.server 8765` i mappen og gå til http://localhost:8765/index.html. Skrifter og animationsbiblioteker (GSAP, ScrollTrigger, Lenis, SplitType) hentes fra internettet. Uden net virker siden stadig, men uden animation og med reserveskrifter.

## Falske demo-data
- Fire eksempel-henvendelser ("Mette (demo)", "Jens (demo)", "Familien Sørensen (demo)" og én uden navn og kost). De er opdigtede.
- Alt gemmes kun i `localStorage` på den enhed og browser, du bruger. En bestilling lavet på kundesiden dukker op i ejer-visningen på samme telefon. Der er ingen server, ingen betaling, ingen login og ingen rigtige mails.
- "Nulstil demo" ligger nederst på begge sider. "Demo-tid" nederst på kundesiden skifter mellem før kl. 12 (standard), efter kl. 12 og rigtigt ur.
- Ukendt og markeret `[tjek med stedet]`: dagens rets navn, pris, åbningstider, stedets egne farver.

## Skift billeder
Pladsholderen "Jeres eget billede her" ligger i `index.html` (`<div class="ph">`). Læg stedets egne fotos (kun med tilladelse) i mappen og erstat indholdet med `<img src="..." alt="..." style="width:100%;height:100%;object-fit:cover">`. Forholdet er 4:5.

## Farver og skrifter
CSS-variabler øverst i `style.css`. Rød er `#BC3820` (mørkere end i mockuppen for at nå WCAG AA, ca. 4,7:1 på papir). Skrifter: Instrument Serif og Manrope.

## Kendte mangler
- Ikke testet på rigtig telefon, kun i headless Chrome (390 px) og et almindeligt Chrome-vindue.
- Den fastgjorte tidslinje og Lenis er afprøvet i Chrome, men ikke på en rigtig telefon.
- Udgivet på GitHub Pages efter Ronnys ordre 17. november 2026. Linket må ikke deles offentligt.

## Hjemmeside (`/hjemmeside/`)
Selvstændig demo-hjemmeside til Café V, bygget i samme retning (varm og taktil) og med samme variabler som bestillingen (`../style.css`).
- `hjemmeside/index.html`: forside med dagens ret, nedtælling til kl. 12, tidslinje kl. 12 → 16.30, vandret opslagstavle med fast-på-kortet-retter, om Café V, åbningstider og kontakt. Knappen "Bestil dagens ret" går til `../index.html`.
- `hjemmeside/om.html`: om Viruphuset.
- `data.js` (i roden): fælles oplysninger (priser, åbningstider, kontakt). Hjemmesiden læser den. Bestillingsdemoen (`index.html`) har dagens ret skrevet direkte i HTML og er ikke koblet til filen endnu.
- Dagens ret findes kun tirsdag–torsdag ifølge stedets side. På andre dage viser hjemmesiden "Næste dagens ret". Bestillingsdemoen viser den stadig alle dage.

### Kilder (hentet 17. november 2026)
- https://viruphuset.dk/cafe-v/ : åbningstider, dagens ret (95,-, tirs–tors, serveres fra 16.30), forudbestilling på mail senest kl. 12.00 (ikke telefon, sms, Messenger), faste retter og priser, selskaber, kontakt.
- https://viruphuset.dk : adresse, telefon, e-mail, drift af Fonden Multihus Hjortshøj, nævnelsen af "Hjorten – Byens filmklub".
- https://viruphuset.dk/events/strik-i-viruphuset/ : Strik i Viruphuset, onsdage 10–12, gratis (siden angiver to forskellige datoer).
- Ugens dagens ret står i https://viruphuset.dk/wp-content/uploads/2.pdf. PDF'en kunne ikke læses automatisk, så retternes navne er IKKE gengivet.

### Stadig "[tjek med stedet]"
Dagens rets navn, drikkevarepriser, åbningstider lørdag og søndag, priser og booking af lokaler, om Strik i Viruphuset og filmklubben kører nu og hvornår, stedets egne farver og alle billeder (pladsholdere). En søgning viste en anden mailfrist (kl. 08.00) og andre åbningstider end siden; siden er brugt, men skal tjekkes. Facebook (facebook.com/viruphuset) er ikke læst.

### Tilføjet 17. november 2026 (billeder og koncertside)
- `hjemmeside/koncerter.html`: kommende koncerter i Viruphusets kultursal, læst fra `data.js`. Kilde: https://hvaderpaa.dk/da/spillested/viruphuset-hjortshoej/ (en tredjepartsliste; viruphuset.dk har ingen koncertliste). Listen angiver ikke årstal; de er udledt af ugedagene. Nabiha-julekoncerten står som "lør 11.12.", men 11.12.2026 er en fredag, så datoen er markeret [tjek med stedet]. Forsiden viser "Næste koncert".
- Fra samme liste (hvaderpaa.dk): huset er på 2.500 m² på to etager med hal, fitness, kultursal og Café V, og 10–20 koncerter om året sammen med Voxhall. Husets åbningstider (08–22) er IKKE brugt, fordi de kun står på tredjepartslisten.
- Strik i Viruphuset: onsdage 10–12 fra 18. nov. 2026 til 3. feb. 2027 ifølge stedets liste.
- Billeder i `img/` er EKSEMPELBILLEDER fra Unsplash (Unsplash License, gratis at bruge): `cafe-interior.jpg` (Kouji Tsuru), `kage-kaffe.jpg` (Branimir Petakov). De er ikke Café V's egne og er mærket på siden. Udskift dem med stedets egne fotos (med tilladelse), før demoen bruges som andet end et udkast. Ingen af billederne er taget fra viruphuset.dk eller Facebook.
