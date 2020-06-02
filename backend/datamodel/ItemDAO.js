const BaseDAO = require('./basedao')

module.exports = class ItemDAO extends BaseDAO{
    constructor(db) {
        super(db, "item")
    }
    insert(itm)
    {
        //console.log("dao item",itm)
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO item(id, list_id, name, quantity, valid) VALUES( $1, $2, $3, $4, false)", [itm.id, itm.list_id, itm.name, itm.quantity])
                .then( res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getAll()
    {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM item")
                .then( res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getById(p_id)
    {
        return new Promise((resolve, reject) =>
            this.db.query('SELECT * FROM item WHERE id=$1 ',[p_id])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }
    getListItems(p_id)
    {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM item where list_id = $1",[p_id])
                .then( res => resolve(res.rows))
                .catch( e => reject(e))
        })
    }
    update(itm)
    {
        //console.log("valid", itm.valid)
        return this.db.query("UPDATE item SET name=$2, quantity=$3, valid=$4 WHERE id=$1",[itm.id, itm.name, itm.quantity, itm.valid])
    }
    deleteListItems(p_id)
    {
        return this.db.query('DELETE FROM item WHERE list_id=$1',[p_id])
    }
};
