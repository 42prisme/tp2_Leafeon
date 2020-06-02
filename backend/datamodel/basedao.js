module.exports = class BaseDAO {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    delete(id) {
        return this.db.query(`DELETE FROM ${this.tablename} WHERE id=$1`, [ id ])
    }
    /*getById(id) {//, user
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM ${this.tablename} WHERE id=$1 `, [ id])//AND owner=$2 //, user
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }*/
    set_userName(p_usr)
    {
        this.user = p_usr
    }
}