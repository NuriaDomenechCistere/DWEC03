import { TODOS_ANIMALES, DIFICULTADES } from "../data/juego.data.js";

// Generar tablero según dificultad
export function generarTablero(tablero, tipoDificultad) {
    let filas, columnas;

    if (tipoDificultad === "Fácil") { filas = 2; columnas = 4; }
    else if (tipoDificultad === "Medio") { filas = 4; columnas = 8; }
    else if (tipoDificultad === "Difícil") { filas = 4; columnas = 10; }
    else { filas = 2; columnas = 4; }

    const totalCartas = filas * columnas;
    const parejasNecesarias = totalCartas / 2;
    const seleccion = TODOS_ANIMALES.slice(0, parejasNecesarias);

    function mezclar(array) { return array.slice().sort(() => Math.random() - 0.5); }

    const tableroAnimales = mezclar(seleccion);

    tablero.innerHTML = "";
    tablero.style.display = "grid";
    tablero.style.gridTemplateColumns = `repeat(${columnas}, 64px)`;
    tablero.style.gridTemplateRows = `repeat(${filas}, 64px)`;
    tablero.style.textAlign = "center";
    tablero.style.gap = "8px";

    tableroAnimales.forEach(animal => {
        const div = document.createElement("div");
        div.classList.add("card", "girada");

        const span = document.createElement("span");
        span.classList.add("d-none", "carta-animal");
        span.textContent = animal;

        div.appendChild(span);
        tablero.appendChild(div);
    });

    return parejasNecesarias;
}

// Girar cartas
export function girarCartas(tablero1, tablero2) {
    const cartas = document.querySelectorAll(".carta-animal");
    const reversos = document.querySelectorAll(".card");

    reversos.forEach(reverso => {
        if (!reverso.classList.contains("acierto")) reverso.style.backgroundColor = "white";
    });

    cartas.forEach(carta => {
        const contenedor = carta.parentElement;
        if (!contenedor.classList.contains("acierto")) {
            carta.classList.remove("d-none");
            carta.classList.add("d-block", "girada", "vista");
        }
    });

    tablero1.style.pointerEvents = "none";
    tablero2.style.pointerEvents = "none";

    setTimeout(() => {
        reversos.forEach(reverso => {
            if (!reverso.classList.contains("acierto")) reverso.style.backgroundColor = "";
        });
        cartas.forEach(carta => {
            const contenedor = carta.parentElement;
            if (!contenedor.classList.contains("acierto")) {
                carta.classList.remove("d-block", "girada", "vista");
                carta.classList.add("d-none");
            }
        });
        tablero1.style.pointerEvents = "";
        tablero2.style.pointerEvents = "";
    }, 2000);
}

// Detectar superposición de cartas
export function seSuperponen(el1, el2) {
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();
    return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
}

// Arrastrar carta
export function arrastrarCarta(cartaOriginal, cartasTablero2, totalParejas, intervalo) {
  cartaOriginal.addEventListener("mousedown", (e) => {
    const cartaClon = cartaOriginal.cloneNode(true);
    cartaClon.style.position = "absolute";
    cartaClon.style.zIndex = 1000;
    cartaClon.style.pointerEvents = "none";
    document.body.appendChild(cartaClon);

    function mover(x, y) {
      cartaClon.style.left = x - cartaClon.offsetWidth / 2 + "px";
      cartaClon.style.top = y - cartaClon.offsetHeight / 2 + "px";
    }

    mover(e.pageX, e.pageY);

    function moverConMouse(ev) { mover(ev.pageX, ev.pageY); }
    document.addEventListener("mousemove", moverConMouse);

    const soltarMouse = () => {
      document.removeEventListener("mousemove", moverConMouse);
      document.removeEventListener("mouseup", soltarMouse);

      let coincidencia = false;

      for (const otraCarta of cartasTablero2) {
        if (seSuperponen(cartaClon, otraCarta)) {
          const textoOriginal = cartaOriginal.querySelector(".carta-animal").textContent.trim();
          const textoOtra = otraCarta.querySelector(".carta-animal").textContent.trim();

          if (textoOriginal === textoOtra) {
           coincidencia = true;

            cartaOriginal.style.backgroundColor = "#90EE90";
            otraCarta.style.backgroundColor = "#90EE90";
            cartaOriginal.classList.remove("girada");
              otraCarta.classList.remove("girada");

            cartaOriginal.classList.remove("d-none");
            cartaOriginal.classList.add("acierto");
            otraCarta.classList.remove("d-none");
            otraCarta.classList.add("acierto");
            var spanOriginal = cartaOriginal.querySelector(".carta-animal");
              const spanOtra = otraCarta.querySelector(".carta-animal");
              if (spanOriginal) spanOriginal.classList.remove("d-none");
              if (spanOtra) spanOtra.classList.remove("d-none");



            let numAciertosActual = parseInt(localStorage.getItem("numAciertos")) || 0;
            numAciertosActual++;
            localStorage.setItem("numAciertos", numAciertosActual);
            document.getElementById("num-aciertos").textContent = numAciertosActual;

            if (numAciertosActual === totalParejas) {
              clearInterval(intervalo);
              setTimeout(() => window.location.href = "../views/resultados.html", 800);
            }

            break; 
          } else {
            cartaOriginal.style.backgroundColor = "#FFB6B6";
            otraCarta.style.backgroundColor = "#FFB6B6";
            setTimeout(() => {
              cartaOriginal.style.backgroundColor = "";
              otraCarta.style.backgroundColor = "";
            }, 500);
          }
        }
      }

      cartaClon.remove();
      if (!coincidencia) cartaOriginal.style.backgroundColor = "";
    };

    document.addEventListener("mouseup", soltarMouse, { once: true });
  });
}


// Cronómetro 
export function iniciarCronometro() {
    let hora = 0, minuto = 0, segundo = 30;
    let ceroSeg, ceroMin, ceroHor;

    const intervalo = setInterval(() => {
        ceroSeg = segundo < 10 ? "0" : "";
        ceroMin = minuto < 10 ? "0" : "";
        ceroHor = hora < 10 ? "0" : "";
        document.getElementById("numeros").textContent =
            `${ceroHor}${hora}:${ceroMin}${minuto}:${ceroSeg}${segundo}`;
        segundo--;

        

        if (hora === 0 && minuto === 0 && segundo < 0) {
            clearInterval(intervalo);
            document.getElementById("numeros").textContent = "00:00:00";
            window.location.href = "../views/resultados.html";
        }
    }, 1000);

    return intervalo;
}
