const logueo = document.getElementById('logueo');
const registro = document.getElementById('registro'); 
const registrarte= document.getElementById('registrarte');
// Este es el punto de entrada de tu aplicacion
// import { myFunction } from './lib/index.js';

// myFunction();
const registrar = document.getElementById('registrar');
const ingresar = document.getElementById('ingresar');
// Evento para loguearse
ingresar.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // guardo en locaLStorage Set
    localStorage.setItem('correo', email);
    localStorage.setItem('contrasena', password);
    // Consultar la informacion de localStorage get
    console.log(localStorage.getItem('correo'));
    console.log(localStorage.getItem('contrasena'));

});

registrar.addEventListener('click', () => {
    logueo.classList.add('hide');
    registro.classList.remove('hide');
});

registrarte.addEventListener('click', (e) => {
    e.preventDefault();
 
    const name = document.getElementById('name').value;
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;
     // guardo en locaLStorage Set
    if (name.length < 8){
        alert('asd');
    }
    localStorage.setItem('nombre', name);
    localStorage.setItem('nuevoCorreo', newEmail);
    localStorage.setItem('nuevaContrasena', newPassword);
    // Consultar la informacion de localStorage get
    console.log(localStorage.getItem('nombre'));
    console.log(localStorage.getItem('nuevoCorreo'));
    console.log(localStorage.getItem('nuevaContrasena'));
})



