 const noticias = [
      {
        titulo: "2do proceso de titulación 2026",
        fecha: "08/07/2026",
        contenido: "La dirección, docentes y estudiantes y personal administrativo expresamos nuestro profundo pesar por el sensible fallesimiento de nuestro querido estudiante del programa de Administración de Centros de Computo",
        imagen: ["../imagenes/noticias/aviso-2026-1", "../imagenes/noticias/aviso-2026-1"]
      },
      {
        titulo: "Sensible fallesimiento",
        fecha: "07/05/2026",
        contenido: "La dirección, docentes y estudiantes y personal administrativo expresamos nuestro profundo pesar por el sensible fallesimiento de nuestro querido estudiante del programa de Administración de Centros de Computo",
        imagen: ["../imagenes/noticias/fallesimiento_07_05_2026", "../imagenes/noticias/fallesimiento_07_05_2026"]
      },
      {
        titulo: "Día del Trabajador",
        fecha: "02/05/2026",
        contenido: "Feliz día del Trabajador",
        imagen: ["../imagenes/noticias/dia_del_trabajador", "../imagenes/noticias/dia_del_trabajador"]        
      },   
      {
        titulo: "Invitación a la Ceremonia de Titulación 2026-1",
        fecha: "23/04/2026",
        contenido: "Te invitamos a la ceremonia de titulación. Confirma tu asistencia: https://forms.gle/pbfKNJV11NG71pPz5",
        imagen: ["../imagenes/noticias/graduacion2026", "../imagenes/noticias/integrantes2026"]
      },
      {
        titulo: "Examén de Admisión",
        fecha: "03/04/2026",
        contenido: "Preparate para ingresar!",
        imagen: ["../imagenes/admision/primer_admision/1"]
      },
      {
        titulo: "Inicio del Proceso de Admisión 2026-1",
        fecha: "12/08/2025",
        contenido: "Ya están abiertas las inscripciones para el proceso de admisión 2026. Inicio de clases 06/04/2026",
        imagen: ["../imagenes/noticias/inicio_clases20252"]
      },
    ];

    const feed = document.getElementById("news-feed");
    if (!feed) { console.warn("noticias.js: #news-feed no encontrado"); } else {
    const modal = document.getElementById("news-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDate = document.getElementById("modal-date");
    const modalText = document.getElementById("modal-text");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentImages = [];
    let currentIndex = 0;

    function toBaseN(src){ return String(src||'').replace(/\.(jpe?g|png|avif|webp)$/i,''); }
    noticias.forEach(noticia => {
      const card = document.createElement("div");
      card.classList.add("news-card");
      var baseN = toBaseN(noticia.imagen[0]);
      var altN = String(noticia.titulo).replace(/"/g,'&quot;');
      var picN = (window.pictureFor ? window.pictureFor(baseN, noticia.titulo) : '<picture><source srcset="' + baseN + '.avif" type="image/avif"><source srcset="' + baseN + '.webp" type="image/webp"><img src="' + baseN + '.webp" alt="' + altN + '" class="news-img" loading="lazy"></picture>');
      card.innerHTML = `
        ${picN}
        <div class="news-content">
          <h3>${noticia.titulo}</h3>
          <span class="news-date">${noticia.fecha}</span>
          <p>${noticia.contenido}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
        currentImages = noticia.imagen;
        currentIndex = 0;
        showImage(currentIndex);
        modalTitle.textContent = noticia.titulo;
        modalDate.textContent = noticia.fecha;
        modalText.textContent = noticia.contenido;
      });

      feed.appendChild(card);
    });

    function showImage(index) {
      if (currentImages && currentImages[index]) {
        var b = toBaseN(currentImages[index]);
        var mp = modalImg.closest ? modalImg.closest("picture") : null;
        if (mp) {
          var av = mp.querySelector('source[type="image/avif"]');
          var wv = mp.querySelector('source[type="image/webp"]');
          if (av) av.srcset = b + ".avif";
          if (wv) wv.srcset = b + ".webp";
        }
        modalImg.src = b + ".webp";
        modalImg.onerror = function(){ if(this.src.endsWith('.webp')){ this.onerror=null; this.src=b+".avif"; } else if(window.placeHolderImg){ this.onerror=null; this.src=window.placeHolderImg; }};
      }
    }

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      showImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % currentImages.length;
      showImage(currentIndex);
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
    }
