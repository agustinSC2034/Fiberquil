window.addEventListener("DOMContentLoaded", function () {
  var currentPageLabel = document.getElementById("currentPageLabel");
  var currentPage = location.pathname.split("/").slice(-1)[0]; // Obtiene el nombre del archivo actual

  var dropdownOptions = Array.from(
    document.querySelectorAll(".dropdown-content a")
  );

  dropdownOptions.forEach(function (option) {
    option.addEventListener("click", function (event) {
      event.preventDefault(); // Evita la redirección predeterminada

      var selectedOption = this.getAttribute("data-value");
      currentPageLabel.textContent = "Web: " + selectedOption;
    });
  });
});



// cards dinamicas
function crearCardProducto({ titulo, descripcion, imagen, categoria }) {
  const card = document.createElement('div');
  card.className = 'col-md-4 producto';
  card.setAttribute('data-categoria', categoria.toLowerCase());

  card.innerHTML = `
    <div class="card h-100 shadow-sm producto-hover2">
      <span class="badge bg-secondary position-absolute top-0 start-0 m-2" style="color: white;">${categoria}</span>
      <img src="${imagen}" class="card-img-top p-4" alt="${titulo}">
      <div class="card-body text-center">
        <h5 class="card-title">${titulo}</h5>
        <p class="card-text">${descripcion}</p>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center px-3 py-2 bg-light border-top">
        <span class="text-muted" style="font-size: 14px;">Cotizar ahora</span>
        <div class="d-flex gap-2">
          <a href="docs/producto.pdf" target="_blank" class="btn btn-outline-danger btn-sm" title="Ficha técnica"><i class="fas fa-file-pdf"></i></a>
          <a href="mailto:info@fiberquil.com.ar?subject=Consulta%20de%20producto" class="btn btn-outline-primary btn-sm" title="Enviar mail"><i class="fas fa-envelope"></i></a>
          <button class="btn btn-outline-success btn-sm whatsapp-btn" data-producto="${titulo}" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
        </div>
      </div>
    </div>
  `;
  return card;
}


function cargarProductosDesdeHoja() {
  fetch('https://opensheet.elk.sh/1VZMWOCcW8H7E3iOCCDu5YtR_Xm6AbBKr_O1mfPbvm7g/Hoja%201')
    .then(res => res.json())
    .then(data => {
      console.log("Productos cargados desde la hoja de cálculo:", data);

      const grilla = document.getElementById('grilla-productos');
      data.forEach(producto => {
        const card = crearCardProducto({
          titulo: producto.titulo,
          descripcion: producto.descripcion,
          imagen: producto.imagen_url,
          categoria: producto.categoria
        });
        grilla.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error al cargar los productos:", error);
    });
}


document.addEventListener('DOMContentLoaded', () => {
  cargarProductosDesdeHoja();
});
