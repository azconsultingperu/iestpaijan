function picHTML(base, alt){
  var b = String(base||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
  var a = String(alt||'').replace(/"/g,'&quot;');
  if (window.pictureFor) return window.pictureFor(b, alt);
  return '<picture><source srcset="'+b+'.avif" type="image/avif"><source srcset="'+b+'.webp" type="image/webp"><img src="'+b+'.webp" alt="'+a+'" loading="lazy" onerror="this.onerror=null;this.src=(window.placeHolderImg||\'\')"></picture>';
}

const docentesData = [
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
      { nombre: "Lic. Rubí Estacio Lezcano ", foto: "../imagenes/docentes/rubi-removebg-preview", grado: "Lic. en Enfermería", email: "rubi.lezcano@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
      
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
      { nombre: "Dr. Vet. Marco Antonio Orbegoso Pacheco", foto: "../imagenes/docentes/marco-orbegoso", grado: "Especialista", email: "marco.pacheco@iestpaijan.edu.pe", cvUrl: "#", cargaUrl: "#" },
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

// Render dinámico
const contenedor = document.getElementById("docente");

docentesData.forEach(areaObj => {
  // Sección de área
  const section = document.createElement("section");
  section.classList.add("docente__area");

  const titulo = document.createElement("h2");
  titulo.innerHTML = `<i class="${areaObj.icon}"></i> ${areaObj.area}`;
  section.appendChild(titulo);

  // Grid de docentes
  const grid = document.createElement("div");
  grid.classList.add("docente__grid");

  areaObj.docentes.forEach(doc => {
    const card = document.createElement("div");
    card.classList.add("docente__card");

    var gradoHTML = doc.grado ? `<p class="docente__grado">${doc.grado}</p>` : '';
    var emailHTML = doc.email ? `<p class="docente__email"><a href="mailto:${doc.email}">${doc.email}</a></p>` : '';
    var cvBtn = doc.cvUrl ? `<a href="${doc.cvUrl}" target="_blank" rel="noopener" class="btn btn--primary"><i class="fas fa-file-alt"></i> Ver CV</a>` : '';
    var cargaBtn = doc.cargaUrl ? `<a href="${doc.cargaUrl}" target="_blank" rel="noopener" class="btn btn--secondary"><i class="fas fa-calendar-alt"></i> Ver Carga Académica</a>` : '';
    var actionsHTML = (cvBtn || cargaBtn) ? `<div class="docente__actions">${cvBtn}${cargaBtn}</div>` : '';

    card.innerHTML = `
      <div class="docente__pic">${picHTML(doc.foto, doc.nombre)}</div>
      <div class="docente__body">
        <h3>${doc.nombre}</h3>
        ${gradoHTML}
        ${emailHTML}
        ${actionsHTML}
      </div>
    `;

    grid.appendChild(card);
  });

  section.appendChild(grid);
  contenedor.appendChild(section);
});
