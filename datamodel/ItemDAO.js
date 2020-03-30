module.exports = class ItemDAO {
    constructor(db) {
        this.db = db
    }
    insert(item)
    {
        return this.db.query("INSERT INTO item(id, list_id, name, quantity, valid) VALUES( $1, $2 $3, $4, $5, $6,)", [item.id, item.list_id, item.name, item.quantity, item.valid])
    }
    getAll(list) {
        return this.db.query("SELECT * FROM item")
    } //get all items from list
    get(id) {}
    udpate(id) {}
    delete(id){}
};
