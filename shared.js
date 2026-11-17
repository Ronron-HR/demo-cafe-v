/* Fælles data for kundeside og ejer-visning. Alt ligger i localStorage på denne telefon. Ingen server, ingen rigtige mails. */
(function () {
  var KEY = 'cafev_demo_orders_v1', CLOSED = 'cafev_demo_closed_v1', SIM = 'cafev_demo_sim_v1', LAST = 'cafev_demo_last_v1';
  var STATUSES = ['Ny', 'Set', 'Godkendt', 'Klar', 'Afsluttet'];
  var DAYS = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
  var MONTHS = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function del(k) { try { localStorage.removeItem(k); } catch (e) {} }

  function at(h, m) { var d = new Date(); d.setHours(h, m, 0, 0); return d.toISOString(); }
  function hm(iso) { return new Date(iso).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }); }

  // Falske eksempler. Navnene er opdigtede og mærket "(demo)".
  function seed() {
    return [
      { id: 'D-101', name: 'Mette (demo)', portions: 4, diet: 'Almindelig', note: '', status: 'Ny', created: at(8, 41), changes: [] },
      { id: 'D-102', name: 'Jens (demo)', portions: 2, diet: 'Vegetar', note: '', status: 'Set', created: at(9, 15), changes: [] },
      { id: 'D-103', name: 'Familien Sørensen (demo)', portions: 3, diet: 'Glutenfri', note: '', status: 'Godkendt', created: at(10, 2), changes: [{ text: 'Ændret: 4 → 3 portioner', at: at(11, 42) }] },
      { id: 'D-104', name: '', portions: 2, diet: '', note: '', status: 'Ny', created: at(11, 20), changes: [] }
    ];
  }

  function load() {
    var raw = get(KEY), data = null;
    if (raw) { try { data = JSON.parse(raw); } catch (e) { data = null; } }
    if (!Array.isArray(data)) { data = seed(); save(data); }
    return data;
  }
  function save(data) { set(KEY, JSON.stringify(data)); }
  function reset() { del(KEY); del(CLOSED); del(SIM); del(LAST); }

  function missing(o) {
    var m = [];
    if (!o.name || !o.name.trim()) m.push('navn');
    if (!o.diet) m.push('allergisvar');
    return m;
  }
  function ownerClosed() { return get(CLOSED) === '1'; }
  function setOwnerClosed(v) { set(CLOSED, v ? '1' : '0'); }
  // Standard i demoen: "åben" (før kl. 12), så flowet kan vises hele dagen. Skift i bunden af kundesiden.
  function sim() { return get(SIM) || 'open'; }
  function setSim(v) { set(SIM, v); }
  function isClosed() {
    if (ownerClosed()) return true;
    var s = sim();
    if (s === 'closed') return true;
    if (s === 'open') return false;
    return new Date().getHours() >= 12;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function newId(data) { return 'B-' + (200 + data.length + 1) + String(Date.now()).slice(-3); }

  window.CafeV = {
    STATUSES: STATUSES, DAYS: DAYS, MONTHS: MONTHS,
    load: load, save: save, reset: reset, missing: missing, hm: hm, esc: esc, newId: newId,
    isClosed: isClosed, ownerClosed: ownerClosed, setOwnerClosed: setOwnerClosed, sim: sim, setSim: setSim,
    last: function () { return get(LAST); }, setLast: function (id) { set(LAST, id); }
  };
})();
