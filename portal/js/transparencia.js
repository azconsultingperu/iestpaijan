(function() {
  var counters = document.querySelectorAll('.numero[data-target]');
  if (!counters.length) return;

  var speed = 30;

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var current = 0;
    var increment = Math.ceil(target / 50);

    function update() {
      current += increment;
      if (current >= target) {
        el.textContent = target;
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
