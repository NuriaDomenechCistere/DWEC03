[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xhW8oDtM)
# 📘 DWEC03 - Tarea de Evaluación [2/2]

## 📝 Descripción general

En esta segunda tarea, desarrollarás el juego completo a partir de la planificación presentada en la Tarea 1. 

La estructura del proyecto debe incluir las cuatro interfaces definidas previamente, garantizando así una experiencia de usuario consistente y bien organizada.

## 🎯 Objetivos de aprendizaje

- Manejar la Validación de formularios
- Trabajar la Gestión de eventos
- Emplear los Inicios de Sesión
- Incluir la Redirección entre interfaces
- Recordar el Desarrollo de interfaces (HTML+CSS)
- Profundizar en la Arquitectura

## 📚 Antes de Empezar

- Recuerda que debes **respetar la arquitectura de la aplicación estudiada en la UD anterior.** 
- Podrás conseguir hasta un punto y medio si mejoras la interfaz gráfica del juego.

## 🛠️ Ejercicios

### Ejercicio 1: Login

- **Formulario de Acceso:**
  
  - Debe incluir dos campos de texto (Usuario y Contraseña) y un botón de envío.

- **Validación del Usuario:**
  
  - Se proporciona un fichero con nombres de usuarios y contraseñas válidos para poder logearse. Utiliza para esto el `localStorage`.
  
  - Cuando el usuario pulse el botón de envío, deberás verificar si coinciden con los valores introducidos en el formulario. 

- **Mensajes de Validación:**
  
  - Si el usuario y la contraseña son correctos, se redirige a la pantalla de juego.
  
  - La contraseña debe cumplir con un formato de caracteres alfanuméricos (números y letras). Si contiene caracteres no permitidos, muestra un mensaje de error. Utiliza `RegExp`para esto.

### Ejercicio 2: Bienvenida

Esta interfaz introducirá al usuario en el juego y le permitirá seleccionar el nivel de dificultad. Los requisitos son:

- **Instrucciones del Juego**:
  
  - Debe incluir un área con las instrucciones básicas del juego, explicando sus objetivos y reglas.

- **Botón de Inicio:**
  
  - Un botón que permita al usuario empezar el juego. Al hacer clic, redirige a la Interfaz de Juego.

- **Temporizador:**
  
  - Al acceder al juego se iniciará un temporizador de 30 segundos que es lo que durará el juego.
  
  - Este temporizador debe mostrarse en la interfaz de juego.

- **Selección de Nivel *(Opcional - 2 puntos extra)*:**
  
  - La interfaz de Bienvenida incluye un cuadro de selección con tres niveles de dificultad: Principiante, Intermedio y Avanzado.
  
  - La selección de nivel influirá en aspectos del juego como:
    
    - Generación dinámica del tablero (más dificultad tablero más grande)
    
    - Cantidad de elementos (mayor dificultad significa más elementos).
    
    - Tiempo límite (menor en niveles avanzados).
    
    - Objetivos adicionales (mayor complejidad o número de tareas a realizar).

### Ejercicio 3: Juego

Interfaz principal donde se desarrollará el juego. 

- **Estructura de la Interfaz:**
  
  - Zona de Juego: Área principal donde el usuario interactuará y desarrollará la actividad central del juego.
  
  - Zona de Información: Área donde se muestra información en tiempo real, como puntuación, tiempo restante y cualquier elemento interactivo (ej.: selección de color).

- **Dinámica del Juego:**
  
  - Crea el tablero de juego de forma dinámica al cargar la interfaz (por ejemplo, con el número de celdas definido según el nivel). - *OPCIONAL*
  
  - Implementa la acción principal del juego, que puede ser:
    
    - Movimiento de elementos (arrastrar y soltar).
    
    - Selección de elementos (voltear cartas, clic en celdas, etc.).
    
    - La dinámica debe incluir varios eventos.

- **Temporizador:**
  
  - Si el temporizador llega a 0, el usuario es redirigido automáticamente a la Interfaz de Resultados.

### Ejercicio 4: Resultados

Al finalizar el juego, el usuario debe ver una interfaz de resultados que indique si ha ganado o perdido, y que muestre un resumen de su desempeño. 

- **Resultado Final:**
  
  - Muestra si el usuario ha ganado o perdido, junto con un resumen relevante (puntuación obtenida, tiempo empleado, etc.).

- **Opciones de Reinicio o Salida:**
  
  - Incluye botones para:
    
    - Reiniciar: Permite comenzar una nueva partida desde la interfaz de Bienvenida.
    
    - Salir: Redirige a la interfaz de login.
