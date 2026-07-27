(function () {
  'use strict';

  var container, svg;

  function calc() {
    var niveles = container.querySelectorAll('.nivel');
    if (niveles.length < 2) {
      if (svg) svg.innerHTML = '';
      return;
    }

    var containerRect = container.getBoundingClientRect();
    var w = containerRect.width;
    var h = containerRect.height;
    if (w < 1 || h < 1) return;

    var paths = [];

    for (var i = 1; i < niveles.length; i++) {
      var prev = niveles[i - 1];
      var curr = niveles[i];
      var prevRect = prev.getBoundingClientRect();
      var cards = curr.querySelectorAll('.card');
      if (!cards.length) continue;

      var px = prevRect.left + prevRect.width / 2 - containerRect.left;
      var py = prevRect.bottom - containerRect.top;

      for (var j = 0; j < cards.length; j++) {
        var cr = cards[j].getBoundingClientRect();
        var cx = cr.left + cr.width / 2 - containerRect.left;
        var ct = cr.top - containerRect.top;
        var mid = py + (ct - py) * 0.45;
        paths.push(
          'M ' + px.toFixed(1) + ',' + py.toFixed(1) +
          ' C ' + px.toFixed(1) + ',' + mid.toFixed(1) +
          ' ' + cx.toFixed(1) + ',' + mid.toFixed(1) +
          ' ' + cx.toFixed(1) + ',' + ct.toFixed(1)
        );
      }
    }

    if (paths.length) {
      svg.setAttribute('viewBox', '0 0 ' + w.toFixed(1) + ' ' + h.toFixed(1));
      svg.innerHTML = '<path d="' + paths.join(' ') + '" stroke="#800000" stroke-width="2.5" fill="none" opacity="0.4" stroke-linecap="round"/>';
    } else {
      svg.innerHTML = '';
    }
  }

  function dibujarConectores() {
    container = document.querySelector('.jerarquica');
    if (!container) return;

    svg = container.querySelector('.jerarquica-svg');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('jerarquica-svg');
      svg.setAttribute('style', 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible');
      container.appendChild(svg);
    }

    calc();

    window.addEventListener('resize', function () {
      requestAnimationFrame(calc);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(dibujarConectores, 100);
    });
  } else {
    setTimeout(dibujarConectores, 100);
  }

  window.dibujarConectores = dibujarConectores;
})();
