const vistaLogueo = document.getElementById('vista-logueo');
const vistaRegistro = document.getElementById('vista-registro'); 
const btnRegistrarte = document.getElementById('btn-registrarte');
const errorRegistro = document.getElementById('error-registro');
const perfil = document.getElementById('perfil');
const bienvenida =  document.getElementById('bienvenida');
const menu = document.getElementById('menu');
const nombreUsuario = document.getElementById('nombre-usuario');
const cerrarSesion = document.getElementById('cerrar-sesion');


const enlaceRegistrar = document.getElementById('enlace-registrar');
const btnIngresar = document.getElementById('btn-ingresar');
const registroExisto = document.getElementById('registro-exitoso');
const error = document.getElementById('error');

//Perfil de Usuario
let escribirPost = document.getElementById('escribir-post');
const publicarPost = document.getElementById('publicar-post');
let postPublicados = document.getElementById('post-publicados');
let postGuardado = document.getElementsByName('post-guardado');
const subirImagen = document.getElementById('subir-imagen');
let postImagen = document.getElementById('post-imagen');

//array para almacenar datos registrados.
let users = [];
let arrayPost = [];

enlaceRegistrar.addEventListener('click', () => {
    vistaLogueo.classList.add('hide');
    perfil.classList.add('hide');
    vistaRegistro.classList.remove('hide');
});

cerrarSesion.addEventListener('click', () => {
    location.reload();
});

const validarEmail = (email) => {
  const expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 return expr.test(email);
};

const obtenerLocalStorage = (string) => {
    return JSON.parse(localStorage.getItem(string));
}
  
const actualizarLocalStorage = (string, arr) => {
    localStorage.setItem(string, JSON.stringify(arr));
}
const agregarElementoAlArray = (arr, ele) => {
    arr.push(ele);
    return arr;
}

const eliminarElementoArray = (arr, indice) => {
    arr.splice(indice, 1);
    return arr;
}

const guardarElementoArray = (arr, indice, newEle) => {
    arr.splice(indice, 1, newEle);
    return arr;
}



btnRegistrarte.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById('name')
    let newEmail = document.getElementById('new-email')
    let newPassword = document.getElementById('new-password')
    if (localStorage.getItem('users') != null && validarEmail(newEmail.value) && newPassword.value.length >= 8) {
        users.push({nameUser : name.value, emailUser: newEmail.value, passwordUser: newPassword.value});
        name.value = '';
        newEmail.value= '';
        newPassword.value = '';
        let usuariosRegistrados = obtenerLocalStorage('users');
        const usuarios = usuariosRegistrados.concat(users);
        console.log(usuarios);
        actualizarLocalStorage('users', usuarios);
        registroExisto.innerHTML = 'Tu registro ha sido exitoso';
        vistaRegistro.classList.add('hide');
        // modal.classList.remove('hide');
        perfil.classList.add('hide');
        vistaLogueo.classList.remove('hide');

    } else{
        errorRegistro.innerHTML = '• Debes ingresar un correo electrónico válido <br> • La contraseña debe tener más de 8 carácteres'
    }
})

// Evento para loguearse
btnIngresar.addEventListener('click', (a) => {
    a.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const usersLocalStorage = obtenerLocalStorage('users');
    console.log(usersLocalStorage);
    console.log(email)
    console.log(password);

    for (let i = 0; i < usersLocalStorage.length; i++) {
        if (usersLocalStorage[i].emailUser === email && usersLocalStorage[i].passwordUser === password) {
        perfil.classList.remove('hide');
        vistaLogueo.classList.add('hide');
        menu.classList.remove('hide');
        nombreUsuario.innerHTML = usersLocalStorage[i].nameUser;
        let postUsuarioGuardado = obtenerLocalStorage('post');
        // let postUsuarioGuardado = JSON.parse(localStorage.getItem('post'));
        for (let x = 0; x < postUsuarioGuardado.length; x++) {
            postPublicados.innerHTML += `<div class='template-post flex'><textarea id="post-guardado" class="text-area flex" name="post-guardado" readonly="true">${postUsuarioGuardado[x]}</textarea> 
            <div class="iconos flex"><img id=${x} name= "edit" class="icono-edit" src="./lib/imagenes/icono-edit.png"><img id=${x} name= "save" class="icono-remove" src="./lib/imagenes/icono-save.png">
            <img id=${x} class="icono-remove" name = "remove" src="./lib/imagenes/icono-remove.png"></div></div>`; 
        }
        } else {
            error.innerHTML = 'correo o contraseña incorrectas';
        }
        
    }
});

