const List = require('./ListeCourse');
const Item = require('./Item');
const User = require('./User');
const hash = require('../services/User')
const mail = require('../services/mailer')

module.exports = (list, item, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            await list.dao.db.query("DROP TABLE IF EXISTS item")
            await list.dao.db.query("DROP TABLE IF EXISTS list")
            await list.dao.db.query("DROP TABLE IF EXISTS users")
            await list.dao.db.query("DROP TABLE IF EXISTS acStatus")
            console.log("create user table")
            await user.dao.db.query("CREATE TABLE users(id SERIAL UNIQUE, name TEXT UNIQUE, email TEXT, password TEXT, status BOOL)")
            const Hash = new hash()
            //console.log("password hashing",Hash.hashPassword("Jackson"))
            await user.dao.insert("hugo","hugo@mail.com", Hash.hashPassword("Jackson"),false)
            await user.dao.insert("admin","hugo@mail.com", Hash.hashPassword("admin"),true)
            console.log("create list table")
            await list.dao.db.query("CREATE TABLE list(id BIGINT UNIQUE, name TEXT UNIQUE, owner TEXT, archived BOOL)")
            // INSERTs
            for (let i = 0; i < 2; i++) {
                await list.dao.insert(new List(i,"lst_name"+i),"hugo")
            }
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
            } else {
                reject(e)
            }
            return
        }
        try {
            //await list.dao.db.query("DROP TABLE item")
            console.log("create item table")
            await item.dao.db.query("CREATE TABLE item(id BIGINT UNIQUE, list_id BIGINT, name TEXT, quantity INT, valid BOOL)")
            // INSERTs
            for (let i = 0; i < 2; i++) {
                await item.dao.insert(new Item(i, 0, "name"+i, i+4))
            }
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
            } else {
                reject(e)
            }
            return
        }
        //make activation tab
        try{
            //const email = new mail()
            //email.send_email()
            await user.dao.db.query("CREATE TABLE acStatus(name TEXT UNIQUE, token TEXT UNIQUE)")
        }catch (e) {

        }
    }).catch( e => {
        console.log(e)
    })
}