const BaseDAO = require('./basedao')

module.exports = class UserDAO extends BaseDAO {
    constructor(db) {
        super(db, "users")
    }
    getAll()
    {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM users")
                .then( res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    insert(usr)
    {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO users(id, name, password) VALUES( $1, $2, $3)", [usr.id, usr.name, usr.password])
                .then( res => resolve(res.rows))
                .catch(e => reject(e)))
    }   //CREATE TABLE user(id BIGINT UNIQUE, name TEXT UNIQUE, password BOOL)
    update(usr)
    {
        return this.db.query("UPDATE users SET name=$2, password=$3 WHERE id=$1",[usr.id, usr.name, usr.password])
    }
}
