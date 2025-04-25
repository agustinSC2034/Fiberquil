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
      <span class="badge bg-secondary text-white position-absolute top-0 start-0 m-2">${categoria}</span>
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

// Lee la hoja como JSON y crea las cards
function cargarProductosDesdeHoja() {
  fetch('https://opensheet.elk.sh/1Z_Zh8S5AtG5F2JgMspvt4oNeQ2-6-82lRCjmNZ9wEh4/Hoja%201')
    .then(response => response.json())
    .then(productos => {
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
    aplicarLogicaDeFiltros();
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', () => {
  cargarProductosDesdeHoja();
});

function aplicarLogicaDeFiltros() {
  const buscador = document.getElementById('buscador-productos');
  const botonesCategoria = document.querySelectorAll('.categoria-btn');
  const listaMobile = document.getElementById('listaCategoriasMobile');
  const filtroMobileTexto = document.getElementById('filtroSeleccionadoMobile');
  const productosPorPagina = 6;
  const paginacionContainer = document.querySelector("#paginacion-productos ul");

  let categoriaActual = "todos";
  let paginaActual = 1;

  // Filtro por categoría
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('categoria-btn')) {
      e.preventDefault();
      categoriaActual = e.target.dataset.categoria;
      paginaActual = 1;

      document.querySelectorAll('.categoria-btn').forEach(btn => btn.classList.remove('active-categoria'));
      e.target.classList.add('active-categoria');

      if (window.innerWidth < 768 && listaMobile) {
        listaMobile.style.display = 'none';
      }

      if (filtroMobileTexto) {
        filtroMobileTexto.textContent = `Mostrando: ${e.target.textContent.trim()}`;
      }

      mostrarPaginaFiltrada();
    }
  });

  // Filtro por búsqueda
  buscador.addEventListener('input', () => {
    paginaActual = 1;
    mostrarPaginaFiltrada();
  });

  function obtenerProductosFiltrados() {
    const texto = buscador.value.toLowerCase();
    return Array.from(document.querySelectorAll('.producto')).filter(prod => {
      const perteneceCategoria = categoriaActual === "todos" || prod.dataset.categoria === categoriaActual;
      const coincideBusqueda = prod.querySelector('.card-title').textContent.toLowerCase().includes(texto);
      return perteneceCategoria && coincideBusqueda;
    });
  }

  function mostrarPaginaFiltrada() {
    const productos = obtenerProductosFiltrados();
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    document.querySelectorAll('.producto').forEach(p => {
      p.style.display = 'none';
      p.classList.remove('fade-in');
    });

    productos.slice(inicio, fin).forEach((p, index) => {
      p.style.display = 'block';
      setTimeout(() => p.classList.add('fade-in'), 50 + index * 50);
    });

    actualizarPaginacion(productos.length);
  }

  function actualizarPaginacion(total) {
    const totalPaginas = Math.ceil(total / productosPorPagina);
    paginacionContainer.innerHTML = '';

    if (total === 0) {
      paginacionContainer.innerHTML = '<li class="page-item disabled"><span class="page-link">Sin resultados</span></li>';
      return;
    }

    for (let i = 1; i <= totalPaginas; i++) {
      const li = document.createElement('li');
      li.className = 'page-item' + (i === paginaActual ? ' active' : '');
      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.textContent = i;
      a.addEventListener('click', e => {
        e.preventDefault();
        paginaActual = i;
        mostrarPaginaFiltrada();
      });
      li.appendChild(a);
      paginacionContainer.appendChild(li);
    }
  }

  mostrarPaginaFiltrada();
}

