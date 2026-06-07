const btnHamburguesa = document.getElementById("btnHamburguesa");
const navMovil = document.getElementById("navMovil");

btnHamburguesa.addEventListener("click", () => {
  btnHamburguesa.classList.toggle("abierto");
  navMovil.classList.toggle("abierto");
});

// Cierra el menú al hacer clic en un enlace
navMovil.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    btnHamburguesa.classList.remove("abierto");
    navMovil.classList.remove("abierto");
  });
});

// Sincroniza el botón de idioma del menú móvil con el principal
const btnIdiomaMovil = document.getElementById("btnIdiomaMovil");
if (btnIdiomaMovil) {
  btnIdiomaMovil.addEventListener("click", () => {
    document.getElementById("btnIdioma").click();
  });
}
