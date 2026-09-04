/* ====== NOSOTROS - Consolidated JS ====== */

(function () {
  'use strict';

  function picHTML(base, alt){
    var b = String(base||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
    var a = String(alt||'').replace(/"/g,'&quot;');
    if (window.pictureFor) return window.pictureFor(b, alt);
    return '<picture><source srcset="'+b+'.avif" type="image/avif"><source srcset="'+b+'.webp" type="image/webp"><img src="'+b+'.webp" alt="'+a+'" loading="lazy" onerror="this.onerror=null;this.src=(window.placeHolderImg||\'\')"></picture>';
  }

  /* ── Counter animation ── */
  var counters = document.querySelectorAll(".pres-stats__number");
  if (counters.length) {
    var counted = false;
    function animateCounters() {
      if (counted) return;
      var y = window.pageYOffset || document.documentElement.scrollTop;
      var trigger = counters[0].getBoundingClientRect().top + window.pageYOffset - 400;
      if (y >= trigger) {
        counted = true;
        counters.forEach(function (el) {
          var target = parseInt(el.getAttribute("data-count"), 10);
          var current = 0;
          var step = Math.ceil(target / 60);
          var timer = setInterval(function () {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current + "+";
          }, 25);
        });
      }
    }
    window.addEventListener("scroll", animateCounters);
    animateCounters();
  }

  /* ── Plana Jerárquica ── */
  var jerarquicaContainer = document.getElementById("jerarquica");
  if (jerarquicaContainer) {
    var niveles = {
      1: [
        { cargo: "Dirección General", nombre: "Mg. Alberto Guillermo Villar Paredes", foto: "../imagenes/docentes/Director" }
      ],
      2: [
        { cargo: "Secretaría", nombre: "Srta. Paola Lorena Leon Mendoza", foto: "../imagenes/docentes/Paola_LM" }
      ],
      3: [
        { cargo: "Jefatura del Área de Administración", nombre: "Ing. Segundo Gómez Rosas", foto: "../imagenes/docentes/icon_person" },
        { cargo: "Coordinación Área de Calidad", nombre: "Ing. Ernesto López Pajares", foto: "../imagenes/docentes/ernesto-lopez" },
        { cargo: "Secretaría Académica", nombre: "Ing. Edgard García Diaz", foto: "../imagenes/docentes/edgar_garcia-1" }
      ],
      4: [
        { cargo: "Jefatura de Unidad de Formación Continua", nombre: "Falta-Información", foto: "../imagenes/docentes/icon_person" },
        { cargo: "Jefatura Unidad Académica", nombre: "Ing. José Alberto Villacampa Casas", foto: "../imagenes/docentes/villacampa" },
        { cargo: "Jefatura de Unidad de Bienestar y Empleabilidad", nombre: "Dr. José Pedro Bardales Pairazaman", foto: "../imagenes/docentes/pedro" },
        { cargo: "Jefatura de Unidad de Investigación", nombre: "Lic. Pamela Mantilla Santa Cruz", foto: "../imagenes/docentes/pamela-mantilla" }
      ],
      5: [
        { cargo: "Coordinación Administración de Centros de Cómputo", nombre: "Ing. Albert Henry León Chávez", foto: "../imagenes/docentes/albert-leon" },
        { cargo: "Coordinación Enfermería Técnica", nombre: "Lic. Johanna Nadyr Ucañan Cruz", foto: "../imagenes/docentes/icon_person" },
        { cargo: "Coordinación Producción Agropecuaria", nombre: "Ing. José Luis Alcántara Rodriguez", foto: "../imagenes/docentes/jose_alcantara" }
      ],
      6: [
        { cargo: "Personal Administrativo", nombre: "Sr. Lorenzo Chiclote Diaz", foto: "../imagenes/docentes/lorenzo" },
        { cargo: "Personal Administrativo", nombre: "Sr. Eladio Guerra Toribio", foto: "../imagenes/docentes/icon_person" }
      ]
    };

    var nivelKeys = Object.keys(niveles);
    nivelKeys.forEach(function (nivel, idx) {
      var seccion = document.createElement("section");
      seccion.classList.add("nivel");
      if (idx === 0) seccion.classList.add("nivel--root");
      var cardsDiv = document.createElement("div");
      cardsDiv.classList.add("cards");
      niveles[nivel].forEach(function (persona) {
        var card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = picHTML(persona.foto, persona.nombre) + '<h3>' + persona.cargo + '</h3><p>' + persona.nombre + '</p>';
        cardsDiv.appendChild(card);
      });
      seccion.appendChild(cardsDiv);
      jerarquicaContainer.appendChild(seccion);
    });
  }

  /* ── Plana Docente ── */
  var docenteContainer = document.getElementById("docente");
  if (docenteContainer) {
    var docentesData = [
      {
        area: "Administración de Centros de Cómputo",
        icon: "fas fa-laptop-code",
        docentes: [
          { nombre: "Ing. Albert Henry León Chávez", foto: "../imagenes/docentes/albert-leon", grado: "Ing. en Computación", email: "albert.chavez@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Ernesto López Pajares", foto: "../imagenes/docentes/ernesto-lopez", grado: "Ing. en Computación", email: "ernesto.pajares@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Edgard García Diaz", foto: "../imagenes/docentes/edgar_garcia-1", grado: "Ing. en Computación", email: "edgard.diaz@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Carlos Abilio Angulo Zegarra", foto: "../imagenes/docentes/carlos-angulo", grado: "Ing. en Computación", email: "carlos.zegarra@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Joselí Elías Palomino Ramírez", foto: "../imagenes/docentes/elias_palomino", grado: "Docente", email: "joseli.ramirez@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Walter Abel Alvarez Untul", foto: "../imagenes/docentes/walter", grado: "Ing. Agropecuario", email: "walter.untul@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Claudia Rubio Jiménez", foto: "../imagenes/docentes/claudia-rubio", grado: "Lic. en Enfermería", email: "claudia.jimenez@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" }
        ]
      },
      {
        area: "Enfermería Técnica",
        icon: "fas fa-user-nurse",
        docentes: [
          { nombre: "Lic. Johanna Nadyr Ucañan Cruz", foto: "../imagenes/docentes/icon_person", grado: "Lic. en Enfermería", email: "", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Mg. Marcela Marlene Díaz Carrasco", foto: "../imagenes/docentes/marcela", grado: "Lic. en Enfermería", email: "marcela.carrasco@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Lic. Milagros Araceli Leyva López", foto: "../imagenes/docentes/milagros-leyva", grado: "Lic. en Enfermería", email: "milagros.lopez@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Lic. Pamela Mantilla Santa Cruz", foto: "../imagenes/docentes/pamela-mantilla", grado: "Lic. en Enfermería", email: "pamela.cruz@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Lic. Johana Ysabel Alfaro Alvarez", foto: "../imagenes/docentes/icon_person", grado: "Ing. Agropecuario", email: "", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Lic. Rubí Estacio Lezcano ", foto: "../imagenes/docentes/rubi-removebg-preview", grado: "Lic. en Enfermería", email: "rubi.lezcano@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" }
        ]
      },
      {
        area: "Producción Agropecuaria",
        icon: "fas fa-tractor",
        docentes: [
          { nombre: "Ing. José Luis Alcántara Rodriguez", foto: "../imagenes/docentes/jose_alcantara", grado: "Docente", email: "jose.rodriguez@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. José Alberto Villacampa Casas", foto: "../imagenes/docentes/villacampa", grado: "Ing. Agropecuario", email: "jose.casas@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Mirtha Rosa Mundaca Menchola", foto: "../imagenes/docentes/mirtha-mundaca", grado: "Ing. Agropecuario", email: "mirtha.menchola@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Linda Esther Zavaleta Abanto", foto: "../imagenes/docentes/linda-zavaleta", grado: "Ing. Agropecuario", email: "linda.abanto@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Jorge Luis Ramiro Guevara Vilcas", foto: "../imagenes/docentes/luis.guevara", grado: "Ing. Agropecuario", email: "jorge.vilcas@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Uber Alva Moya", foto: "../imagenes/docentes/icon_person", grado: "Ing. Agropecuario", email: "", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Ing. Segundo Gómez Rosas", foto: "../imagenes/docentes/icon_person", grado: "Ing. Agropecuario", email: "", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Dr. Vet. Marco Antonio Orbegoso Pacheco", foto: "../imagenes/docentes/marco-orbegoso", grado: "Especialista", email: "marco.pacheco@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" }
        ]
      },
      {
        area: "Empleabilidad",
        icon: "fas fa-briefcase",
        docentes: [
          { nombre: "Mg. José Antonio Bacilio Acosta", foto: "../imagenes/docentes/jose-bacilio", grado: "Especialista", email: "jose.acosta@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Lic. María Flores Gutierrez", foto: "../imagenes/docentes/icon_person", grado: "Especialista", email: "", cvUrl: "#", cargaUrl: "#" },
          { nombre: "Dr. José Pedro Bardales Pairazaman", foto: "../imagenes/docentes/pedro", grado: "Especialista", email: "jose.pairazaman@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" }
        ]
      }
    ];

    docentesData.forEach(function (areaObj) {
      var section = document.createElement("section");
      section.classList.add("docente__area");
      var titulo = document.createElement("h2");
      titulo.innerHTML = '<i class="' + areaObj.icon + '"></i> ' + areaObj.area;
      section.appendChild(titulo);
      var grid = document.createElement("div");
      grid.classList.add("docente__grid");
      areaObj.docentes.forEach(function (doc) {
        var card = document.createElement("div");
        card.classList.add("docente__card");
        var gradoHTML = doc.grado ? '<p class="docente__grado">' + doc.grado + '</p>' : '';
        var emailHTML = doc.email ? '<p class="docente__email"><a href="mailto:' + doc.email + '">' + doc.email + '</a></p>' : '';
        var cvBtn = doc.cvUrl ? '<a href="' + doc.cvUrl + '" target="_blank" rel="noopener" class="btn btn--primary"><i class="fas fa-file-alt"></i> Ver CV</a>' : '';
        var cargaBtn = doc.cargaUrl ? '<a href="' + doc.cargaUrl + '" target="_blank" rel="noopener" class="btn btn--secondary"><i class="fas fa-calendar-alt"></i> Ver Carga Académica</a>' : '';
        var actionsHTML = (cvBtn || cargaBtn) ? '<div class="docente__actions">' + cvBtn + cargaBtn + '</div>' : '';
        card.innerHTML = '<div class="docente__pic">' + picHTML(doc.foto, doc.nombre) + '</div><div class="docente__body"><h3>' + doc.nombre + '</h3>' + gradoHTML + emailHTML + actionsHTML + '</div>';
        grid.appendChild(card);
      });
      section.appendChild(grid);
      docenteContainer.appendChild(section);
    });
  }

  /* ── Organigrama Modal ── */
  var orgChart = document.getElementById("org-chart");
  var orgModal = document.getElementById("org-modal");
  var orgModalImg = document.getElementById("org-modal-img");
  var orgModalClose = document.getElementById("org-modal-close");

  function openOrgModal() {
    if (!orgModal || !orgModalImg) return;
    var img = orgChart.querySelector("img");
    if (img) orgModalImg.src = img.src;
    orgModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeOrgModal() {
    if (!orgModal) return;
    orgModal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (orgChart && orgModal) {
    orgChart.addEventListener("click", openOrgModal);
  }

  if (orgModalClose) {
    orgModalClose.addEventListener("click", closeOrgModal);
  }

  if (orgModal) {
    orgModal.addEventListener("click", function (e) {
      if (e.target === orgModal) closeOrgModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && orgModal && orgModal.classList.contains("is-open")) closeOrgModal();
  });

  /* ── Page subnav active link ── */
  if (typeof dibujarConectores === 'function') dibujarConectores();
  var subnavLinks = document.querySelectorAll(".page-subnav__link");
  if (subnavLinks.length) {
    var sections = [];
    subnavLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        var section = document.getElementById(href.slice(1));
        if (section) sections.push({ link: link, section: section });
      }
    });

    function updateActiveLink() {
      var scrollY = window.scrollY + 120;
      var current = null;
      sections.forEach(function (item) {
        var top = item.section.offsetTop;
        var bottom = top + item.section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          current = item.link;
        }
      });
      if (current) {
        subnavLinks.forEach(function (l) { l.classList.remove("is-active"); });
        current.classList.add("is-active");
      }
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    window.addEventListener("load", updateActiveLink);
  }
})();