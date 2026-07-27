(function() {
  var counters = document.querySelectorAll('.numero[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var current = 0;
    var inc = Math.max(1, Math.ceil(target / 50));
    var overshoot = Math.ceil(target * 0.08);

    function update() {
      current += inc;
      if (current >= target) {
        el.textContent = target + suffix;
        el.classList.add('is-complete');
        var over = target + overshoot;
        el.textContent = over + suffix;
        setTimeout(function() {
          el.textContent = target + suffix;
          el.classList.add('is-settled');
        }, 120);
        return;
      }
      el.textContent = current;
      requestAnimationFrame(update);
    }
    update();
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(c) { observer.observe(c); });
})();
