// Definición de variables a utilizar para las pruebas unitarias
const UserRepository = require('../main/data/attributes/user/repository/UserRepository');
const userViewModel = require('../main/domain/userViewModel');
const hasValue = require('../main/domain/utils/hasValue');

const userRepository = new UserRepository()

//Métodos que son necesarios para la construcción de data o validación

//Metodos para inicializar o finalizar instancias
beforeEach(() => {
  
});

afterEach(() => {
  //finalizar instancias
});

//Caso de prueba 01
test('Cuando hago un intento de ingreso con datos correcto, userViewModel.signUp(), debe retornar un objeto con una propiedad error con valor de  0', async () => {

  let responseDataSuccessLoginMock = {
    status: 200,
    data: {
      error: 0,
      response: {
        cuentas: [{
          AccountId: "1111111",
          LineOfBusiness: "1", // 1 para hogar, 2 prepago, 3 postpago
          alias: "1111111", // Los alias pueden ser el número de la linea o un nombre que le da el usuario
          token: 'U2sdfsdfsds...'
        }],
        usuario: {
          DocumentNumber: "111111111",
          DocumentType: "1",
          nombre: "Bienvenido",
          apellido: "Usuario",
          UserProfileID: "user@mail.com"
        }
      } 
    }
  }

  /** Aqui implementamos el mock de las funciones de "my" */
  let spyOn1 = jest.spyOn(userRepository, 'loginUserRemote').mockReturnValueOnce(responseDataSuccessLoginMock)
  const spyOn2 = jest.spyOn(userRepository, 'createUserLocal').mockReturnValueOnce(true)

  const resp = await userViewModel.signUp('user@mail.com', 'Abc123')

  expect(resp.error).toStrictEqual(0);

  spyOn1.mockRestore()
  spyOn2.mockRestore()

});

//Caso de prueba 02
test('Cuando hago un intento de ingreso con datos incorrectos, userViewModel.signUp(), debe retornar un objeto con una propiedad error con valor de 1', async () => {

  let responseDataSuccessLoginMock = {
    status: 200,
    data: {
      error: 1,
      response: "La contraseña ingresada no es valida" 
    }
  }

  /** Aqui implementamos el mock de las funciones de "my" */
  let spyOn1 = jest.spyOn(userRepository, 'loginUserRemote').mockReturnValueOnce(responseDataSuccessLoginMock)

  const resp = await userViewModel.signUp('user@mail.com', 'Abc124')

  expect(resp.error).toStrictEqual(1);

  spyOn1.mockRestore()

});


//Caso de prueba 03
test('Cuando hago un intento de ingreso con datos correctos pero falla al guardar los datos en el storage, userViewModel.signUp(), debe retornar un objeto con una propiedad error con valor de 1', async () => {

  let responseDataSuccessLoginMock = {
    status: 200,
    data: {
      error: 0,
      response: {
        cuentas: [{
          AccountId: "1111111",
          LineOfBusiness: "1", // 1 para hogar, 2 prepago, 3 postpago
          alias: "1111111",
          token: 'U2sdfsdfsds...'
        }],
        usuario: {
          DocumentNumber: "111111111",
          DocumentType: "1",
          nombre: "Bienvenido",
          apellido: "Usuario",
          UserProfileID: "user@mail.com"
        }
      } 
    }
  }

  /** Aqui implementamos el mock de las funciones de "my" */
  let spyOn1 = jest.spyOn(userRepository, 'loginUserRemote').mockReturnValueOnce(responseDataSuccessLoginMock)
  const spyOn2 = jest.spyOn(userRepository, 'createUserLocal').mockReturnValueOnce(false)

  const resp = await userViewModel.signUp('user@mail.com', 'Abc123')

  expect(resp.error).toStrictEqual(1);

  spyOn1.mockRestore()
  spyOn2.mockRestore()

});


