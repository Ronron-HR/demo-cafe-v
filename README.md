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
- Fastgjort ("pinned") sektion og Lenis er kun set via kode, ikke afprøvet med rigtig scrolling.
- Ingen GitHub-repo og intet offentligt deploy, før Ronny godkender det.
