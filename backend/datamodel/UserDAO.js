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

    getByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM users WHERE name=$1", [ login ])
                .then(res => {resolve(res.rows[0])} )
                .catch(e => reject(e)))
    }

    insert(login, email, password, status)
    {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO users(name, email, password, status) VALUES( $1, $2, $3, $4)", [login, email, password, status])
                .then( res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    update(usr)
    {
        return this.db.query("UPDATE users SET name=$2, password=$3 WHERE id=$1", [usr.id, usr.name, usr.password])
    }

    activate(login)
    {
        return new Promise((resolve, reject) => {
            this.db.query("UPDATE users SET status=$1 WHERE name=$2", [true, login])
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }
}
