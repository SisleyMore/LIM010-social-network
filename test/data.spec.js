global.window = global;
require('../src/data');
require('./data.spec.js');

const arr = ['post1', 'post2', 'post3'];

describe('validarEmail', () => {
  it('debería ser una función', () => {
    expect(typeof redSocial.validarEmail).toEqual('function');
  });
});

it('debería retornar "true" para "indyrachsm@gmail.com"', () => {
  expect(redSocial.validarEmail('indyrachsm@gmail.com')).toEqual(true);
});

describe('eliminarElementoArray', () => {
  it('debería ser una función', () => {
    expect(typeof redSocial.eliminarElementoArray).toEqual('function');
  });
  it('debería retornar ["post2", "post3"]', () => {
    expect(redSocial.eliminarElementoArray(arr, 0)).toEqual(['post2', 'post3']);
  });
});

describe('guardarElementoArray', () => {
  it('debería ser una función', () => {
    expect(typeof redSocial.guardarElementoArray).toEqual('function');
  });
  it('debería retornar ["post4"]', () => {
    expect(redSocial.guardarElementoArray(arr, 0, 'post4')[0]).toEqual('post4');
  });
});