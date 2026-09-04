(function () {
  'use strict';

  /* ── Media helpers (AVIF+WEBP) ── */
  var placeHolderImg = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340"><rect width="600" height="340" fill="#efece6"/><g fill="none" stroke="#c4bdb3" stroke-width="10" stroke-linecap="round"><circle cx="300" cy="150" r="40"/><path d="M210 260 q35 -55 90 -55 q40 0 90 55"/></g></svg>');
  // Expose globally for other modules (galeria, noticias, etc.)
  if (typeof window !== 'undefined') window.placeHolderImg = placeHolderImg;

  function escapeHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function pictureFor(base, alt, loading) {
    var b = String(base || '');
    var a = escapeHtml(alt || '');
    var ld = loading || 'lazy';
    var onerror = 'this.onerror=null;this.src=window.placeHolderImg||\'' + placeHolderImg + '\'';
    return '<picture><source srcset="' + b + '.avif" type="image/avif"><source srcset="' + b + '.webp" type="image/webp"><img src="' + b + '.webp" alt="' + a + '" loading="' + ld + '" onerror="' + onerror + '"></picture>';
  }

  function pictureInnerFor(base, alt, loading) {
    var b = String(base || '');
    var a = escapeHtml(alt || '');
    var ld = loading || 'lazy';
    var onerror = 'this.onerror=null;this.src=window.placeHolderImg||\'' + placeHolderImg + '\';console.warn(\'[media] missing avif/webp for\',\'' + b.replace(/'/g,'\\\'') + '\')';
    return '<source srcset="' + b + '.avif" type="image/avif"><source srcset="' + b + '.webp" type="image/webp"><img src="' + b + '.webp" alt="' + a + '" loading="' + ld + '" onerror="' + onerror + '">';
  }

  function imageSetFor(base) {
    var b = String(base || '');
    return 'image-set(url("' + b + '.avif") type("image/avif"), url("' + b + '.webp") type("image/webp"))';
  }

  if (typeof window !== 'undefined') {
    window.pictureFor = pictureFor;
    window.pictureInnerFor = pictureInnerFor;
    window.imageSetFor = imageSetFor;
  }

  /* ── Config from data attributes ── */
  // data-root="" for root index page, data-root="../" for portal/* pages
  //   Root:  links use "portal/xxx/", images use "portal/imagenes/..."
  //   Portal: links use "../xxx/", images use "../imagenes/..."
  // data-home: target for Brand + Inicio links
  //   Root:  "#" or "#inicio"
  //   Portal: "../../" (goes up to site root)

  /* ── Templates ── */
  function headerHTML(root, home) {
    var p = root;
    var i = root + 'imagenes/';
    function socialIcon(kind) {
      var icons = {
        facebook: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
        instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>',
        youtube: '<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
        tiktok: '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.66-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>'
      };
      return '<svg viewBox="0 0 24 24" fill="currentColor">' + (icons[kind] || '') + '</svg>';
    }

    return [
      '<div id="page-loader" class="page-loader"><div class="page-loader__ring"><img src="' + i + 'logo-transp.png" alt="IESTP PAIJÁN" class="page-loader__logo"></div></div>',
      '<header id="site-header" class="header">',
      '<div class="container header__inner">',
      '<a class="brand" href="' + home + '">',
      '<div class="brand__top">',
      '<img src="' + i + 'logo-transp.png" alt="IESTP Paiján" class="brand__img">',
      '<div class="brand__text">',
      '<span class="brand__name">IESTP Paiján</span>',
      '<span class="brand__registration">R.M. N° 498-87-ED</span>',
      '</div>',
      '</div>',
      '<span class="brand__slogan">¡Crea, Innova e Inspira!</span>',
      '</a>',
      '<button id="menu-toggle" class="hamburger" aria-label="Abrir menú" aria-expanded="false">',
      '<span class="hamburger__line"></span>',
      '<span class="hamburger__line"></span>',
      '<span class="hamburger__line"></span>',
      '</button>',
      '<div id="main-nav" class="nav">',
      '<div class="nav__header">',
      '<div class="nav__header-brand">',
      '<img src="' + i + 'logo-transp.png" alt="IESTP Paiján">',
      '<span>IESTP Paiján</span>',
      '</div>',
      '<button class="nav__close" aria-label="Cerrar menú"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>',
      '</div>',
      '<ul class="nav__list">',
      '<li class="nav__item"><a href="' + home + '" class="nav__link" data-page="inicio">' + 'Inicio</a></li>',

      '<li class="nav__item"><a href="' + p + 'nosotros/" class="nav__link" data-page="nosotros">' + 'Nosotros</a></li>',

      '<li class="nav__item"><a href="' + p + 'admision/" class="nav__link" data-page="admision">' + 'Admisión</a></li>',

      '<li class="nav__item"><a href="' + p + 'programas/" class="nav__link" data-page="programas">' + 'Programas</a></li>',
      '<li class="nav__item"><a href="' + p + 'transparencia/" class="nav__link" data-page="transparencia">' + 'Transparencia</a></li>',
      '<li class="nav__item"><a href="' + p + 'servicios/" class="nav__link" data-page="servicios">' + 'Servicios</a></li>',
      '<li class="nav__item"><a href="' + p + 'galeria/" class="nav__link" data-page="galeria">' + 'Galería</a></li>',
      '</ul>',
      '<div class="nav__footer">',
      '<div class="nav__footer-label">Síguenos</div>',
      '<div class="nav__footer-social">',
      '<a href="https://www.facebook.com/iestp.paijan.9" aria-label="Facebook" target="_blank" rel="noopener noreferrer">' + socialIcon('facebook') + '</a>',
      '<a href="https://www.instagram.com/iestpaijan/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">' + socialIcon('instagram') + '</a>',
      '<a href="https://www.youtube.com/@iestppaijan8712" aria-label="YouTube" target="_blank" rel="noopener noreferrer">' + socialIcon('youtube') + '</a>',
      '<a href="https://www.tiktok.com/@iestpaijan" aria-label="TikTok" target="_blank" rel="noopener noreferrer">' + socialIcon('tiktok') + '</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '</header>',
      '<div class="nav-overlay" id="nav-overlay"></div>'
    ].join('\n');
  }

  function footerHTML(root) {
    var p = root;
    var i = root + 'imagenes/';
    return [
      '<footer class="footer">',
      '<div class="container">',
      '<div class="footer__inner">',

      '<div class="footer__col footer__brand">',
      '<div class="footer__brand-top">',
      '<img src="' + i + 'logo-transp.png" alt="IESTP PAIJÁN" class="footer__logo">',
      '<div class="footer__brand-text">',
      '<span class="footer__brand-name">IESTP Paiján</span>',
      '<span class="footer__brand-registration">R.M. N° 498-87-ED</span>',
      '</div>',
      '</div>',
      '<p class="footer__desc">¡Crea, Innova e Inspira!</p>',
      '<div class="footer__contact">',
      '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 919490297</span>',
      '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> admision@iestpaijan.edu.pe</span>',
      '</div>',
      '</div>',

      '<div class="footer__col">',
      '<h4 class="footer__title">Programas</h4>',
      '<ul class="footer__list">',
      '<li><a href="' + p + 'acc/">Administración de Centros de Cómputo</a></li>',
      '<li><a href="' + p + 'enfermeria_tecnica/">Enfermería Técnica</a></li>',
      '<li><a href="' + p + 'pagro/">Producción Agropecuaria</a></li>',
      '</ul>',
      '</div>',

      '<div class="footer__col">',
      '<h4 class="footer__title">Institución</h4>',
      '<ul class="footer__list">',
      '<li><a href="' + p + 'nosotros/">Nosotros</a></li>',
      '<li><a href="' + p + 'admision/">Admisión</a></li>',
      '<li><a href="' + p + 'transparencia/">Transparencia</a></li>',
      '<li><a href="' + p + 'servicios/">Servicios</a></li>',
      '</ul>',
      '</div>',

      '<div class="footer__col">',
      '<h4 class="footer__title">Enlaces</h4>',
      '<ul class="footer__list">',
      '<li><a href="https://registra.minedu.gob.pe/#!/" target="_blank">Registra</a></li>',
      '<li><a href="https://titula.minedu.gob.pe/" target="_blank">Titula</a></li>',
      '<li><a href="https://conecta.minedu.gob.pe/" target="_blank">Conecta</a></li>',
      '<li><a href="https://avanza.minedu.gob.pe/" target="_blank">Avanza</a></li>',
      '</ul>',
      '</div>',

      '</div>',
      '<div class="footer__bottom">',
      '<div class="footer__social">',
      '<a href="https://www.facebook.com/iestp.paijan.9" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>',
      '<a href="https://www.instagram.com/iestpaijan/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>',
      '<a href="https://www.youtube.com/@iestppaijan8712" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>',
      '<a href="https://www.tiktok.com/@iestppaijan" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>',
      '<a href="https://wa.me/51919490297" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>',
      '</div>',
      '<p class="footer__copyright">&copy; <span id="year"></span> <strong>IESTP PAIJÁN</strong> — Todos los derechos reservados</p>',
      '</div>',
      '</div>',
      '</footer>',

      '<button id="to-top" class="to-top" aria-label="Volver arriba"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg></button>',
      '<div class="contact-dial" id="contact-dial" aria-label="Contacto rápido">',
      '  <div class="contact-dial__actions" role="group" aria-label="Opciones de contacto">',
      '    <a href="tel:+51919490297" class="contact-dial__btn contact-dial__btn--call" aria-label="Llamar al 919490297"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span class="contact-dial__tooltip">Llamar</span></a>',
      '    <a href="mailto:admision@iestpaijan.edu.pe" class="contact-dial__btn contact-dial__btn--email" aria-label="Enviar correo a admision@iestpaijan.edu.pe"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span class="contact-dial__tooltip">Email</span></a>',
      '    <a href="https://www.google.com/maps/search/?api=1&query=IESTP%20Paij%C3%A1n%2C%20Calle%20Jes%C3%BAs%20de%20Nazareth%20S%2FN%2C%20AA.HH.%20Los%20Cedros%20Mz.%20A%20Lote%2001%2C%20Paij%C3%A1n%2C%20Ascope%2C%20La%20Libertad%2C%20Per%C3%BA" class="contact-dial__btn contact-dial__btn--location" aria-label="Ver ubicación del IESTP Paiján en Google Maps" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span class="contact-dial__tooltip">Ubicación</span></a>',
      '  </div>',
      '  <a href="https://wa.me/51919490297" class="contact-dial__main" aria-label="Contactar por WhatsApp al 919490297" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>',
      '</div>'
    ].join('\n');
  }

  /* ── Inject header / footer ── */
  function injectShell() {
    var rootEl = document.querySelector('[data-include="shell"]');
    if (!rootEl) return;
    var root = rootEl.getAttribute('data-root') || '';
    var home = rootEl.getAttribute('data-home') || root;
    var page = rootEl.getAttribute('data-page') || '';

    rootEl.insertAdjacentHTML('beforebegin', headerHTML(root, home));
    rootEl.remove();
    document.body.insertAdjacentHTML('beforeend', footerHTML(root));
    // Evita duplicado si index.html ya contiene el dial inline (entregable)
    var dials = document.querySelectorAll('#contact-dial');
    if (dials.length > 1) {
      for (var _i = 1; _i < dials.length; _i++) dials[_i].remove();
    }

    /* ── Highlight active page ── */
    if (page) {
      var parentMap = {
        'acc': 'programas', 'pagro': 'programas', 'enfermeria': 'programas',
        'bienestar_empleabilidad': 'servicios', 'consultorio_psicologico': 'servicios',
        'bolsa_trabajo': 'servicios', 'servicio_topico': 'servicios',
        'documentos_gestion': 'transparencia', 'estadisticas': 'transparencia',
        'donaciones_inversiones': 'transparencia', 'licenciamiento': 'transparencia', 'tupa': 'transparencia',
        'presentacion': 'nosotros', 'mision_vision': 'nosotros', 'resena_historica': 'nosotros',
        'organigrama': 'nosotros', 'plana_jerarquica': 'nosotros', 'planadocente': 'nosotros',
        'nosotros': 'nosotros'
      };
      var finalPage = parentMap[page] || page;
      var sel = 'a[data-page="' + finalPage + '"]';
      var links = document.querySelectorAll(sel);
      var curPath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
      var curHash = window.location.hash;
      var matched = false;
      for (var i = 0; i < links.length; i++) {
        var linkPath = links[i].pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
        if (linkPath === curPath) {
          links[i].classList.add('is-active');
          matched = true;
        }
      }
      if (!matched && parentMap[page]) {
        for (var i = 0; i < links.length; i++) {
          links[i].classList.add('is-active');
        }
      }
    }
  }

  /* ── To-top button ── */
  function initToTop() {
    var btn = document.getElementById('to-top');
    if (!btn) return;
    function toggle() {
      btn.classList.toggle('is-visible', (window.pageYOffset || document.documentElement.scrollTop) > 300);
    }
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
    btn.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  }

  /* ── Page loader (oculto en visitas repetidas) ── */
  function initPageLoader() {
    var l = document.getElementById('page-loader');
    if (!l) return;
    if (sessionStorage.getItem('loaded')) {
      l.classList.add('is-hidden');
    } else {
      sessionStorage.setItem('loaded', '1');
      window.addEventListener('load', function () {
        setTimeout(function () { l.classList.add('is-hidden'); }, 200);
      });
    }
  }

  /* ── Year in footer ── */
  function initYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ── Contact Dial Speed Dial (Buttonizer replica) ── */
  function initContactDial() {
    var dial = document.getElementById('contact-dial');
    if (!dial || dial.dataset.initialized) return;
    dial.dataset.initialized = '1';
    var main = dial.querySelector('.contact-dial__main');
    if (!main) return;
    var toTop = document.getElementById('to-top');
    function syncToTop(){ if(!toTop) return; if(dial.classList.contains('is-open')) toTop.classList.add('to-top--dial-open'); else toTop.classList.remove('to-top--dial-open'); }
    // Observa cambios de clase para sincronizar to-top (cubre hover CSS y touch)
    if(window.MutationObserver){
      new MutationObserver(syncToTop).observe(dial,{attributes:true,attributeFilter:['class']});
    }
    var isTouch = (window.matchMedia && window.matchMedia('(hover: none)').matches) || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (!isTouch) {
      var hideTimer;
      function enter(){ clearTimeout(hideTimer); dial.classList.add('is-open'); syncToTop(); }
      function leave(){ hideTimer=setTimeout(function(){ dial.classList.remove('is-open'); syncToTop(); }, 280); }
      dial.addEventListener('mouseenter', enter);
      dial.addEventListener('mouseleave', leave);
      var actions = dial.querySelector('.contact-dial__actions');
      if (actions){ actions.addEventListener('mouseenter', enter); actions.addEventListener('mouseleave', leave); }
      var dBtns = dial.querySelectorAll('.contact-dial__btn');
      for(var _j=0; _j<dBtns.length; _j++){ dBtns[_j].addEventListener('mouseenter', enter); }
      dial.addEventListener('focusin', enter);
      dial.addEventListener('focusout', function () {
        setTimeout(function () {
          if (!dial.contains(document.activeElement)) { dial.classList.remove('is-open'); syncToTop(); }
        }, 100);
      });
    } else {
      main.addEventListener('click', function (e) {
        if (!dial.classList.contains('is-open')) {
          e.preventDefault();
          e.stopPropagation();
          dial.classList.add('is-open'); syncToTop();
        }
      });
      document.addEventListener('click', function (e) {
        if (!dial.contains(e.target)) { dial.classList.remove('is-open'); syncToTop(); }
      });
      var subBtns = dial.querySelectorAll('.contact-dial__btn');
      for (var i = 0; i < subBtns.length; i++) {
        subBtns[i].addEventListener('click', function () {
          setTimeout(function () { dial.classList.remove('is-open'); syncToTop(); }, 180);
        });
      }
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { dial.classList.remove('is-open'); syncToTop(); }
    });
  }

  /* ── Init ── */
  function run() {
    injectShell();
    initToTop();
    initPageLoader();
    initYear();
    initContactDial();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
