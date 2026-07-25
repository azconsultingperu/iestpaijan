(function() {
  var modal   = document.getElementById('becaModal');
  var iframe  = document.getElementById('becaIframe');
  var close   = modal.querySelector('.modal__close');

  document.querySelectorAll('.becas__lista button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      iframe.src = this.getAttribute('data-pdf');
      modal.style.display = 'flex';
    });
  });

  close.addEventListener('click', function() {
    modal.style.display = 'none';
    iframe.src = '';
  });

  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      iframe.src = '';
    }
  });
})();