//Caso de prueba 04
test('Cuando hago un intento de ingreso con datos correctos pero el usuario no tiene cuentas , userViewModel.signUp(), debe retornar un objeto con una propiedad error con valor de 1', async () => {

  let responseDataSuccessLoginMock = {
    status: 200,
    data: {
      error: 0,
      response: {
        cuentas: [],
        usuario: {
          DocumentNumber: "111111111",
          DocumentType: "1",
          nombre: "Bienvenido",
          apellido: "Usuario",
          UserProfileID: "user@mail.com"
        }
      } 
    }
  }

  let spyOn1 = jest.spyOn(userRepository, 'loginUserRemote').mockReturnValueOnce(responseDataSuccessLoginMock)
  const spyOn2 = jest.spyOn(userRepository, 'createUserLocal').mockReturnValueOnce(false)

  const resp = await userViewModel.signUp('user@mail.com', 'Abc123')

  expect(resp.error).toStrictEqual(1);

  spyOn1.mockRestore()
  spyOn2.mockRestore()

});


//Caso de prueba 05
test('Cuando agrego al storage la linea, userViewModel.setLocalLine(), debe retornar valor true', async () => {

  let spyOn1 = jest.spyOn(userRepository, 'setLocalLine').mockReturnValueOnce(true)

  const resp = await userViewModel.setLocalLine({
    alias: 6234234,
    LineOfBusiness: '1',
    AccountId: 6234234,
    token: 'Uwfsdfsdf...',
    email: 'test@mail.com'
  })

  expect(resp).toStrictEqual(true);

  spyOn1.mockRestore()

});

//Caso de prueba 06
test('Cuando agrego al storage la linea, userViewModel.startClearStorage(), debe retornar valor true', async () => {

  let spyOn1 = jest.spyOn(userRepository, 'clearStorage').mockReturnValueOnce(true)

  const resp = userViewModel.startClearStorage()

  expect(resp).toStrictEqual(true);

  spyOn1.mockRestore()

});


//Caso de prueba 07
test('Cuando llamo del storage el usuario y encuentra datos, userViewModel.getUserLogged(), debe retornar un valor no nulo', async () => {

  let spyOn1 = jest.spyOn(userRepository, 'getInfoStorage').mockReturnValueOnce({
    DocumentType: '1',
    accounts: [],
    documentNumber: '123456789',
    email: 'test@email.com',
    name: 'test',
    lastName: 'user'
  })

  const resp = userViewModel.getUserLogged()

  expect(hasValue(resp)).toStrictEqual(true);

  spyOn1.mockRestore()

});

//Caso de prueba 08
test('Cuando llamo del storage el usuario y no encuentra datos, userViewModel.getUserLogged(), debe retornar un valor nulo', async () => {

  let spyOn1 = jest.spyOn(userRepository, 'getInfoStorage').mockReturnValueOnce(null)

  const resp = userViewModel.getUserLogged()

  expect(hasValue(resp)).toStrictEqual(false);

  spyOn1.mockRestore()

});

//Caso de prueba 09
test('Cuando llamo del storage y encuentra datos, userViewModel.getLineSelect(), debe retornar un valor no nulo', async () => {

  let spyOn1 = jest.spyOn(userRepository, 'getInfoStorage').mockReturnValueOnce({
    AccountId: '61231231',
    LineOfBusiness: '1',
    alias: '61231231',
    email: 'test@email.com',
    token: '0asdasd...'
  })

  const resp = userViewModel.getLineSelect()

  expect(hasValue(resp)).toStrictEqual(true);

  spyOn1.mockRestore()

});

//Caso de prueba 10
test('Cuando llamo del storage y no encuentra datos, userViewModel.getLineSelect(), debe retornar un valor nulo', async () => {

  let spyOn1 = jest.spyOn(userRepository, 'getInfoStorage').mockReturnValueOnce(false)

  const resp = userViewModel.getLineSelect()

  expect(hasValue(resp)).toStrictEqual(false);

  spyOn1.mockRestore()

});


//Caso de prueba 11
test('Cuando llamo el servicio getInformationLine, userViewModel.getInformationLine(), debe retornar una respuesta con una propiedad error con valor 0', async () => {

  const responseDataSuccessMock = {
    status: 200,
    data: {
      error: 0,
      response: [{
        codigo: '-4',
        descripcion: 'Equipo registrado en base de datos negativa',
        imei: '111111111111111',
        marca: 'SAMSUNG',
        modelo: 'SM-A015M'
      }
    ]
    } 
  }

  const dataHeaders = {
    documentNumber: '1111111', 
    DocumentType: '1', 
    token: 'asf45asdas', 
    AccountId: '3185922269', 
    LineOfBusiness: '3', 
    email: 'pepitoperez@gmail.com'
  }

  let spyOn1 = jest.spyOn(userRepository, 'getInformationLine').mockReturnValueOnce(responseDataSuccessMock)
  const resp = await userViewModel.getInformationLine(dataHeaders)
  expect(resp.error).toStrictEqual(0);
  spyOn1.mockRestore()

});


