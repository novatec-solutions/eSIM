module.exports = class Login {
  static instance;
  constructor (username, password) {
    this.username = username;
    this.password = password;
    if (Login.instance) {
      return Login.instance
    } else {
        Login.instance = this
    }
  }
}