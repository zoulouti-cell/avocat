(function () {
  'use strict';
  function init() {
    var bar = document.querySelector('header.bar');
    if (!bar || !document.fullscreenEnabled || document.getElementById('avocat-fullscreen')) return;
    var style = document.createElement('style');
    style.textContent = '.avocat-fullscreen{display:inline-grid;place-items:center;flex:0 0 40px;width:40px;height:40px;padding:0;border:0;background:transparent;color:var(--gt,var(--gold,#d8b25c));cursor:pointer}.avocat-fullscreen svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.avocat-fullscreen:focus-visible{outline:2px solid currentColor;outline-offset:2px}.avocat-fullscreen:hover{opacity:.75}:root[data-theme="light"] .avocat-fullscreen,html.lt .avocat-fullscreen{color:#2f6b55}@media print{.avocat-fullscreen{display:none!important}}';
    document.head.appendChild(style);
    var button = document.createElement('button');
    button.id = 'avocat-fullscreen';
    button.className = 'avocat-fullscreen';
    button.type = 'button';
    button.setAttribute('data-noi18n', '');
    function update() {
      var lang = (document.documentElement.lang || 'ar').split('-')[0];
      var full = Boolean(document.fullscreenElement);
      var label = lang === 'fr' ? (full ? 'Quitter le plein écran' : 'Plein écran') : lang === 'en' ? (full ? 'Exit fullscreen' : 'Fullscreen') : (full ? 'الخروج من ملء الشاشة' : 'ملء الشاشة');
      button.title = label;
      button.setAttribute('aria-label', label);
      button.setAttribute('aria-pressed', String(full));
      button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + (full ? 'M8 3v5H3m13-5v5h5M8 21v-5H3m13 5v-5h5' : 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5') + '"/></svg>';
    }
    button.addEventListener('click', function () {
      var operation = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
      Promise.resolve(operation).catch(function () {
        var lang = document.documentElement.lang;
        button.title = lang === 'fr' ? 'Le navigateur a refusé le plein écran (F11 sur ordinateur).' : lang === 'en' ? 'Fullscreen was refused by the browser (F11 on desktop).' : 'المتصفح لم يسمح بملء الشاشة (F11 على الحاسوب).';
        button.setAttribute('aria-label', button.title);
      });
    });
    bar.appendChild(button);
    document.addEventListener('fullscreenchange', update);
    new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
