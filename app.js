App({
  onLaunch(options) {
    this.getSistemInfo()
  },
  async getSistemInfo() {
    my.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.globalData.systemInfo = res
      }
    })
  },
  globalData: {
    number: '',
    systemInfo: {},
    miniAliUiLang: 'en-US',
    imeiDuplicateData: {
      linesAssociated: []
    },
    dataForRegisterImei: {},
    validatelineResourceElement: {}
  },
});
