const vistaLogueo = document.getElementById('vista-logueo');
const vistaRegistro = document.getElementById('vista-registro');
const btnRegistrarte = document.getElementById('btn-registrarte');
const msjErrorRegistro = document.getElementById('error-registro');
const seccionPerfil = document.getElementById('seccion-perfil');
const bienvenida = document.getElementById('bienvenida');
const menu = document.getElementById('menu');
const nombreUsuario = document.getElementById('nombre-usuario');
const btnCerrarSesion = document.getElementById('cerrar-sesion');
const enlaceRegistrar = document.getElementById('enlace-registrar');
const btnIngresar = document.getElementById('btn-ingresar');
const msjRegistroExisto = document.getElementById('registro-exitoso');
const msjError = document.getElementById('error');
// Perfil de Usuario
let escribirPost = document.getElementById('escribir-post');
const publicarPost = document.getElementById('publicar-post');
let postPublicados = document.getElementById('post-publicados');
let postGuardado = document.getElementsByName('post-guardado');
const subirImagen = document.getElementById('subir-imagen');
let postImagen = document.getElementById('post-imagen');
// array para almacenar datos registrados.
let users = [];
let arrayPost = [];

enlaceRegistrar.addEventListener('click', () => {
  vistaLogueo.classList.add('hide');
  seccionPerfil.classList.add('hide');
  vistaRegistro.classList.remove('hide');
});
btnCerrarSesion.addEventListener('click', () => {
  location.reload();
});

btnRegistrarte.addEventListener('click', (elem) => {
  elem.preventDefault();
  let name = document.getElementById('name');
  let newEmail = document.getElementById('new-email');
  let newPassword = document.getElementById('new-password');
  if (localStorage.getItem('users') !== null && validarEmail(newEmail.value) && newPassword.value.length >= 8) {
    users.push({nameUser: name.value,
      emailUser: newEmail.value,
      passwordUser: newPassword.value});
    name.value = '';
    newEmail.value = '';
    newPassword.value = '';
    let arrUsuariosRegistrados = obtenerLocalStorage('users');
    const arrUsuarios = arrUsuariosRegistrados.concat(users);
    actualizarLocalStorage('users', arrUsuarios);
    msjRegistroExisto.innerHTML = 'Tu registro ha sido exitoso';
    vistaRegistro.classList.add('hide');
    // modal.classList.remove('hide');
    seccionPerfil.classList.add('hide');
    vistaLogueo.classList.remove('hide');
  } else {
    msjErrorRegistro.innerHTML = '• Debes ingresar un correo electrónico válido <br> • La contraseña debe tener más de 8 carácteres';
  }
});
 
// Evento para loguearse
btnIngresar.addEventListener('click', (ab) => {
  ab.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const usersLocalStorage = obtenerLocalStorage('users');
  for (let i = 0; i < usersLocalStorage.length; i++) {
    if (usersLocalStorage[i].emailUser === email && usersLocalStorage[i].passwordUser === password) {
      seccionPerfil.classList.remove('hide');
      vistaLogueo.classList.add('hide');
      menu.classList.remove('hide');
      nombreUsuario.innerHTML = usersLocalStorage[i].nameUser;
      let arrPostUsuarioGuardado = obtenerLocalStorage('post');
      pintarArray(arrPostUsuarioGuardado, postPublicados);
    } else {
      msjError.innerHTML = 'correo o contraseña incorrectas';
    }
  }
});
publicarPost.addEventListener('click', () => {
  let postNuevo = escribirPost.value;
  if (localStorage.getItem('post') !== null && postNuevo !== '') {
    let arrPostGuardadosLocal = obtenerLocalStorage('post');
    const newArrPost = arrPostGuardadosLocal.concat(postNuevo);
    actualizarLocalStorage('post', newArrPost);
    postPublicados.innerHTML = '';
    pintarArray(newArrPost, postPublicados);
    escribirPost.value = '';
  } else if (postNuevo !== '') {
    arrayPost.push(postNuevo);
    actualizarLocalStorage('post', arrayPost);
    postPublicados.innerHTML = '';
    pintarArray(arrayPost, postPublicados);
  }
  escribirPost.value = '';
});
postPublicados.addEventListener('click', (event) => {
  const obtenerId = event.target.id;
  const obtenerName = event.target.name;
  if (obtenerName === 'remove') {
    const postGuardados = obtenerLocalStorage('post');
    eliminarElementoArray(postGuardados, obtenerId);
    actualizarLocalStorage('post', postGuardados);
    postPublicados.innerHTML = '';
    pintarArray(postGuardados, postPublicados);
  } else if (obtenerName === 'edit') {
    postGuardado[obtenerId].removeAttribute('readonly');
  } else if (obtenerName === 'save') {
    const postEditados = obtenerLocalStorage('post');
    guardarElementoArray(postEditados, obtenerId, postGuardado[obtenerId].value);
    actualizarLocalStorage('post', postEditados);
    postPublicados.innerHTML = '';
    pintarArray(postEditados, postPublicados);
  }
});