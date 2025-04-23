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

// File: products.html
  document.querySelectorAll('.categoria-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      // Remover clase activa de todos
      document.querySelectorAll('.categoria-btn').forEach(b => b.classList.remove('active-categoria'));

      // Activar el clickeado
      this.classList.add('active-categoria');

      const categoria = this.dataset.categoria;

      // Mostrar/ocultar productos
      document.querySelectorAll('.producto').forEach(prod => {
        if (categoria === 'todos' || prod.dataset.categoria === categoria) {
          prod.style.display = 'block';
        } else {
          prod.style.display = 'none';
        }
      });
    });
  });
