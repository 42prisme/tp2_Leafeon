const userDAO = require("../datamodel/UserDAO")
const User = require("../datamodel/User")
const bcrypt = require('bcrypt')

module.exports = class UserService{
    constructor(db) {
        this.dao = new userDAO(db)
    }
    isValid(usr){
        console.log(usr.id)
        if (usr.id === undefined || usr.id === null || isNaN(usr.id)) return false
        usr.name = usr.name.trim()
        console.log(usr.name)
        if (usr.name === "" || usr.name === undefined || usr.name === null) return false
        return true
    }
    async validatePassword(login, password) {
        const user = await this.dao.getByLogin(login.trim())
        console.log("challenge", user.password, this.hashPassword(password))
        return this.comparePassword(password, user.password)
    }
    comparePassword(password, hash) {
        console.log(password, hash)
        return bcrypt.compareSync(password, hash)
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 10)  // 10 : cost factor -> + élevé = hash + sûr
    }
    insert(id, login, password) {
        return this.dao.insert(new User(id, login, this.hashPassword(password)))
    }
}