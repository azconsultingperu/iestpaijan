/* ====== NOSOTROS - Consolidated JS ====== */

(function () {
  'use strict';

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
        { cargo: "Dirección General", nombre: "Mg. Alberto Guillermo Villar Paredes", foto: "../imagenes/docentes/Director.png" }
      ],
      2: [
        { cargo: "Secretaría", nombre: "Srta. Paola Lorena Leon Mendoza", foto: "../imagenes/docentes/Paola_LM.jpg" }
      ],
      3: [
        { cargo: "Jefatura del Área de Administración", nombre: "Ing. Segundo Gómez Rosas", foto: "../imagenes/docentes/icon_person.jpg" },
        { cargo: "Coordinación Área de Calidad", nombre: "Ing. Ernesto López Pajares", foto: "../imagenes/docentes/ernesto-lopez.png" },
        { cargo: "Secretaría Académica", nombre: "Ing. Edgard García Diaz", foto: "../imagenes/docentes/edgar_garcia-1.png" }
      ],
      4: [
        { cargo: "Jefatura de Unidad de Formación Continua", nombre: "Falta-Información", foto: "../imagenes/docentes/icon_person.jpg" },
        { cargo: "Jefatura Unidad Académica", nombre: "Ing. José Alberto Villacampa Casas", foto: "../imagenes/docentes/villacampa.jpg" },
        { cargo: "Jefatura de Unidad de Bienestar y Empleabilidad", nombre: "Dr. José Pedro Bardales Pairazaman", foto: "../imagenes/docentes/pedro.jpeg" },
        { cargo: "Jefatura de Unidad de Investigación", nombre: "Lic. Pamela Mantilla Santa Cruz", foto: "../imagenes/docentes/pamela-mantilla.jpeg" }
      ],
      5: [
        { cargo: "Coordinación Administración de Centros de Cómputo", nombre: "Ing. Albert Henry León Chávez", foto: "../imagenes/docentes/albert-leon.jpg" },
        { cargo: "Coordinación Enfermería Técnica", nombre: "Lic. Johanna Nadyr Ucañan Cruz", foto: "../imagenes/docentes/icon_person.jpg" },
        { cargo: "Coordinación Producción Agropecuaria", nombre: "Ing. José Luis Alcántara Rodriguez", foto: "../imagenes/docentes/jose_alcantara.png" }
      ],
      6: [
        { cargo: "Personal Administrativo", nombre: "Sr. Lorenzo Chiclote Diaz", foto: "../imagenes/docentes/lorenzo.jpeg" },
        { cargo: "Personal Administrativo", nombre: "Sr. Eladio Guerra Toribio", foto: "../imagenes/docentes/icon_person.jpg" }
      ]
    };

    Object.keys(niveles).forEach(function (nivel) {
      var seccion = document.createElement("section");
      seccion.classList.add("nivel");
      var titulo = document.createElement("h2");
      seccion.appendChild(titulo);
      var cardsDiv = document.createElement("div");
      cardsDiv.classList.add("cards");
      niveles[nivel].forEach(function (persona) {
        var card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = '<img src="' + persona.foto + '" alt="' + persona.nombre + '"><h3>' + persona.cargo + '</h3><p>' + persona.nombre + '</p>';
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
          { nombre: "Ing. Albert Henry León Chávez", foto: "../imagenes/docentes/albert-leon.jpg" },
          { nombre: "Ing. Ernesto López Pajares", foto: "../imagenes/docentes/ernesto-lopez.png" },
          { nombre: "Ing. Edgard García Diaz", foto: "../imagenes/docentes/edgar_garcia-1.png" },
          { nombre: "Ing. Carlos Abilio Angulo Zegarra", foto: "../imagenes/docentes/carlos-angulo.jpg" },
          { nombre: "Ing. Joselí Elías Palomino Ramírez", foto: "../imagenes/docentes/elias_palomino.jpeg" },
          { nombre: "Ing. Walter Abel Alvarez Untul", foto: "../imagenes/docentes/walter.jpg" },
          { nombre: "Ing. Claudia Rubio Jiménez", foto: "../imagenes/docentes/claudia-rubio.jpeg" }
        ]
      },
      {
        area: "Enfermería Técnica",
        icon: "fas fa-user-nurse",
        docentes: [
          { nombre: "Lic. Johanna Nadyr Ucañan Cruz", foto: "../imagenes/docentes/icon_person.jpg" },
          { nombre: "Mg. Marcela Marlene Díaz Carrasco", foto: "../imagenes/docentes/marcela.jpeg" },
          { nombre: "Lic. Milagros Araceli Leyva López", foto: "../imagenes/docentes/milagros-leyva.jpeg" },
          { nombre: "Lic. Pamela Mantilla Santa Cruz", foto: "../imagenes/docentes/pamela-mantilla.jpeg" },
          { nombre: "Lic. Johana Ysabel Alfaro Alvarez", foto: "../imagenes/docentes/icon_person.jpg" },
          { nombre: "Lic. Rubí Estacio Lezcano ", foto: "../imagenes/docentes/rubi-removebg-preview.png" }
        ]
      },
      {
        area: "Producción Agropecuaria",
        icon: "fas fa-tractor",
        docentes: [
          { nombre: "Ing. José Luis Alcántara Rodriguez", foto: "../imagenes/docentes/jose_alcantara.png" },
          { nombre: "Ing. José Alberto Villacampa Casas", foto: "../imagenes/docentes/villacampa.jpg" },
          { nombre: "Ing. Mirtha Rosa Mundaca Menchola", foto: "../imagenes/docentes/mirtha-mundaca.png" },
          { nombre: "Ing. Linda Esther Zavaleta Abanto", foto: "../imagenes/docentes/linda-zavaleta.jpeg" },
          { nombre: "Ing. Jorge Luis Ramiro Guevara Vilcas", foto: "../imagenes/docentes/luis.guevara.jpeg" },
          { nombre: "Ing. Uber Alva Moya", foto: "../imagenes/docentes/icon_person.jpg" },
          { nombre: "Ing. Segundo Gómez Rosas", foto: "../imagenes/docentes/icon_person.jpg" },
          { nombre: "Dr. Vet. Marco Antonio Orbegoso Pacheco", foto: "../imagenes/docentes/marco-orbegoso.jpeg" }
        ]
      },
      {
        area: "Empleabilidad",
        icon: "fas fa-briefcase",
        docentes: [
          { nombre: "Mg. José Antonio Bacilio Acosta", foto: "../imagenes/docentes/jose-bacilio.jpeg" },
          { nombre: "Lic. María Flores Gutierrez", foto: "../imagenes/docentes/icon_person.jpg" },
          { nombre: "Dr. José Pedro Bardales Pairazaman", foto: "../imagenes/docentes/pedro.jpeg" }
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
        card.innerHTML = '<img src="' + doc.foto + '" alt="' + doc.nombre + '"><h3>' + doc.nombre + '</h3>';
        grid.appendChild(card);
      });
      section.appendChild(grid);
      docenteContainer.appendChild(section);
    });
  }

})();