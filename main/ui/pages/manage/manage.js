const userViewModel = require('../../../domain/userViewModel');

Page({
  data: {
    modalError: false,
    modalErrorMessage: '',
    isLoading: false,
    userEmail: '',
    accountsType2: [],
    accountsType3: [],
    typeAccountTab: 3
  },
  setAccountSelect({target}) {
    if (!this.isLoading) {
      this.setData({isLoading: true})
      // aqui se va a disparar un evento asincrono y despues se va a guardar en localstorage una información
      // url="/main/ui/pages/exmaple/exmaple"
      let data = target.dataset.item
      
      const { email } = userViewModel.getUserLogged();

      data.email = email 
      
      userViewModel.getInformationLine(data)
      .then((response) => {
        getApp().globalData.number = data.AccountId
        userViewModel.setLocalLine({...data, ...response.response[0]})
        my.navigateTo({
          url: '/main/ui/pages/exmaple/exmaple'
        })

        this.setData({
          isLoading: false
        })
      })
      .catch((e) => {
        this.setData({
          modalError: true,
          modalErrorMessage: e.message,
          isLoading: false
        })
      })

    }
  },
  setAccountSelectTmp({target}) {
    if (!this.isLoading) {
      this.setData({isLoading: true})
      // aqui se va a disparar un evento asincrono y despues se va a guardar en localstorage una información
      // url="/main/ui/pages/exmaple/exmaple"
      let data = target.dataset.item

      const { email, DocumentType, documentNumber } = userViewModel.getUserLogged();

      data.email = email
      
      userViewModel.getImeiReportHomologationV2({...data, ...{DocumentType, documentNumber}, isDuplicate: true})
      .then(({response}) => {
        const dataDevice = {
          imei: response.imei,
          marca: response.listHomologate[0].marketing_name,
          modelo: response.listHomologate[0].model_name
        }

        getApp().globalData.number = data.AccountId

        userViewModel.setLocalLine({...data, ...dataDevice})
        my.navigateTo({
          url: '/main/ui/pages/exmaple/exmaple'
        })

        this.setData({
          isLoading: false
        })
      })
      .catch((e) => {
        this.setData({
          modalError: true,
          modalErrorMessage: e.message,
          isLoading: false
        })
      })

    }
  },
  closeModalError() {
    this.setData({
      modalError: false,
      modalErrorMessage: ''
    })
  },
  selectTab({target}) {
    this.setData({
      typeAccountTab: target.dataset.tab
    })
  },
  startClearStorage() {
    userViewModel.startClearStorage()
    my.navigateTo({
      url: '/main/ui/pages/signUp/signUp'
    })
  },
  onLoad() {
    let { accounts } = userViewModel.getUserLogged();
    accounts = accounts.filter(x => ['2', '3'].includes(x.LineOfBusiness))
    if(accounts.length > 0){
      this.setData({
        typeAccountTab: accounts[0].LineOfBusiness,
        accountsType2: accounts.filter(x => x.LineOfBusiness === '2'),
        accountsType3: accounts.filter(x => x.LineOfBusiness === '3')
      })
    }
  },
});
