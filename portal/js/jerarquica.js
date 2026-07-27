const niveles = {
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

const contenedor = document.getElementById("jerarquica");

Object.keys(niveles).forEach((nivel, idx) => {
  const seccion = document.createElement("section");
  seccion.classList.add("nivel");

  if (idx === 0) seccion.classList.add("nivel--root");

  const cardsDiv = document.createElement("div");
  cardsDiv.classList.add("cards");

  niveles[nivel].forEach(persona => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${persona.foto}" alt="${persona.nombre}" loading="lazy">
      <h3>${persona.cargo}</h3>
      <p>${persona.nombre}</p>
    `;

    cardsDiv.appendChild(card);
  });

  seccion.appendChild(cardsDiv);
  contenedor.appendChild(seccion);
});

if (typeof dibujarConectores === 'function') dibujarConectores();
