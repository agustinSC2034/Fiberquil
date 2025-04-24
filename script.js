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



// Crea una card de producto
function crearCardProducto({ titulo, descripcion, imagen_url, categoria }) {
  const card = document.createElement('div');
  card.className = 'col-md-4 producto fade-in';
  card.setAttribute('data-categoria', categoria.toLowerCase());

  card.innerHTML = `
    <div class="card h-100 shadow-sm producto-hover2">
      <span class="badge bg-secondary position-absolute top-0 start-0 m-2">${categoria}</span>
      <img src="${imagen_url}" class="card-img-top p-4" alt="${titulo}">
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

// Lee la hoja de cálculo como CSV y crea las cards
function cargarProductosDesdeHoja() {
  fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQyuAWxbl2yIUaMFIWE1PIJxUslJ7ZOYey5ohumQ3njSszVPl9Tqeo0ULYtQNMDXVhTJ568Pg7igN7R/pub?output=csv')
    .then(response => response.text())
    .then(csv => {
      const filas = csv.trim().split('\n').slice(1); // Salta el encabezado
      const productos = filas.map(fila => {
        const [titulo, descripcion, imagen_url, categoria] = fila.split(',');
        return { titulo, descripcion, imagen_url, categoria };
      });

      console.log("📦 Productos cargados desde la hoja de cálculo:", productos);

      const grilla = document.getElementById('grilla-productos');
      productos.forEach(producto => {
        const card = crearCardProducto(producto);
        grilla.appendChild(card);
      });
    })
    .catch(error => {
      console.error("❌ Error al cargar los productos:", error);
    });
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', () => {
  cargarProductosDesdeHoja();
});
