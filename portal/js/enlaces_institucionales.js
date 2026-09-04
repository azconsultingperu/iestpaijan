function picHTML(base, alt){
  var b = String(base||'').replace(/\.(jpe?g|png|avif|webp)$/i,'');
  var a = String(alt||'').replace(/"/g,'&quot;');
  if (window.pictureFor) return window.pictureFor(b, alt);
  return '<picture><source srcset="'+b+'.avif" type="image/avif"><source srcset="'+b+'.webp" type="image/webp"><img src="'+b+'.webp" alt="'+a+'" loading="lazy" onerror="this.onerror=null;this.src=(window.placeHolderImg||\'\')"></picture>';
}
document.addEventListener("DOMContentLoaded", () => {
  const enlacesData = [
    {
      titulo: "Conecta",
      descripcion: "Sistema de seguimiento de egresados",
      imagen: "../imagenes/enlaces_insti/conecta",
      url: "https://conecta.minedu.gob.pe/"
    },
    {
      titulo: "Registra",
      descripcion: "Sistema de gestión académica",
      imagen: "../imagenes/enlaces_insti/registra",
      url: "https://registra.minedu.gob.pe/#!/"
    },
    {
      titulo: "Consulta Grados y Títulos",
      descripcion: "Ministerio de Educación - Gob.pe",
      imagen: "../imagenes/enlaces_insti/grados_titulos",
      url: "https://titulosinstitutos.minedu.gob.pe/"
    },
    {
      titulo: "Titula",
      descripcion: "Sistema de grados y títulos",
      imagen: "../imagenes/enlaces_insti/titula_2",
      url: "https://titula.minedu.gob.pe/"
    }
  ];

  const contenedor = document.getElementById("enlaces_institucionales");

  let html = `<h2></h2>
              <div class="enlaces-grid">`;

  enlacesData.forEach(enlace => {
    html += `
      <div class="enlace-card">
        ${picHTML(enlace.imagen, enlace.titulo)}
        <h3>${enlace.titulo}</h3>
        <p>${enlace.descripcion}</p>
        <a href="${enlace.url}" target="_blank" rel="noopener noreferrer">Ir a la Página >></a>
      </div>
    `;
  });

  html += `</div>`;
  contenedor.innerHTML = html;
});
