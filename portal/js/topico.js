// Datos del servicio de Tópico
const topicoData = [
  {
    año: "2025",
    imagenes: [
      "../imagenes/servicio_topico/2025/2",
      "../imagenes/servicio_topico/2025/5",
      "../imagenes/servicio_topico/2025/10",
      "../imagenes/servicio_topico/2025/11",
      "../imagenes/servicio_topico/2025/13",
      "../imagenes/servicio_topico/2025/17",
      "../imagenes/servicio_topico/2025/19",
      "../imagenes/servicio_topico/2025/20",
    ],
    descripcion: "Atención médica básica, primeros auxilios y campañas de salud preventiva para estudiantes."
  },
  /*
  {
    año: "2024",
    imagenes: [
      "../img/topico_2024_1",
      "../img/topico_2024_2"
    ],
    descripcion: "Charlas de salud, vacunación y control médico general."
  }*/
];

function picHTML(base, alt){
  var b = String(base||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
  var a = String(alt||'').replace(/"/g,'&quot;');
  if (window.pictureFor) return window.pictureFor(b, alt);
  return '<picture><source srcset="'+b+'.avif" type="image/avif"><source srcset="'+b+'.webp" type="image/webp"><img src="'+b+'.webp" alt="'+a+'" loading="lazy" onerror="this.onerror=null;this.src=(window.placeHolderImg||\'\')"></picture>';
}
const listaTopico = document.getElementById("topico-lista");
const modalTopico = document.getElementById("modalTopico");
const modalTopicoImg = document.getElementById("modalTopicoImagen");
const modalTopicoDesc = document.getElementById("modalTopicoDescripcion");
const modalTopicoMiniaturas = document.getElementById("modalTopicoMiniaturas");
const cerrarTopico = modalTopico.querySelector(".cerrar");

// Generar tarjetas
topicoData.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("card");

  var base0 = String(item.imagenes[0]||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
  card.innerHTML = `
    ${picHTML(base0, "Servicio Tópico " + item.año)}
    <h3>${item.año}</h3>
    <p>${item.descripcion}</p>
  `;

  card.addEventListener("click", () => {
    openModalTopico(item);
  });

  listaTopico.appendChild(card);
});

// Abrir modal
function openModalTopico(item) {
  modalTopico.style.display = "flex";
  var base0 = String(item.imagenes[0]||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
  modalTopicoImg.src = base0 + ".webp";
  modalTopicoImg.onerror = function(){ if(this.src.endsWith('.webp')){ this.onerror=null; this.src=base0+".avif"; } else if(window.placeHolderImg){ this.onerror=null; this.src=window.placeHolderImg; }};
  modalTopicoDesc.textContent = item.descripcion;

  // miniaturas
  modalTopicoMiniaturas.innerHTML = "";
  item.imagenes.forEach(img => {
    var b = String(img||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
    var wrap = document.createElement("div");
    wrap.innerHTML = picHTML(b, "Miniatura");
    var thumb = wrap.querySelector("img") || document.createElement("img");
    thumb.addEventListener("click", () => {
      modalTopicoImg.src = b + ".webp";
      modalTopicoImg.onerror = function(){ if(this.src.endsWith('.webp')){ this.onerror=null; this.src=b+".avif"; }};
    });
    if (wrap.firstChild && wrap.firstChild.tagName === 'PICTURE') modalTopicoMiniaturas.appendChild(wrap.firstChild);
    else modalTopicoMiniaturas.appendChild(thumb);
  });
}

// Cerrar modal
cerrarTopico.addEventListener("click", () => {
  modalTopico.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modalTopico) {
    modalTopico.style.display = "none";
  }
});
