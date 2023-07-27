// Definición de variables a utilizar para las pruebas unitarias
const hasValue = require('../main/domain/utils/hasValue');
const {validEmail} = require('../main/domain/utils/validateEmail');

beforeEach(() => {
  
});
afterEach(() => {
  //Finalziar instancias
});

describe('utilsFunctions', () => {
  // hasValue
  test('Cuando llame a hasValue con número, Debe retornar un booleano false', () => {
    expect(typeof hasValue(1)).toBe('boolean');
  })

  test('Cuando llame a hasValue con array vacio, Debe retornar un booleano false', () => {
    expect(hasValue([])).toBe(false);
  })

  test('Cuando llame a hasValue con string vacio, Debe retornar un booleano false', () => {
    expect(hasValue('')).toBe(false);
  })

  test('Cuando llame a hasValue con null, Debe retornar un booleano false', () => {
    expect(hasValue(null)).toBe(false);
  })

  test('Cuando llame a hasValue con undefined, Debe retornar un booleano false', () => {
    expect(hasValue(undefined)).toBe(false);
  })

  test('Cuando llame a hasValue con NaN, Debe retornar un booleano false', () => {
    expect(hasValue(NaN)).toBe(false);
  })

  test('Cuando llame a hasValue con objeto sin keys, Debe retornar un booleano false', () => {
    expect(hasValue({})).toBe(false);
  })

  // validateEmail

  test('Cuando llame a validateEmail con string test@@sdfsdf.com, Debe retornar false', () => {
    expect(validEmail('test@@sdfsdf.com')).toBe(false);
  })

  test('Cuando llame a validEmail con un string test@, Debe retornar false', () => {
    expect(validEmail('test@')).toBe(false);
  })
  
  test('Cuando llame a validEmail con un string test@test, Debe retornar false', () => {
    expect(validEmail('test@test')).toBe(false);
  })

  test('Cuando llame a validEmail con un string test@test.a, Debe retornar false', () => {
    expect(validEmail('test@test.a')).toBe(false);
  })

  test('Cuando llame a validEmail con un string test@test.co, Debe retornar true', () => {
    expect(validEmail('test@test.co')).toBe(true);
  })

  test('Cuando llame a validEmail con un test@test.com.co, Debe retornar true', () => {
    expect(validEmail('test@test.com.co')).toBe(true);
  })

  test('Cuando llame a validEmail con un string test.test.test@test.com.co, Debe retornar true', () => {
    expect(validEmail('test.test.test@test.com.co')).toBe(true);
  })

}) 
