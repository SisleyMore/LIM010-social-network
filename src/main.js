const logueo = document.getElementById('logueo');
const registro = document.getElementById('registro'); 
const registrarte= document.getElementById('registrarte');
const errorRegistro = document.getElementById('error-registro');
const inicio = document.getElementById('inicio');
const bienvenida =  document.getElementById('bienvenida');
// Este es el punto de entrada de tu aplicacion
// import { myFunction } from './lib/index.js';

// myFunction();
const registrar = document.getElementById('registrar');
const ingresar = document.getElementById('ingresar');
const registroExisto = document.getElementById('registro-exitoso');

//Pantalla de publicaciones
const publicarPost = document.getElementById('publicar-post');
let postPublicados = document.getElementById('post-publicados');
let postGuardado = document.getElementById('post-guardado');

//array para almacenar datos registrados.
let users = [];
let arrayPost = [];

// document.getElementById('cerrar').addEventListener('click', () => {
//     document.getElementById('modal').classList.add('hide');
//  });

registrar.addEventListener('click', () => {
    logueo.classList.add('hide');
    inicio.classList.add('hide');
    registro.classList.remove('hide');
});

const validarEmail = (email) => {
    const expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return expr.test(email);
};

registrarte.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById('name')
    let newEmail = document.getElementById('new-email')
    let newPassword = document.getElementById('new-password')
    if (validarEmail(newEmail.value) && newPassword.value.length >= 8) {
        users.push({nameUser : name.value, emailUser: newEmail.value, passwordUser: newPassword.value});
        name.value = '';
        newEmail.value= '';
        newPassword.value = '';
        console.log(users);
        localStorage.setItem('users', JSON.stringify(users));
        registroExisto.innerHTML = 'Tu registro ha sido exitoso';
        registro.classList.add('hide');
        // modal.classList.remove('hide');
        inicio.classList.add('hide');
        logueo.classList.remove('hide');

    } else{
        errorRegistro.innerHTML = '• Debes ingresar un correo electrónico válido <br> • La contraseña debe tener más de 8 carácteres'
    }
})

// Evento para loguearse
ingresar.addEventListener('click', (a) => {
    a.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const usersLocalStorage = JSON.parse(localStorage.getItem('users'));
    console.log(usersLocalStorage);
    console.log(email)
    console.log(password);

    for (let i = 0; i < localStorage.length; i++) {
        if (usersLocalStorage[i].emailUser === email && usersLocalStorage[i].passwordUser === password) {
        inicio.classList.remove('hide');
        logueo.classList.add('hide');
        bienvenida.innerHTML = usersLocalStorage[i].nameUser;
        } else {
            alert('correo o contraseña incorrectas')
        }
        
    }
});

publicarPost.addEventListener('click', () => {
    let postNuevo = document.getElementById('post-nuevo').value;
    if (localStorage.getItem('post') != null && postNuevo != ''){
        let postGuardadosLocal = JSON.parse(localStorage.getItem('post'));
        const newArrPost = postGuardadosLocal.concat(postNuevo);
        localStorage.setItem ('post', JSON.stringify(newArrPost));
        postPublicados.innerHTML = '';
       for (let i = 0; i < newArrPost.length; i++) {
            postPublicados.innerHTML += `<div class='template-post'><textarea id="post-guardado" cols="50" rows="10" >${newArrPost[i]}</textarea> 
            <img id=${i} class="icono-remove" name = "remove" src="./lib/imagenes/icono-remove.png"><img id=${i} name= "edit" class="icono-edit" src="./lib/imagenes/icono-edit.png"></div>`; 
        }
    } else if (postNuevo != '') {
        arrayPost.push(postNuevo);
        localStorage.setItem('post', JSON.stringify(arrayPost));
        postPublicados.innerHTML = '';
            postPublicados.innerHTML = `<div class='template-post'><textarea id="post-guardado" cols="50" rows="10" >${arrayPost}</textarea> 
            <img class= "icono-remove" name = "remove" src="./lib/imagenes/icono-remove.png"><img class="icono-edit" name= "edit" src="./lib/imagenes/icono-edit.png"></div>`;
    }
});

postPublicados.addEventListener('click', (event) => {
    const obtenerId = event.target.id;
    const obtenerName = event.target.name;
    console.log(obtenerId);
    console.log(obtenerName);
    if (obtenerName === "remove") {
        const postGuardados = JSON.parse(localStorage.getItem('post'));
        console.log(postGuardados);
        

   }
});

