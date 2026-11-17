/* Kundeside: dagens ret, nedtælling, samtaleflow, kvittering. */
(function () {
  var C = window.CafeV;
  var $ = function (s) { return document.querySelector(s); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof window.gsap !== 'undefined';
  var now = new Date();
  $('#day').textContent = C.DAYS[now.getDay()];

  /* ---------- nedtælling og lukket tilstand ---------- */
  function target() {
    var t = new Date(); t.setHours(12, 0, 0, 0);
    if (C.sim() === 'open' && t - new Date() < 36e5) t = new Date(Date.now() + (3 * 60 + 12) * 6e4);
    return t;
  }
  function tick() {
    var closed = C.isClosed();
    $('#open').hidden = closed; $('#closed').hidden = !closed;
    var ms = Math.max(0, target() - new Date());
    var h = Math.floor(ms / 36e5), m = Math.floor(ms % 36e5 / 6e4);
    $('#cd').textContent = h + ':' + String(m).padStart(2, '0');
    $('#cdtxt').textContent = h + ' t ' + m + ' min';
    var sb = $('#simbtn');
    var s = C.sim();
    sb.textContent = 'Demo-tid: ' + (s === 'open' ? 'før kl. 12' : s === 'closed' ? 'efter kl. 12' : 'rigtigt ur');
  }
  tick(); setInterval(tick, 20000);
  $('#simbtn').addEventListener('click', function () {
    var s = C.sim(); C.setSim(s === 'open' ? 'closed' : s === 'closed' ? 'real' : 'open'); tick();
  });
  $('#reset').addEventListener('click', function () { C.reset(); tick(); $('#bn').textContent = total(); });

  function total() { return C.load().reduce(function (a, o) { return a + o.portions; }, 0); }

  /* ---------- samtaleflow ---------- */
  var DIETS = ['Almindelig', 'Vegetar', 'Glutenfri', 'Andet'];
  var step = 0, draft = null, editing = null;
  var flow = $('#flow'), body = $('#fbody'), nextBtn = $('#next'), backBtn = $('#back'), err = $('#err');

  function openFlow(editId, startStep) {
    var data = C.load(), o = editId ? data.filter(function (x) { return x.id === editId; })[0] : null;
    editing = o ? o.id : null;
    draft = o ? { portions: o.portions, diet: o.diet, note: o.note, name: o.name } : { portions: 2, diet: '', note: '', name: '' };
    step = startStep || 0;
    flow.hidden = false; document.body.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();
    render(true);
  }
  function closeFlow() {
    flow.hidden = true; document.body.style.overflow = '';
    if (window.__lenis) window.__lenis.start();
    $('#start').focus();
  }

  function plate(n) {
    $('#food').style.transform = 'scale(' + (0.2 + n * 0.22) + ')';
  }

  function render(first) {
    err.textContent = '';
    plate(step);
    backBtn.hidden = step === 0 || step === 4;
    nextBtn.hidden = false; nextBtn.disabled = false;
    var h = '';
    if (step === 0) {
      h = '<p class="kicker">Spørgsmål 1 af 4</p><h2 class="q">Hvor mange portioner?</h2><p class="hint">Tryk på plus og minus.</p>' +
        '<div class="stepper"><button class="round" type="button" data-d="-1" aria-label="Én portion mindre">−</button>' +
        '<div class="num" id="num" aria-live="polite">' + draft.portions + '</div>' +
        '<button class="round" type="button" data-d="1" aria-label="Én portion mere">+</button></div>';
      nextBtn.innerHTML = 'Videre <span aria-hidden="true">→</span>';
    } else if (step === 1) {
      h = '<p class="kicker">Spørgsmål 2 af 4</p><h2 class="q">Allergi eller vegetar?</h2><p class="hint">Vælg ét. Skriv mere nedenfor, hvis det passer bedre.</p>' +
        '<div class="chips" role="radiogroup" aria-label="Kost">' + DIETS.map(function (d) {
          return '<button type="button" class="chip" role="radio" aria-checked="' + (draft.diet === d) + '" data-diet="' + d + '">' + d + '</button>';
        }).join('') + '</div>' +
        '<label class="lab" for="note">Skriv gerne mere (valgfrit)</label><input class="field" id="note" type="text" autocomplete="off" value="' + C.esc(draft.note) + '">';
      nextBtn.innerHTML = 'Videre <span aria-hidden="true">→</span>';
    } else if (step === 2) {
      h = '<p class="kicker">Spørgsmål 3 af 4</p><h2 class="q">Hvad hedder du?</h2><p class="hint">Så ved køkkenet, hvem maden er til.</p>' +
        '<label class="lab" for="nm">Dit navn</label><input class="field" id="nm" type="text" autocomplete="name" value="' + C.esc(draft.name) + '">';
      nextBtn.innerHTML = 'Videre <span aria-hidden="true">→</span>';
    } else if (step === 3) {
      h = '<p class="kicker">Spørgsmål 4 af 4</p><h2 class="q">Passer det her?</h2>' +
        '<div class="sum"><div><span>' + draft.portions + (draft.portions === 1 ? ' portion' : ' portioner') + '</span><button type="button" data-go="0">Ret</button></div>' +
        '<div><span>' + C.esc(draft.diet || '–') + (draft.note ? ' · ' + C.esc(draft.note) : '') + '</span><button type="button" data-go="1">Ret</button></div>' +
        '<div><span>' + C.esc(draft.name || '–') + '</span><button type="button" data-go="2">Ret</button></div></div>' +
        '<p class="hint" style="margin-top:16px">Dagens ret serveres kl. 16.30. Du kan rette antal indtil kl. 12.</p>';
      nextBtn.innerHTML = (editing ? 'Gem ændring' : 'Bekræft bestilling') + ' <span aria-hidden="true">✓</span>';
    } else {
      var o = C.load().filter(function (x) { return x.id === C.last(); })[0] || { id: 'D-000', portions: draft.portions, diet: draft.diet, name: draft.name, note: draft.note };
      h = '<div class="receipt ' + (reduce ? '' : 'print') + '" id="rc"><p class="kicker">Café V · Dagens ret</p><h3>Tak, ' + C.esc((o.name || '').split(' ')[0] || 'gæst') + '.</h3>' +
        '<div class="big" id="rbig">' + (reduce ? o.portions : 0) + '</div><p class="kicker">' + (o.portions === 1 ? 'portion' : 'portioner') + ' kl. 16.30</p>' +
        '<dl><dt>Kost</dt><dd>' + C.esc(o.diet || '–') + '</dd><dt>Nr.</dt><dd>' + C.esc(o.id) + '</dd><dt>Status</dt><dd>' + C.esc(o.status || 'Ny') + '</dd></dl>' +
        '<p class="hint" style="margin:14px 0 0;font-size:13px">Demo: gemt kun på denne telefon.</p></div>' +
        '<a class="btn ink" href="ejer.html">Se det i køkkenets liste <span aria-hidden="true">→</span></a>' +
        '<div style="height:12px"></div><button class="btn ghost" type="button" id="edit">Ret antal</button>';
      nextBtn.hidden = true;
      var rbigTo = o.portions;
    }
    body.innerHTML = h; body.scrollTop = 0;
    if (step === 4 && !reduce) countUp($('#rbig'), rbigTo, 900);
    if (hasGsap && !reduce && !first) gsap.from(body.children, { y: 22, opacity: 0, duration: .7, ease: 'expo.out', stagger: .06 });
    var f = body.querySelector('input'); if (f && step !== 4) { try { f.focus({ preventScroll: true }); } catch (e) {} }
  }

  function countUp(el, to, dur) {
    var t0 = performance.now();
    (function f(t) { var p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
  }

  body.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.dataset.d) { draft.portions = Math.min(40, Math.max(1, draft.portions + Number(b.dataset.d))); $('#num').textContent = draft.portions; if (hasGsap && !reduce) gsap.fromTo('#num', { scale: 1.08 }, { scale: 1, duration: .4, ease: 'power3.out' }); }
    else if (b.dataset.diet) { draft.diet = b.dataset.diet; body.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-checked', c === b); }); }
    else if (b.dataset.go) { step = Number(b.dataset.go); render(); }
    else if (b.id === 'edit') { if (C.isClosed()) { err.textContent = 'Bestillingen er lukket, så antal kan ikke rettes.'; return; } openFlow(C.last(), 0); }
  });

  nextBtn.addEventListener('click', function () {
    if (step === 1) { draft.note = ($('#note') || {}).value || ''; if (!draft.diet) { err.textContent = 'Vælg en kost, så køkkenet ved det.'; return; } }
    if (step === 2) { draft.name = (($('#nm') || {}).value || '').trim(); if (!draft.name) { err.textContent = 'Skriv dit navn.'; return; } }
    if (step === 3) { if (C.isClosed()) { err.textContent = 'Bestillingen er lukket for i dag.'; return; } commit(); step = 4; render(); return; }
    step++; render();
  });
  backBtn.addEventListener('click', function () { if (step > 0) { step--; render(); } });
  $('#close').addEventListener('click', function () { closeFlow(); $('#bn').textContent = total(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !flow.hidden) closeFlow(); });

  function commit() {
    var data = C.load(), t = new Date().toISOString();
    if (editing) {
      var o = data.filter(function (x) { return x.id === editing; })[0];
      if (o) {
        if (o.portions !== draft.portions) o.changes.push({ text: 'Ændret: ' + o.portions + ' → ' + draft.portions + ' portioner', at: t });
        if (o.diet !== draft.diet) o.changes.push({ text: 'Ændret kost: ' + (o.diet || '–') + ' → ' + draft.diet, at: t });
        o.portions = draft.portions; o.diet = draft.diet; o.note = draft.note; o.name = draft.name;
        C.setLast(o.id);
      }
    } else {
      var id = C.newId(data);
      data.push({ id: id, name: draft.name, portions: draft.portions, diet: draft.diet, note: draft.note, status: 'Ny', created: t, changes: [] });
      C.setLast(id);
    }
    C.save(data);
  }

  $('#start').addEventListener('click', function () { openFlow(null, 0); });

  /* ---------- animation ---------- */
  $('#bn').textContent = total();
  if (hasGsap && !reduce) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (typeof Lenis !== 'undefined') {
      var lenis = new Lenis({ duration: 1.1 }); window.__lenis = lenis;
      if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0);
    }
    var h1 = $('#ttl');
    if (typeof SplitType !== 'undefined') {
      var sp = new SplitType(h1, { types: 'chars' });
      gsap.from(sp.chars, { yPercent: 110, opacity: 0, duration: 1, ease: 'expo.out', stagger: .035, delay: .15 });
    }
    gsap.from('#poster', { y: 40, opacity: 0, rotate: 4, duration: 1.1, ease: 'power3.out' });
    gsap.from('#day', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', delay: .3 });
    if (window.ScrollTrigger) {
      gsap.to('#phin', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.poster', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('#mq', { x: -520, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: true } });
      var steps = gsap.utils.toArray('.step');
      gsap.set(steps.slice(1), { opacity: 0, y: 30 });
      var tl = gsap.timeline({ scrollTrigger: { trigger: '#how', start: 'top top', end: '+=120%', pin: true, scrub: .6 } });
      steps.slice(1).forEach(function (s) { tl.to(s, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }); });
      var cnt = { v: 0 };
      ScrollTrigger.create({ trigger: '.kitchen', start: 'top 70%', once: true, onEnter: function () {
        gsap.to(cnt, { v: total(), duration: 1.4, ease: 'expo.out', onUpdate: function () { $('#bn').textContent = Math.round(cnt.v); } });
      } });
    }
    // magnetisk hover (kun mus)
    if (matchMedia('(hover:hover)').matches) document.querySelectorAll('.btn').forEach(function (b) {
      b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .08, y: (e.clientY - r.top - r.height / 2) * .15, duration: .4, ease: 'power3.out' }); });
      b.addEventListener('mouseleave', function () { gsap.to(b, { x: 0, y: 0, duration: .6, ease: 'expo.out' }); });
    });
  }

  /* test/skærmbillede: #steg0 .. #steg4 åbner flowet direkte */
  var m = /^#steg(\d)$/.exec(location.hash);
  if (m) { openFlow(null, Number(m[1])); if (Number(m[1]) === 4) { var d = C.load(); C.setLast(d[0].id); render(true); } else if (Number(m[1]) >= 3) { draft.diet = 'Vegetar'; draft.name = 'Ronny'; render(true); } }
})();
