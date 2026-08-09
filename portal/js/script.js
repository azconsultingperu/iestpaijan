if (document.body) {
  document.body.classList.add('js-enabled');
} else {
  document.addEventListener('DOMContentLoaded', () => document.body.classList.add('js-enabled'));
}

function initHeaderNav() {
  var header = document.querySelector('.header');
  var menuToggle = document.querySelector('.hamburger');
  var mainNav = document.querySelector('#main-nav');
  var overlay = document.getElementById('nav-overlay');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  function closeNav() {
    if (!mainNav) return;
    mainNav.classList.remove('is-open');
    mainNav.classList.add('is-closing');
    if (menuToggle) {
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    if (overlay) overlay.classList.remove('is-visible');
    document.body.classList.remove('nav-open');
    document.documentElement.style.overflow = '';
    document.body.style.paddingRight = '';
    window.setTimeout(function () {
      if (mainNav) mainNav.classList.remove('is-closing');
    }, 350);
  }

  function openNav() {
    if (!mainNav) return;
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    mainNav.classList.remove('is-closing');
    mainNav.classList.add('is-open');
    if (menuToggle) {
      menuToggle.classList.add('is-active');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
    if (overlay) overlay.classList.add('is-visible');
    document.body.classList.add('nav-open');
    document.documentElement.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = scrollbarWidth + 'px';
    }
  }

  function toggleNav() {
    if (!mainNav) return;
    if (mainNav.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleNav);
  }

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  var closeButton = document.querySelector('.nav__close');
  if (closeButton) {
    closeButton.addEventListener('click', function (e) {
      e.preventDefault();
      closeNav();
    });
  }

  var navLinks = document.querySelectorAll('#main-nav > .nav__list > .nav__item > a');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
      if (window.innerWidth <= 900) closeNav();
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && mainNav && mainNav.classList.contains('is-open')) {
      closeNav();
    }
  });

  window.addEventListener('hashchange', function () {
    updateHeader();
    if (window.innerWidth <= 900) closeNav();
  });

  window.addEventListener('load', function () {
    setTimeout(updateHeader, 100);
  });
}

// ==============================
// PROGRAMAS (Tabs)
// ==============================
const programButtons = document.querySelectorAll(".programa-btn");
const programDetails = document.querySelectorAll(".programa-detail");

programButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const program = btn.dataset.program;

    programButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    programDetails.forEach((detail) => {
      detail.classList.toggle("is-active", detail.dataset.program === program);
    });
  });
});

// ==============================
// FOOTER YEAR (Safely updated)
// ==============================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ==============================
// SCROLL REVEAL ANIMATION
// ==============================
function initRevealOnScroll() {
  try {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px"
      });
      revealElements.forEach(el => revealObserver.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('is-visible'));
    }
  } catch (err) {
    console.error("Error in revealOnScroll:", err);
  }
}

