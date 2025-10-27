import { USUARIOS_INICIALES } from "../data/usuarios.data.js";

export function inicializarUsuarios() {
  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(USUARIOS_INICIALES));
  }
}
export function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

export function validarUsuario(usuario, contrasena) {
  const usuarios = obtenerUsuarios();
  return usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);
}