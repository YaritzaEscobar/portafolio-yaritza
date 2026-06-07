const btn = document.getElementById("btnIdioma");
const btnCV = document.getElementById("btnCV");

let idioma = localStorage.getItem("idioma") || "es";

function aplicarIdioma() {
  document.documentElement.lang = idioma;
  btn.textContent = idioma.toUpperCase();

  document.querySelectorAll("[data-es]").forEach((el) => {
    el.innerHTML = el.getAttribute(`data-${idioma}`);
  });

  // Cambia el CV según idioma
  if (btnCV) {
    btnCV.addEventListener("click", () => {
      if (btnCV.classList.contains("done")) return;
      const dlIcon = btnCV.querySelector(".ico-dl");
      const tickIcon = btnCV.querySelector(".tick");
      const label = btnCV.querySelector("[data-es]");

      label.textContent =
        idioma === "es"
          ? btnCV.getAttribute("data-es") || "Descargando..."
          : btnCV.getAttribute("data-en") || "Downloading...";

      setTimeout(() => {
        dlIcon.style.display = "none";
        tickIcon.style.display = "block";
        label.textContent = "¡Listo!";
        btnCV.classList.add("done");

        setTimeout(() => {
          btnCV.classList.remove("done");
          dlIcon.style.display = "block";
          tickIcon.style.display = "none";

          label.textContent = btnCV.getAttribute("data-en") || "Download CV";
        }, 2200);
      }, 1000);
    });

    if (idioma === "es") {
      btnCV.href = "cv/CV-Yaritza-Jiménez-QA-FrontEnd-ES.pdf";
    }
    if (idioma === "en") {
      btnCV.href = "cv/Cv-traducido-Yaritza-Jiménez-EN.pdf";
    }
  }
}

aplicarIdioma();

btn.addEventListener("click", () => {
  idioma = idioma === "es" ? "en" : "es";
  localStorage.setItem("idioma", idioma);
  aplicarIdioma();
});
