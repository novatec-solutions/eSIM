module.exports = class User {
  static instance;
  constructor (username, name, lastname, password) {
    this.username = username;
    this.name = name;
    this.lastname = lastname;
    this.password = password;
    if (User.instance) {
      return User.instance
    } else {
        User.instance = this
    }
  }
}