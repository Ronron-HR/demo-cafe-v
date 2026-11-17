/* Café V hjemmeside: data fra ../data.js, nedtælling, animationer. Virker uden GSAP (alt vises statisk). */
(function () {
  var D = window.CAFEV_DATA || {};
  var $ = function (s) { return document.querySelector(s); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gs = typeof window.gsap !== 'undefined';
  var DAYS = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
  var now = new Date(), dow = now.getDay();
  var has = (D.dageMedDagensRet || [2, 3, 4]).indexOf(dow) > -1;

  /* ---- hero: dagens ret findes kun tirs–tors ---- */
  function nextDay() { for (var i = 1; i < 8; i++) { var d = (dow + i) % 7; if ((D.dageMedDagensRet || []).indexOf(d) > -1) return d; } return 2; }
  var showDay = has ? dow : nextDay();
  var hday = $('#hday'); if (hday) hday.textContent = DAYS[showDay];
  var ttl = $('#ttl'), kick = $('#kick'), name = D.dagensRet;
  if (name) ttl.textContent = name;
  if (!has && kick) kick.textContent = 'Næste dagens ret · ' + DAYS[showDay] + ' fra kl. ' + (D.serveresFra || '16.30');
  if (has && kick) kick.textContent = 'Dagens ret · fra kl. ' + (D.serveresFra || '16.30');
  var b = $('#bestil'); if (b && !has) b.innerHTML = 'Prøv bestillingen <span aria-hidden="true">→</span>';

  /* ---- nedtælling til kl. 12 ---- */
  function tick() {
    var cd = $('#cd'), tx = $('#cdtxt'); if (!cd) return;
    if (!has) { cd.textContent = 'Ingen i dag'; tx.textContent = 'Dagens ret serveres tirsdag til torsdag'; return; }
    var t = new Date(); t.setHours(D.fristTime || 12, 0, 0, 0);
    var ms = t - new Date();
    if (ms <= 0) { cd.textContent = 'Lukket'; tx.textContent = 'Forudbestilling lukkede kl. 12.00. Vi ses i morgen.'; return; }
    var h = Math.floor(ms / 36e5), m = Math.floor(ms % 36e5 / 6e4);
    cd.textContent = h + ':' + String(m).padStart(2, '0'); tx.textContent = 'tilbage til forudbestilling kl. 12.00';
  }
  tick(); setInterval(tick, 20000);

  /* ---- opslagstavle med retter ---- */
  var board = $('#board');
  if (board && D.kort) {
    var h = '<div class="bn dark" tabindex="0"><div><h3>Dagens ret</h3><p>Tirsdag–torsdag. Skifter fra uge til uge. <a href="' + (D.dagensRetPdf || '#') + '" rel="noopener" target="_blank">Se PDF</a></p></div><div class="pr" data-to="95">95<small>kr.</small></div></div>';
    D.kort.forEach(function (k) {
      h += '<div class="bn" tabindex="0"><div><h3>' + esc(k.navn) + '</h3>' + (k.note ? '<p>' + esc(k.note) + '</p>' : '') + '</div><div class="pr" data-to="' + k.pris + '">' + k.pris + '<small>kr.</small></div></div>';
    });
    board.innerHTML = h;
  }
  var hrs = $('#hrs');
  if (hrs && D.aabningstider) hrs.innerHTML = D.aabningstider.map(function (r) {
    return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + (r[1] ? esc(r[1]) : '<span class="tbd">[tjek med stedet]</span>') + '</td></tr>';
  }).join('');
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---- animation ---- */
  if (!gs || reduce) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  var lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1 });
    if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0);
  }
  if (typeof SplitType !== 'undefined' && ttl) {
    var sp = new SplitType(ttl, { types: 'words,chars' });
    gsap.from(sp.chars, { yPercent: 110, opacity: 0, duration: 1, ease: 'expo.out', stagger: .03, delay: .15 });
  }
  gsap.from('#n1', { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out' });
  gsap.from('.notes .note', { y: 30, opacity: 0, duration: .9, ease: 'expo.out', stagger: .12, delay: .35 });
  gsap.from('#hday', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', delay: .3 });

  if (window.ScrollTrigger) {
    document.querySelectorAll('[data-par]').forEach(function (el) {
      gsap.to(el, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: el.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    // pinnet tidslinje kl. 12 -> 16.30 (kun hvis der er højde nok)
    var a = $('#tma'), bb = $('#tmb'), line = $('#tli');
    if (a && bb && line && matchMedia('(max-width: 899px)').matches) {
      gsap.set(bb, { opacity: .12, y: 30 }); gsap.set(line, { scaleX: .08 });
      var tl = gsap.timeline({ scrollTrigger: { trigger: '#tl', start: 'top top', end: '+=110%', pin: true, scrub: .6 } });
      tl.to(line, { scaleX: 1, ease: 'none', duration: 2 }, 0).to(bb, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, .8).to(a, { opacity: .35, duration: 1 }, .8);
    } else if (a && bb) {
      gsap.from([a, bb], { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: .15, scrollTrigger: { trigger: '#tl', start: 'top 70%' } });
    }
    // tal der tæller op
    document.querySelectorAll('[data-to]').forEach(function (el) {
      var to = Number(el.dataset.to), small = el.querySelector('small'), o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () {
        gsap.to(o, { v: to, duration: 1.2, ease: 'expo.out', onUpdate: function () { el.firstChild.nodeValue = Math.round(o.v); } });
      } });
      if (el.firstChild && el.firstChild.nodeType === 3) el.firstChild.nodeValue = '0';
    });
    gsap.utils.toArray('.about .tx, .prak > div, .sec .lead').forEach(function (el) {
      gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
  }
  // magnetiske knapper (kun mus)
  if (matchMedia('(hover:hover)').matches) document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) { var r = btn.getBoundingClientRect(); gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * .08, y: (e.clientY - r.top - r.height / 2) * .15, duration: .4, ease: 'power3.out' }); });
    btn.addEventListener('mouseleave', function () { gsap.to(btn, { x: 0, y: 0, duration: .6, ease: 'expo.out' }); });
  });
})();