publicarPost.addEventListener('click', () => {
    let postNuevo = escribirPost.value;
    if (localStorage.getItem('post') != null && postNuevo != ''){
        let postGuardadosLocal = obtenerLocalStorage('post');
        const newArrPost = postGuardadosLocal.concat(postNuevo);
        actualizarLocalStorage('post', newArrPost);
        postPublicados.innerHTML = '';
       for (let i = 0; i < newArrPost.length; i++) {
            postPublicados.innerHTML += `<div class='template-post flex'><textarea id="post-guardado" class="text-area flex" name="post-guardado" readonly="true">${newArrPost[i]}</textarea> 
            <div class="iconos flex"><img id=${i} name= "edit" class="icono-edit" src="./lib/imagenes/icono-edit.png"><img id=${i} name= "save" class="icono-remove" src="./lib/imagenes/icono-save.png">
            <img id=${i} class="icono-remove" name = "remove" src="./lib/imagenes/icono-remove.png"></div></div>`; 
        }
        escribirPost.value = '';
    
    } else if (postNuevo != '') {
        arrayPost.push(postNuevo);
        actualizarLocalStorage('post', arrayPost);
        postPublicados.innerHTML = '';
            postPublicados.innerHTML = `<div class='template-post flex'><textarea id="post-guardado" class="text-area flex" name="post-guardado" readonly="true">${arrayPost}</textarea> 
            <div class="iconos flex"><img name= "edit" class="icono-edit" src="./lib/imagenes/icono-edit.png"><img name= "save" class="icono-remove" src="./lib/imagenes/icono-save.png">
            <img class="icono-remove" name = "remove" src="./lib/imagenes/icono-remove.png"></div></div>`; 
    }
        escribirPost.value = '';
});

postPublicados.addEventListener('click', (event) => {
    const obtenerId = event.target.id;
    const obtenerName = event.target.name;
    console.log(obtenerId);
    console.log(obtenerName);
    if (obtenerName == "remove") {
        const postGuardados = obtenerLocalStorage('post');
        console.log(postGuardados);
        console.log(postGuardados.splice(obtenerId,1));
        console.log(postGuardados);
        actualizarLocalStorage('post', postGuardados);
        postPublicados.innerHTML = '';
        for (let i = 0; i < postGuardados.length; i++) {
            postPublicados.innerHTML += `<div class='template-post flex'><textarea id="post-guardado" class="text-area flex" name="post-guardado" readonly="true">${postGuardados[i]}</textarea> 
            <div class="iconos flex"><img id=${i} name= "edit" class="icono-edit" src="./lib/imagenes/icono-edit.png"><img id=${i} name= "save" class="icono-remove" src="./lib/imagenes/icono-save.png">
            <img id=${i} class="icono-remove" name = "remove" src="./lib/imagenes/icono-remove.png"></div></div>`; 
        }
   }else if (obtenerName == "edit") {
        postGuardado[obtenerId].removeAttribute('readonly');
   }else if (obtenerName == "save"){
       const postEditados = obtenerLocalStorage('post');
        console.log(postEditados.splice(obtenerId,1,postGuardado[obtenerId].value));
        console.log(postEditados);
        actualizarLocalStorage('post', postEditados);
        postPublicados.innerHTML = '';
        for (let i = 0; i < postEditados.length; i++) {
            postPublicados.innerHTML += `<div class='template-post flex'><textarea id="post-guardado" class="text-area flex" name="post-guardado" readonly="true">${postEditados[i]}</textarea> 
            <div class="iconos flex"><img id=${i} name= "edit" class="icono-edit" src="./lib/imagenes/icono-edit.png"><img id=${i} name= "save" class="icono-remove" src="./lib/imagenes/icono-save.png">
            <img id=${i} class="icono-remove" name = "remove" src="./lib/imagenes/icono-remove.png"></div></div>`; 
        }
   }
});

subirImagen.addEventListener('change', () =>{
    alert('subiste una imagen');
    postsLocal = JSON.parse(localStorage.getItem('post'));
    // arrayPost.push({post : postsLocal, img: url})
    const imagen = document.querySelector(postImagen);
    console.log(imagen);
    
})