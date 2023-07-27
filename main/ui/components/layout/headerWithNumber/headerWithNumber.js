const hasValue = require("/main/domain/utils/hasValue");
const userViewModel = require('/main/domain/userViewModel');

Component({
  mixins: [],
  data: {
    number: ''
  },
  props: {
    title: 'Página'
  },
  didMount() {
    const resp = userViewModel.getLineSelect();
    this.setData({
      number: hasValue(resp.AccountId) ? this.formatNumberWithSpaces(resp.AccountId) : ''
    })
  },
  methods: {
    formatNumberWithSpaces(number) {
      console.log(number, 'dfssdsdsd')
      return `${number.substr(0,3)} ${number.substr(3,3)} ${number.substr(6,4)}`
    }
  },
  
});