// ==============================
// NOTICIAS FEED & MODAL
// ==============================
function initNoticias() {
  try {
    const feed = document.getElementById("news-feed");
    if (!feed) return;
    if (feed.children.length > 0) return;

    const isPortalDir = window.location.pathname.includes('/portal/') || window.location.pathname.endsWith('/portal');
    const imgBase = isPortalDir ? 'imagenes/' : 'portal/imagenes/';

const noticias = [
      { titulo: "2do proceso de titulación 2026", fecha: "08/07/2026", contenido: "Inscripciones abiertas para el segundo proceso de titulación 2026. Los interesados deben acercarse a la oficina de administración para recibir mayores detalles e iniciar el proceso de titulación correspondiente.", imagen: [imgBase + "noticias/aviso-2026-1.jpeg", imgBase + "noticias/aviso-2026-1.jpeg"], categoria: "comunicado" },
      { titulo: "Sensible fallecimiento", fecha: "07/05/2026", contenido: "La dirección, docentes y estudiantes expresamos nuestro profundo pesar por la irreparable pérdida de nuestro querido miembro de la comunidad educativa. Paz en su tumba.", imagen: [imgBase + "noticias/fallesimiento_07_05_2026.jpeg", imgBase + "noticias/fallesimiento_07_05_2026.jpeg"], categoria: "comunicado" },
      { titulo: "Día del Trabajador", fecha: "02/05/2026", contenido: "Feliz día del Trabajador a toda nuestra comunidad educativa. Reconocimiento especial a nuestros docentes y personal administrativo que día a día construyen el futuro de nuestros estudiantes.", imagen: [imgBase + "noticias/dia_del_trabajador.jpeg", imgBase + "noticias/dia_del_trabajador.jpeg"], categoria: "evento" },
      { titulo: "Invitación a la Ceremonia de Titulación 2026-1", fecha: "23/04/2026", contenido: "Te invitamos a la ceremonia de titulación 2026-1, un evento especial donde celebraremos el esfuerzo y dedicación de nuestros egresados que culminan exitosamente su formación profesional.", imagen: [imgBase + "noticias/graduacion2026.jpg", imgBase + "noticias/integrantes2026.jpg"], categoria: "evento" },
      { titulo: "Examen de Admisión 2026", fecha: "03/04/2026", contenido: "Prepárate para ingresar al IESTP Paiján. El examen de admisión 2026 está próximo a realizarse. Inscríbete y asegura tu vacante en nuestros programas académicos de alta demanda.", imagen: [imgBase + "admision/primer_admision/1.jpeg"], categoria: "admision" },
      { titulo: "Inicio del Proceso de Admisión 2026-1", fecha: "12/08/2025", contenido: "Ya están abiertas las inscripciones para el Proceso de Admisión 2026-1. No pierdas la oportunidad de formar parte de nuestra institución y construir tu futuro profesional.", imagen: [imgBase + "noticias/inicio_clases20252.jpg"], categoria: "admision" },
    ];

    const placeHolderImg = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340"><rect width="600" height="340" fill="#efece6"/><g fill="none" stroke="#c4bdb3" stroke-width="10" stroke-linecap="round"><circle cx="300" cy="150" r="40"/><path d="M210 260 q35 -55 90 -55 q40 0 90 55"/></g></svg>'
    );

    if (!noticias.length) {
      feed.innerHTML = '<div class="news-feed__empty">Aún no publicamos comunicados. Síguenos en nuestras redes sociales para enterarte de las novedades del IESTP Paiján.</div>';
    }

    const modal = document.getElementById("news-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDate = document.getElementById("modal-date");
    const modalText = document.getElementById("modal-text");
    const modalCategory = document.getElementById("modal-category");
    const closeBtn = document.getElementById("modal-close");
    const prevBtn = document.getElementById("modal-prev");
    const nextBtn = document.getElementById("modal-next");

    let currentArticleIndex = -1;
    let lastFocused = null;

    function getFocusables(container) {
      return Array.prototype.slice.call(container.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select, textarea, iframe, [tabindex]:not([tabindex="-1"])'))
        .filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
    }

    function trapFocus(container, e) {
      var focusables = getFocusables(container);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === container)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function openModal() {
      if (!modal) return;
      lastFocused = document.activeElement;
      modal.classList.add('is-open');
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('is-open');
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function renderCategory(cat) {
      var labels = { evento: "Evento", admision: "Admisión", comunicado: "Comunicado" };
      return '<span class="news-card__category news-card__category--' + cat + '">' + (labels[cat] || cat) + '</span>';
    }

    function renderDateSvg() {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
    }

    function showArticle(index) {
      var article = noticias[index];
      if (!article) return;
      currentArticleIndex = index;
      if (modalImg) modalImg.src = article.imagen[0];
      if (modalTitle) modalTitle.textContent = article.titulo;
      if (modalDate) modalDate.innerHTML = renderDateSvg() + article.fecha;
      if (modalText) modalText.textContent = article.contenido;
      if (modalCategory) {
        var labels = { evento: "Evento", admision: "Admisión", comunicado: "Comunicado" };
        modalCategory.textContent = labels[article.categoria] || article.categoria;
        modalCategory.className = "modal-content__category modal-content__category--" + article.categoria;
      }
    }

    noticias.forEach(function(noticia, index) {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "news-card reveal-on-scroll";
      card.style.setProperty("--i", index);
      card.setAttribute("aria-label", "Ver noticia: " + noticia.titulo);
      card.innerHTML =
        '<div class="news-card__image">' +
          renderCategory(noticia.categoria) +
          '<img src="' + noticia.imagen[0] + '" alt="' + noticia.titulo + '" loading="lazy">' +
        '</div>' +
        '<div class="news-card__content">' +
          '<span class="news-card__date">' + renderDateSvg() + noticia.fecha + '</span>' +
          '<h3 class="news-card__title">' + noticia.titulo + '</h3>' +
          '<p class="news-card__excerpt">' + noticia.contenido + '</p>' +
        '</div>';

      var cardImg = card.querySelector('img');
      if (cardImg) {
        cardImg.addEventListener('error', function () {
          this.onerror = null;
          this.src = placeHolderImg;
        });
      }

      card.addEventListener("click", function() {
        if (!modal) return;
        showArticle(index);
        openModal();
      });

      feed.appendChild(card);
    });

    if (prevBtn) prevBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      if (currentArticleIndex < 0) return;
      showArticle((currentArticleIndex - 1 + noticias.length) % noticias.length);
    });

    if (nextBtn) nextBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      if (currentArticleIndex < 0) return;
      showArticle((currentArticleIndex + 1) % noticias.length);
    });

    if (closeBtn) closeBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      closeModal();
    });

    if (modal) {
      modal.addEventListener("click", function(e) {
        if (e.target === modal) closeModal();
      });
    }

    document.addEventListener("keydown", function(e) {
      if (!modal || !modal.classList.contains('is-open')) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") trapFocus(modal, e);
    });
  } catch (err) {
    console.error("Error in initNoticias:", err);
  }
}

