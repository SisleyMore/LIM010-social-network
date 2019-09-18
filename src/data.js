const validarEmail = (email) => {
  const expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return expr.test(email);
};

const pintarArray = (arr, ele) => {
  for (let x = 0; x < arr.length; x++) {
    ele.innerHTML += `<div class='template-post flex'><textarea id="post-guardado" class="text-area flex" name="post-guardado" readonly="true">${arr[x]}</textarea>
      <div class="iconos flex"><img id=${x} name= "edit" class="icono-edit" src="img/icono-edit.png"><img id=${x} name= "save" class="icono-remove" src="img/icono-save.png">
      <img id=${x} class="icono-remove" name = "remove" src="img/icono-remove.png"></div></div>`;
  } 
};
const obtenerLocalStorage = (string) => {
  return JSON.parse(localStorage.getItem(string));
};
const actualizarLocalStorage = (string, arr) => {
  localStorage.setItem(string, JSON.stringify(arr));
};
const eliminarElementoArray = (arr, indice) => {
  arr.splice(indice, 1);
  return arr;
};
const guardarElementoArray = (arr, indice, newEle) => {
  arr.splice(indice, 1, newEle);
  return arr;
};
window.redSocial = {
  validarEmail: validarEmail,
  obtenerLocalStorage: obtenerLocalStorage,
  actualizarLocalStorage: actualizarLocalStorage,
  eliminarElementoArray: eliminarElementoArray,
  guardarElementoArray: guardarElementoArray,
  pintarArray: pintarArray,
};