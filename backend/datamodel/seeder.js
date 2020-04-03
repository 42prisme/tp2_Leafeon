const List = require('./ListeCourse');
const Item = require('./Item')

module.exports = (list, item) => {
    return new Promise(async (resolve, reject) => {
        try {
            await list.dao.db.query("DROP TABLE item")
            await list.dao.db.query("DROP TABLE list")
            console.log("create list table")
            await list.dao.db.query("CREATE TABLE list(id BIGINT UNIQUE, name TEXT UNIQUE, archived BOOL)")
            // INSERTs
            for (let i = 0; i < 2; i++) {
                await list.dao.insert(new List(i,"lst_name"+i))
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
    }).catch( e => {
        console.log(e)
    })
}