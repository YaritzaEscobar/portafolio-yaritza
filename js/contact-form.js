 (function () {
  const sanitize = (s) => s.replace(/[<>"'`]/g, "").trim();
  const soloLetras = (s) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{2,60}$/.test(s);
  const emailOk = (s) => /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(s);

  const C = {
    nombre: {
      el: document.getElementById("nombre"),
      err: document.getElementById("err-nombre"),
    },
    apellido: {
      el: document.getElementById("apellido"),
      err: document.getElementById("err-apellido"),
    },
    email: {
      el: document.getElementById("email"),
      err: document.getElementById("err-email"),
    },
    asunto: {
      el: document.getElementById("asunto"),
      err: document.getElementById("err-asunto"),
    },
    mensaje: {
      el: document.getElementById("mensaje"),
      err: document.getElementById("err-mensaje"),
    },
  };

  const setError = (k, msg) => {
    C[k].el.classList.add("error");
    C[k].el.classList.remove("ok");
    C[k].err.textContent = msg;
    C[k].err.classList.add("visible");
  };
  const clearError = (k) => {
    C[k].el.classList.remove("error");
    C[k].err.classList.remove("visible");
  };
  const setOk = (k) => {
    C[k].el.classList.add("ok");
    C[k].el.classList.remove("error");
    C[k].err.classList.remove("visible");
  };

  document.getElementById("mensaje").addEventListener("input", function () {
    const n = Math.min(this.value.length, 800);
    const counter = document.getElementById("charCount");
    counter.textContent = n;
    counter.style.color = n > 790 ? "#E24B4A" : "#9DB5CC";
  });

  Object.keys(C).forEach((k) => {
    C[k].el.addEventListener("blur", () => validateField(k));
    C[k].el.addEventListener("input", () => {
      if (C[k].el.classList.contains("error")) validateField(k);
    });
  });

  function validateField(k) {
    const v = sanitize(C[k].el.value);
    const lang = document.documentElement.lang || "es";

    const msgs = {
      es: {
        nombreReq: "El nombre es obligatorio.",
        nombreFmt: "Solo letras y espacios (mín. 2 caracteres).",
        apellidoFmt: "Solo se permiten letras y espacios.",
        emailReq: "El correo es obligatorio.",
        emailFmt: "Formato de correo no válido.",
        asuntoReq: "Selecciona un asunto.",
        mensajeMin: "El mensaje debe tener al menos 10 caracteres.",
      },
      en: {
        nombreReq: "Name is required.",
        nombreFmt: "Letters and spaces only (min. 2 characters).",
        apellidoFmt: "Only letters and spaces are allowed.",
        emailReq: "Email is required.",
        emailFmt: "Invalid email format.",
        asuntoReq: "Please select a subject.",
        mensajeMin: "Message must be at least 10 characters.",
      },
    };

    const t = msgs[lang] || msgs["es"];

    if (k === "nombre") {
      if (!v) return setError("nombre", t.nombreReq);
      if (!soloLetras(v)) return setError("nombre", t.nombreFmt);
      setOk("nombre");
    }
    if (k === "apellido") {
      if (v && !soloLetras(v)) return setError("apellido", t.apellidoFmt);
      clearError("apellido");
    }
    if (k === "email") {
      if (!v) return setError("email", t.emailReq);
      if (!emailOk(v)) return setError("email", t.emailFmt);
      setOk("email");
    }
    if (k === "asunto") {
      if (!C.asunto.el.value) return setError("asunto", t.asuntoReq);
      setOk("asunto");
    }
    if (k === "mensaje") {
      if (v.length < 10) return setError("mensaje", t.mensajeMin);
      setOk("mensaje");
    }
  }

  document
    .getElementById("contactoForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      if (document.querySelector(".campo-trampa").value) return;

      let valid = true;
      ["nombre", "email", "asunto", "mensaje"].forEach((k) => {
        validateField(k);
        if (C[k].el.classList.contains("error") || !sanitize(C[k].el.value))
          valid = false;
      });
      if (!C.asunto.el.value) valid = false;
      if (sanitize(C.mensaje.el.value).length < 10) valid = false;

      const politica = document.getElementById("politica");
      const errPol = document.getElementById("err-politica");
      if (!politica.checked) {
        errPol.classList.add("visible");
        valid = false;
      } else errPol.classList.remove("visible");

      if (!valid) return;

      const btn = document.getElementById("btnEnviar");
      const txt = document.getElementById("btnTxt");
      btn.disabled = true;
      txt.textContent = document.documentElement.lang === "en" ? "Sending…" : "Enviando…";

      const v_nombre = sanitize(C.nombre.el.value);
      const v_apellido = sanitize(C.apellido.el.value);
      const v_email = sanitize(C.email.el.value);
      const v_asunto = C.asunto.el.value;
      const v_mensaje = sanitize(C.mensaje.el.value);

      const body = encodeURIComponent(
        `Nombre: ${v_nombre} ${v_apellido}\nCorreo: ${v_email}\nAsunto: ${v_asunto}\n\nMensaje:\n${v_mensaje}`,
      );
      const subject = encodeURIComponent("Contacto Portfolio - " + v_asunto);

      setTimeout(() => {
        window.location.href = `mailto:jyaritzaescobar@gmail.com?subject=${subject}&body=${body}`;
        document.getElementById("contactoForm").style.display = "none";
        document.getElementById("formSuccess").classList.add("visible");
      }, 800);
    });
})();