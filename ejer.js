/* Ejer-visning: rolig, ingen scroll-animationer. Læses på 3 sekunder. */
(function () {
  var C = window.CafeV, $ = function (s) { return document.querySelector(s); };
  var ST = C.STATUSES;
  var d = new Date();
  $('#eh').textContent = 'I dag · ' + C.DAYS[d.getDay()] + ' ' + d.getDate() + '. ' + C.MONTHS[d.getMonth()];

  function render() {
    var data = C.load();
    var tot = 0, by = { Almindelig: 0, Vegetar: 0, Glutenfri: 0, Andet: 0, 'Mangler svar': 0 };
    data.forEach(function (o) { tot += o.portions; by[o.diet || 'Mangler svar'] += o.portions; });
    $('#tot').textContent = tot;
    $('#split').innerHTML = ['Almindelig', 'Vegetar', 'Glutenfri', 'Andet'].map(function (k) {
      return '<div><b>' + by[k] + '</b><small>' + k + '</small></div>';
    }).join('');

    var miss = data.filter(function (o) { return C.missing(o).length && o.status !== 'Afsluttet'; });
    $('#warn').innerHTML = miss.length ? '<div class="warn" role="alert">' + miss.length + (miss.length === 1 ? ' henvendelse mangler' : ' henvendelser mangler') + ' noget (' + by['Mangler svar'] + ' portioner uden kost-svar)</div>' : '';

    var closed = C.ownerClosed();
    $('#closebtn').textContent = closed ? 'Åbn bestilling igen' : 'Luk bestilling';
    $('#closebtn').className = 'btn ' + (closed ? '' : 'ink');

    var sorted = data.slice().sort(function (a, b) {
      return (ST.indexOf(a.status) === 4) - (ST.indexOf(b.status) === 4) || new Date(b.created) - new Date(a.created);
    });
    $('#orders').innerHTML = sorted.map(function (o) {
      var i = ST.indexOf(o.status), m = C.missing(o), last = o.changes[o.changes.length - 1];
      return '<article class="order' + (m.length ? ' miss' : '') + '" data-id="' + C.esc(o.id) + '">' +
        '<div class="top"><span class="nm">' + (o.name ? C.esc(o.name) : '<span style="color:var(--red)">Navn mangler</span>') + '</span><span class="qty">' + o.portions + ' × ' + C.esc(o.diet || '?') + '</span></div>' +
        '<div class="meta">' + C.esc(o.id) + ' · kl. ' + C.hm(o.created) + (o.note ? ' · ' + C.esc(o.note) : '') + '</div>' +
        (last ? '<span class="chg">' + C.esc(last.text) + ', kl. ' + C.hm(last.at) + '</span>' : '') +
        (m.length ? '<div class="ms">Mangler: ' + m.join(', ') + '</div>' : '') +
        '<div class="prog" aria-hidden="true">' + ST.map(function (s, k) { return '<i class="' + (k <= i ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
        '<div class="st"><span class="pill">' + ST[i] + '</span>' +
        (i < ST.length - 1 ? '<button class="adv" type="button" data-adv="' + C.esc(o.id) + '">' + ST[i] + ' → ' + ST[i + 1] + '</button>' : '<button class="adv" type="button" disabled>Afsluttet</button>') +
        '</div></article>';
    }).join('');

    var lines = ['Almindelig', 'Vegetar', 'Glutenfri', 'Andet'].filter(function (k) { return by[k]; }).map(function (k) { return '<li>' + by[k] + ' × ' + k.toLowerCase() + '</li>'; });
    if (by['Mangler svar']) lines.push('<li style="color:var(--red)">' + by['Mangler svar'] + ' × mangler svar</li>');
    var names = data.filter(function (o) { return o.status !== 'Afsluttet'; }).map(function (o) { return (o.name || '?') + ' (' + o.portions + ')'; });
    $('#klist').innerHTML = '<li><strong>Serveres kl. 16.30 · i alt ' + tot + '</strong></li>' + lines.join('') + (names.length ? '<li style="font-weight:600;font-size:15px">' + names.map(C.esc).join(', ') + '</li>' : '');
  }

  $('#orders').addEventListener('click', function (e) {
    var b = e.target.closest('[data-adv]'); if (!b) return;
    var data = C.load(), o = data.filter(function (x) { return x.id === b.dataset.adv; })[0];
    if (o && ST.indexOf(o.status) < ST.length - 1) { o.status = ST[ST.indexOf(o.status) + 1]; C.save(data); render(); }
  });
  $('#closebtn').addEventListener('click', function () { C.setOwnerClosed(!C.ownerClosed()); render(); });
  $('#reset').addEventListener('click', function () { C.reset(); render(); });
  window.addEventListener('storage', render);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) render(); });
  render();
})();
