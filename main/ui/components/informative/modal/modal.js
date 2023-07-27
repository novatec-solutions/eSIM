Component({
  mixins: [],
  props: {
    atts: {
      name: '',
      icon: '', // info, error, success, warm
      title: '',
      text: '',
      modalOpened: false
    }
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    closeModal() {
      this.props.onConfirm(this.props.atts)
    }
  },
});
