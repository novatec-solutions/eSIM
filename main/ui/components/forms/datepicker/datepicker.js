Component({
  mixins: [],
  data: {
    valuelabel: ''
  },
  props: {
    style: '',
    type: 'date',
    field: '',
    value: ''
  },
  methods: {
    revealDatepicker() {

      let dateNow =  new Date()
      dateNow.setDate(dateNow.getDate()).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
      }).split('/').reverse().join('-')

      let propsCalendar = {
        currentDate: '',
        startDate: '',
        endDate: dateNow,
        success: (res) => {
          this.props.onChange({...res, field: this.props.field})
        },
        fail(fail) {
          console.log(fail, 'fail')
        }
      }

      if(this.props.type === 'time' ) {
        propsCalendar = {...propsCalendar, ...{
            format: 'HH:mm',
            currentDate: '00:00',
            startDate: '00:00',
            endDate: '23:59',
          }
        }
      }

      if(this.props.value !== '' ) {
        propsCalendar = {...propsCalendar, ...{
            currentDate: this.props.type === 'time' ? this.props.value : this.props.value.split('/').reverse().join('-')
          }
        }
      }

      my.datePicker(propsCalendar);

    },
    updateLabel() {
      if (this.props.value !== '') {
      
        if(this.props.type === 'time' ) { 
          this.setData({valuelabel: this.props.value})
        } else {
          const date = new Date(this.props.value + ' 00:00:00').toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
          this.setData({valuelabel: date})
        }
      }
    }
  },
  didMount() {
    this.updateLabel()
  },
  didUpdate() {
    this.updateLabel()
  }
})
