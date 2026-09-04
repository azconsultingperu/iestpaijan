// Datos de las actividades psicológicas
const psicologicoData = [
  {
    año: "2025",
    imagenes: [
      "../imagenes/sevicio_psicologico/1_2025",
      "../imagenes/sevicio_psicologico/2_2025"
      //"../img/psicologico_2025_3"
    ],
    descripcion: "Talleres y  sesiones de acompañamiento emocional para estudiantes."
  },
  /*
  {
    año: "2024",
    imagenes: [
      "../img/psicologico_2024_1",
      "../img/psicologico_2024_2"
    ],
    descripcion: "Campañas de prevención del estrés académico y actividades de integración familiar."
  },
  {
    año: "2023",
    imagenes: [
      "../img/psicologico_2023_1"
    ],
    descripcion: "Programas de desarrollo personal, manejo de ansiedad y charlas de motivación."
  }*/
];

function picHTML(base, alt){
  var b = String(base||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
  var a = String(alt||'').replace(/"/g,'&quot;');
  if (window.pictureFor) return window.pictureFor(b, alt);
  return '<picture><source srcset="'+b+'.avif" type="image/avif"><source srcset="'+b+'.webp" type="image/webp"><img src="'+b+'.webp" alt="'+a+'" loading="lazy" onerror="this.onerror=null;this.src=(window.placeHolderImg||\'\')"></picture>';
}
// Contenedor donde se insertarán las tarjetas
const album = document.getElementById("album");
const modal = document.getElementById("modalGaleria");
const modalImagen = document.getElementById("modalImagen");
const modalDescripcion = document.getElementById("modalDescripcion");
const modalMiniaturas = document.getElementById("modalMiniaturas");
const cerrar = document.querySelector(".cerrar");

// Generar dinámicamente las tarjetas
psicologicoData.forEach((item, index) => {
  const card = document.createElement("div");
  card.classList.add("album-card");

  // Usamos la primera imagen como portada
  var base0 = String(item.imagenes[0]||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
  card.innerHTML = `
    ${picHTML(base0, "Consultorio Psicológico " + item.año)}
    <div class="album-info">
      <h3>Consultorio Psicológico ${item.año}</h3>
      <p>${item.descripcion}</p>
    </div>
  `;

  // Evento para abrir el modal
  card.addEventListener("click", () => {
    mostrarModal(item);
  });

  album.appendChild(card);
});

// Función para mostrar modal
function mostrarModal(item) {
  modal.style.display = "flex";
  var base0 = String(item.imagenes[0]||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
  modalImagen.src = base0 + ".webp";
  modalImagen.onerror = function(){ if(this.src.endsWith('.webp')){ this.onerror=null; this.src=base0+".avif"; } else if(window.placeHolderImg){ this.onerror=null; this.src=window.placeHolderImg; }};
  modalDescripcion.textContent = item.descripcion;

  // Limpiar miniaturas previas
  modalMiniaturas.innerHTML = "";

  // Crear miniaturas
  item.imagenes.forEach(img => {
    var b = String(img||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
    var thumbWrap = document.createElement("div");
    thumbWrap.innerHTML = picHTML(b, "Miniatura");
    var thumb = thumbWrap.querySelector("img") || document.createElement("img");
    // Keep click handling on the img
    thumb.addEventListener("click", () => {
      modalImagen.src = b + ".webp";
      modalImagen.onerror = function(){ if(this.src.endsWith('.webp')){ this.onerror=null; this.src=b+".avif"; }};
    });
    // Append the full picture if available, else just img
    if (thumbWrap.firstChild && thumbWrap.firstChild.tagName === 'PICTURE') modalMiniaturas.appendChild(thumbWrap.firstChild);
    else modalMiniaturas.appendChild(thumb);
  });
}

// Cerrar modal
cerrar.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
