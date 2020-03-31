const BaseDAO = require('./basedao')

module.exports = class ListeCourseDAO extends BaseDAO{
    constructor(db)
    {
        super(db, "list")
    }
    insert(list)
    {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO list(id, name, archived) VALUES($1, $2, $3)", [list.id, list.name, list.archived])
                .then( res => resolve(res.rows))
                .catch( e => reject(e)))
    }
    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list")
                .then( res => resolve(res.rows))
                .catch(e => reject(e)))
    } //get all lists
};