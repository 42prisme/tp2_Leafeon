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
        return !(usr.name === "" || usr.name === undefined || usr.name === null);

    }
    async validatePassword(login, password) {
        const user = await this.dao.getByLogin(login.trim())
        console.log(user)
        console.log("challenge", user.password, this.hashPassword(password))
        if(user.status)
        {
            return this.comparePassword(password, user.password)
        }
        return "unactivated"
    }
    comparePassword(password, hash) {
        console.log(password, hash)
        return bcrypt.compareSync(password, hash)
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 10)  // 10 : cost factor -> + élevé = hash + sûr
    }
    insert_validation(p_body)
    {
        if (p_body.login === undefined || p_body.email === undefined || p_body.password === undefined) return false
        p_body.login = p_body.login.trim()
        p_body.password = p_body.password.trim()
        return !(p_body.login === "" || p_body.email === "" || p_body.password === "");

    }

    insert(login, email, password) {
        return this.dao.insert(login, email, password)
    }
}