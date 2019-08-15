const logueo = document.getElementById('logueo');
const registro = document.getElementById('registro'); 
const registrarte= document.getElementById('registrarte');
const errorRegistro = document.getElementById('error-registro');
// Este es el punto de entrada de tu aplicacion
// import { myFunction } from './lib/index.js';

// myFunction();
const registrar = document.getElementById('registrar');
const ingresar = document.getElementById('ingresar');

registrar.addEventListener('click', () => {
    logueo.classList.add('hide');
    registro.classList.remove('hide');
});

const validarEmail = (email) => {
    const expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return expr.test(email);
};

registrarte.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;


    // // Consultar la informacion de localStorage get

    // console.log(localStorage.getItem('nombre'));
    // console.log(localStorage.getItem('nuevoCorreo'));
    // console.log(localStorage.getItem('nuevaContrasena'));

    if (validarEmail(newEmail) && newPassword.length >= 8) {
         // guardo en locaLStorage Set
        localStorage.setItem('nombre', name);
        localStorage.setItem('nuevoCorreo', newEmail);
        localStorage.setItem('nuevaContrasena', newPassword);
        alert('Tu registro a sido exitoso');
        registro.classList.add('hide');
        logueo.classList.remove('hide');

    } else{
        errorRegistro.innerHTML = '• Debes ingresar un correo electrónico válido <br> • La contraseña debe tener más de 8 carácteres'
    }
})

// Evento para loguearse
ingresar.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // guardo en locaLStorage Set
    localStorage.setItem('correo', email);
    localStorage.setItem('contrasena', password);
    // Consultar la informacion de localStorage get
    // console.log(localStorage.getItem('correo'));
    // console.log(localStorage.getItem('contrasena'));

    if (localStorage.getItem('correo') === localStorage.getItem('nuevoCorreo') && localStorage.getItem('contrasena', password) === localStorage.getItem('nuevaContrasena')) {
        alert('hola');
    } else {
        alert('correo o contraseña incorrectos')
    }
    
    
    


});


