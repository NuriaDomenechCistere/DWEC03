import { inicializarUsuarios, validarUsuario } from "./services/usuarios.service.js";
import { generarTablero, girarCartas, arrastrarCarta, iniciarCronometro } from "./services/juego.service.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarUsuarios();

  const formulario = document.getElementById("formularioInicioSesion");
  const mensaje = document.getElementById("mensaje");

  if (formulario) {
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();
      const regexAlfanumerico = /^[a-zA-Z0-9]+$/;
      if (!regexAlfanumerico.test(contrasena)) {
        if (mensaje) {
          mensaje.textContent = "Error: Caracteres no permitidos";
          mensaje.style.color = "red";
          mensaje.style.backgroundColor = "rgba(255, 157, 157, 0.662)";
          mensaje.style.borderRadius = "2rem";
        }
        return;
      }

      const encontrado = validarUsuario(usuario, contrasena);

      if (encontrado) {
        if (mensaje) {
          mensaje.style.color = "green";
          mensaje.textContent = "Inicio de sesión correcto.";
          mensaje.style.backgroundColor = "rgba(119, 255, 95, 0.32)";
          mensaje.style.borderRadius = "2rem";
        }
        setTimeout(() => {
          window.location.href = "./views/bienvenida.html";
        }, 1000);
      } else {
        if (mensaje) {
          mensaje.style.color = "red";
          mensaje.textContent = "Usuario o contraseña incorrectos";
          mensaje.style.backgroundColor = "rgba(255, 157, 157, 0.662)";
          mensaje.style.borderRadius = "2rem";
        }
      }
    });
  }
  // BIENVENIDA
  const tablero1 = document.querySelector(".board1");
  const tablero2 = document.querySelector(".board2");
  const botones = document.querySelectorAll(".btn-dificultad");

  if (botones) {
    botones.forEach((boton) => {
      boton.addEventListener("click", () => {
        const dificultad = boton.textContent.trim();
        localStorage.setItem("dificultadElegida", dificultad);
        window.location.href = "../views/memory.html";
      });
    });
  }

  // MEMORY
  if (tablero1 && tablero2) {
    localStorage.setItem("numAciertos", 0);
    const dificultadGuardada = localStorage.getItem("dificultadElegida") || "Fácil";

    // Genera tableros y devuelve parejas necesarias
    const totalParejas1 = generarTablero(tablero1, dificultadGuardada);
    const totalParejas2 = generarTablero(tablero2, dificultadGuardada);

    localStorage.setItem("totalParejas", totalParejas1); 

    const cartasTablero1 = document.querySelectorAll(".board1 .card");
    const cartasTablero2 = document.querySelectorAll(".board2 .card");

    const intervalo = iniciarCronometro();

    cartasTablero1.forEach(carta => {
        arrastrarCarta(carta, cartasTablero2, totalParejas1, intervalo);
    });

    const botonGirar = document.querySelector(".btn-girar");
    if (botonGirar) botonGirar.addEventListener("click", () => girarCartas(tablero1, tablero2));
}

  // RESULTADOS
  if (window.location.pathname.includes("resultados.html")) {
    const numAciertos = localStorage.getItem("numAciertos") || 0;
    const totalParejas = localStorage.getItem("totalParejas") || 0;

    const aciertosSpan = document.getElementById("total-resultados");
    const parejasSpan = document.getElementById("total-resultados-parejas");

    if (aciertosSpan) aciertosSpan.textContent = numAciertos;
    if (parejasSpan) parejasSpan.textContent = totalParejas;
  }

  // BOTONES
  const botonJugar = document.querySelector(".btn-jugar");
  if (botonJugar) {
    botonJugar.onclick = () => setTimeout(() => { window.location.href = "../views/bienvenida.html"; }, 1000);
  }

  const botonSalir = document.querySelector(".btn-salir");
  if (botonSalir) {
    botonSalir.onclick = () => setTimeout(() => { window.location.href = "../index.html"; }, 1000);
  }
});