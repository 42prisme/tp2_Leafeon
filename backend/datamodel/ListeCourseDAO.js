const BaseDAO = require('./basedao')

module.exports = class ListeCourseDAO extends BaseDAO{
    constructor(db)
    {
        super(db, "list")
    }
    insert(list)
    {
        console.log("dao list ",list)
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO list(id, name, archived) VALUES($1, $2, $3)", [list.id, list.name, list.archived])
                .then( res => resolve(res.rows))
                .catch( e => reject(e)))
    }
    getCurrent()
    {
        return new Promise(((resolve, reject) => {
            this.db.query("SELECT * FROM list WHERE archived = false")
                .then( res => resolve(res.rows))
                .catch(e => reject(e))
        }))
    }
    getArchived()
    {
        return new Promise(((resolve, reject) => {
            this.db.query("SELECT * FROM list WHERE archived = true")
                .then( res => resolve(res.rows))
                .catch(e => reject(e))
        }))
    }
    getAll()
    {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list")
                .then( res => resolve(res.rows))
                .catch(e => reject(e)))
    } //get all lists
    update(lst)
    {
        return this.db.query("UPDATE list SET name=$2, valid=$3 WHERE id=$1",[lst.id, lst.name, lst.valid])
    }
};