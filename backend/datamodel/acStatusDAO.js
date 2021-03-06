const BaseDAO = require('./basedao')

module.exports = class acStatusDAO extends BaseDAO{
    constructor(db) {
        super(db, "item")
    }
    remove(p_name)
    {
        this.db.query("DELETE FROM acStatus WHERE name=$1 ",[p_name])
    }
    insert(login, token)
    {
        return this.db.query("INSERT INTO acStatus(name, token) VALUES( $1, $2)", [login, token])
    }
    update(login, token)
    {
        return this.db.query("UPDATE acStatus SET token=$1 WHERE name=$2", [token, login])
    }
}