// ==============================
// CONTACTO — CARDS, FORM, TOAST, WHATSAPP
// ==============================
function initContacto() {
  // ── Contact cards click ──
  document.querySelectorAll('.contact-card[data-action]').forEach(function(card) {
    card.addEventListener('click', function(e) {
      var action = card.getAttribute('data-action');
      var value = card.getAttribute('data-value');
      if (!action) return;
      if (action === 'phone') {
        window.location.href = 'tel:' + value;
      } else if (action === 'email') {
        window.location.href = 'mailto:' + value;
      } else if (action === 'address') {
        window.open(value, '_blank', 'noopener,noreferrer');
      }
    });
    // mouse tracker for radial shine
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  // ── Hours badge ──
  var badge = document.querySelector('.hours-badge');
  if (badge) {
    var now = new Date();
    var day = now.getDay();
    var hour = now.getHours();
    var minute = now.getMinutes();
    // Lunes(1)–Viernes(5), 13:00–20:00
    var isOpen = day >= 1 && day <= 5 && (hour > 13 || (hour === 13 && minute >= 0)) && hour < 20;
    badge.textContent = isOpen ? 'Atendiendo hoy' : 'Cerrado';
    badge.className = 'hours-badge ' + (isOpen ? 'is-open' : 'is-closed');
  }

  // ── Toast (notificación no bloqueante) ──
  var toast = document.getElementById('toast-modal');
  var toastClose = document.getElementById('toast-close');
  var toastTimer = null;

  function openToast() {
    if (!toast) return;
    toast.classList.add('is-open');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(closeToast, 4500);
  }

  function closeToast() {
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);
    toast.classList.remove('is-open');
  }

  if (toastClose) toastClose.addEventListener('click', closeToast);
  if (toast) {
    toast.addEventListener('click', function(e) {
      if (e.target === toast) closeToast();
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && toast && toast.classList.contains('is-open')) closeToast();
  });

  // ── Form submission ──
  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('contact-submit');
  var whatsappBtn = document.getElementById('contact-whatsapp-btn');

  var camposRequeridos = ['nombre', 'correo', 'telefono', 'programa'];

  function setCampoError(id, hasError) {
    var input = document.getElementById(id);
    if (!input) return;
    var group = input.closest('.form__group');
    if (group) group.classList.toggle('has-error', hasError);
  }

  function campoValido(id) {
    var input = document.getElementById(id);
    if (!input) return false;
    return input.value.trim() !== '' && input.checkValidity();
  }

  function validarFormulario() {
    var invalidos = [];
    camposRequeridos.forEach(function (id) {
      var ok = campoValido(id);
      setCampoError(id, !ok);
      if (!ok) invalidos.push(id);
    });
    return invalidos;
  }

  function limpiarError(e) {
    var id = e.target && e.target.id;
    if (id && camposRequeridos.indexOf(id) !== -1) setCampoError(id, false);
  }

  function getFormData() {
    var nombre = (document.getElementById('nombre')?.value || '').trim();
    var correo = (document.getElementById('correo')?.value || '').trim();
    var telefono = (document.getElementById('telefono')?.value || '').trim();
    var programa = (document.getElementById('programa')?.value || '').trim();
    var mensaje = (document.getElementById('mensaje')?.value || '').trim();
    return { nombre: nombre, correo: correo, telefono: telefono, programa: programa, mensaje: mensaje };
  }

  function buildWhatsAppUrl(data) {
    var text = 'Hola, soy ' + data.nombre + '.';
    if (data.programa) text += '\nPrograma de interés: ' + data.programa + '.';
    if (data.correo) text += '\nCorreo: ' + data.correo;
    if (data.telefono) text += '\nTeléfono: ' + data.telefono;
    if (data.mensaje) text += '\nMensaje: ' + data.mensaje;
    return 'https://wa.me/51919490297?text=' + encodeURIComponent(text);
  }

  function sendWhatsApp(data) {
    window.open(buildWhatsAppUrl(data), '_blank', 'noopener,noreferrer');
  }

  if (form) {
    form.setAttribute('novalidate', 'novalidate');
    ['input', 'change'].forEach(function (evt) {
      form.addEventListener(evt, limpiarError);
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var invalidos = validarFormulario();
      if (invalidos.length) {
        var first = document.getElementById(invalidos[0]);
        if (first) first.focus();
        return;
      }
      var data = getFormData();
      if (submitBtn) submitBtn.classList.add('is-loading');
      setTimeout(function() {
        if (submitBtn) submitBtn.classList.remove('is-loading');
        sendWhatsApp(data);
        openToast();
        form.reset();
      }, 800);
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
      var invalidos = validarFormulario();
      if (invalidos.length) {
        var first = document.getElementById(invalidos[0]);
        if (first) first.focus();
        return;
      }
      var data = getFormData();
      sendWhatsApp(data);
      openToast();
      form.reset();
    });
  }

  // Expose closeToast globally for inline onclick (fallback)
  window.closeToast = closeToast;
}

function initCounters() {
  var yearsEl = document.getElementById('years-experience');
  if (yearsEl) {
    var years = new Date().getFullYear() - 1987;
    yearsEl.textContent = years;
  }
  var counters = document.querySelectorAll('[data-target]:not([data-counter="manual"])');
  counters.forEach(function(el) {
    var target = el.getAttribute('data-target');
    var suffix = el.getAttribute('data-suffix') || '';
    el.textContent = target + suffix;
  });
}

function runInit() {
  initHeaderNav();
  initNoticias();
  initContacto();
  initRevealOnScroll();
  initCounters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}
