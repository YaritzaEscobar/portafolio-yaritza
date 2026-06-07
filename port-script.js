// =========================
// NAVEGACIÓN SPA
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const enlaces = document.querySelectorAll(".navegacion nav a, .nav-movil a");
  const secciones = document.querySelectorAll(".pagina");

  function mostrarSeccion(id) {
    // Oculta todas las secciones
    secciones.forEach((seccion) => {
      seccion.classList.remove("activa");
    });

    // Muestra la sección seleccionada
    const seccionActiva = document.getElementById(id);
    if (seccionActiva) {
      seccionActiva.classList.add("activa");
    }

    // Actualiza enlace activo
    enlaces.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === "#" + id) {
        link.classList.add("active");
      }
    });

    // Guarda la sección en localStorage
    localStorage.setItem("seccionActiva", id);
  }

  // Eventos de navegación
  enlaces.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const href = link.getAttribute("href");
      if (!href) return;

      const id = href.replace("#", "");

      mostrarSeccion(id);
      history.pushState(null, null, href);

      // Cierra menú móvil
      const navMovil = document.getElementById("navMovil");
      const btnHamburguesa = document.getElementById("btnHamburguesa");
      if (navMovil) navMovil.classList.remove("activo");
      if (btnHamburguesa) btnHamburguesa.classList.remove("activo");
    });
  });

  // Cargar sección inicial
  let seccionInicial = window.location.hash.replace("#", "");
  if (!seccionInicial) {
    seccionInicial = localStorage.getItem("seccionActiva");
  }
  if (!seccionInicial || !document.getElementById(seccionInicial)) {
    seccionInicial = "inicio";
  }

  mostrarSeccion(seccionInicial);

  // Manejar botones atrás/adelante
  window.addEventListener("popstate", () => {
    let id = window.location.hash.replace("#", "");
    if (!id || !document.getElementById(id)) {
      id = "inicio";
    }
    mostrarSeccion(id);
  });
});

// =========================
// GUARDAR SECCIÓN (para proyectos internos)
// =========================
function guardarSeccion(seccion) {
  localStorage.setItem("seccionActiva", seccion);
}