//Caso de prueba 12
test('Cuando llamo el servicio getInformationLine pero el servicio arroja un error, userViewModel.getInformationLine(), debe retornar excepción con mensaje "Error consultando el servicio" ', async () => {

  let spyOn1 = jest.spyOn(userRepository, 'getInformationLine').mockReturnValueOnce({status:500})
  
  const dataHeaders = {
    documentNumber: '1111111', 
    DocumentType: '1', 
    token: 'asf45asdas', 
    AccountId: '3185922269', 
    LineOfBusiness: '3', 
    email: 'pepitoperez@gmail.com'
  }

  await expect(userViewModel.getInformationLine(dataHeaders)).rejects.toThrow(
    'Error consultando el servicio'
  );
  spyOn1.mockRestore()
});


//Caso de prueba 13
test('Cuando llamo el servicio getInformationLine pero el servicio arroja un error, userViewModel.getInformationLine(), debe retornar excepción con mensaje "Error consultando el servicio" ', async () => {

  
  const responseDataErrorMock = {
    status: 200,
    data: {
      error: 1,
      response: 'Error consultando el servicio, error de validación'
    } 
  }

  const dataHeaders = {
    documentNumber: '1111111', 
    DocumentType: '1', 
    token: 'asf45asdas', 
    AccountId: '3185922269', 
    LineOfBusiness: '3', 
    email: 'pepitoperez@gmail.com'
  }

  let spyOn1 = jest.spyOn(userRepository, 'getInformationLine').mockReturnValueOnce(responseDataErrorMock)
  await expect(userViewModel.getInformationLine(dataHeaders)).rejects.toThrow(
    'Error consultando el servicio, error de validación'
  );
  spyOn1.mockRestore()
});


//Caso de prueba 14
test('Cuando llamo el servicio getInformationLine pero el servicio arroja un error de validación de campos enviados, userViewModel.getInformationLine(), debe retornar excepción con mensaje "Error consultando el servicio, error de validación" ', async () => {

  const responseDataErrorMock = {
    status: 200,
    data: {
      error: 1,
      response: 'Error consultando el servicio, error de validación'
    } 
  }

  const dataHeaders = {
    documentNumber: '1111111', 
    DocumentType: '1', 
    token: 'asf45asdas', 
    AccountId: '3185922269', 
    LineOfBusiness: '3', 
    email: 'pepitoperez@gmail.com'
  }

  let spyOn1 = jest.spyOn(userRepository, 'getInformationLine').mockReturnValueOnce(responseDataErrorMock)
  await expect(userViewModel.getInformationLine(dataHeaders)).rejects.toThrow(
    'Error consultando el servicio, error de validación'
  );
  spyOn1.mockRestore()
});


//Caso de prueba 15
test('Cuando llamo el servicio getInformationLine y me responde el siguiente error en la descripción Parametros incompletos., userViewModel.getInformationLine(), debe retornar excepción con mensaje "Error consultando el servicio, Parametros incompletos"', async () => {

  const responseDataErrorMock = {
    status: 200,
    data: {
      error: 0,
      response: [{ descripcion: 'Parametros incompletos.' }]
    } 
  }

  const dataHeaders = {
    documentNumber: '1111111', 
    DocumentType: '1', 
    token: 'asf45asdas', 
    AccountId: '3185922269', 
    LineOfBusiness: '3', 
    email: 'pepitoperez@gmail.com'
  }

  let spyOn1 = jest.spyOn(userRepository, 'getInformationLine').mockReturnValueOnce(responseDataErrorMock)

  await expect(userViewModel.getInformationLine(dataHeaders)).rejects.toThrow(
    'Error consultando el servicio, parametros incompletos'
  );

  spyOn1.mockRestore()


})







