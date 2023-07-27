const userViewModel = require('../../../domain/userViewModel');
const validEmailUtil = require('../../../domain/utils/validateEmail');
const hasValue = require('../../../domain/utils/hasValue');

Page({
  data: {
    email: '',
    password: '',
    isOpenModal: false,
    titleMessage: '',
    contentMessage: '',
    isLoading: false
  },
  
  onEmailInput(e) {
    this.setData({
      email: e.detail.value
    })
  },
  onPasswordInput(e){
    this.setData({
      password: e.detail.value
    })
  },
  
 // Funcion para el login
  signUp(){
    // Validación de campos de formulario del Login: 
    // Valid Email util la cual mediante regex valida si el campo email cumple en cuanto a estructura

    if(this.data.isLoading)  return;

    if ( !validEmailUtil.validEmail(this.data.email) || this.data.password === ""){
      my.alert({
        title: 'Campos obligatorios',
        content: 'Los campos de usuario y contraseña son obligatorios',
        buttonText: 'OK'
      })
      return;
    } else {
      this.setData({
        isLoading: true
      })
      userViewModel.signUp(this.data.email, this.data.password).then(resp => {
        if(resp.error === 1) {
          my.alert({
            title: 'Ups, algo pasó.',
            content: resp.response,
            buttonText: 'Ok'
          })
        } else if(resp.error === 0) {
          my.redirectTo({
            url: '/main/ui/pages/manage/manage'
          })
        }
        this.setData({
          isLoading: false
        })
      })
    }
  },
  onLoad() {
    this.setData({isLoading: true})

    const data = userViewModel.getUserLogged();
    // Comprobamos si hay data del usuario
    if (hasValue(data)) {
      my.redirectTo({
        url: '/main/ui/pages/manage/manage'
      })
    } else {
      this.setData({isLoading: false})
    }
    
  },

});
