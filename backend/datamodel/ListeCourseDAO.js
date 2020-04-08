const BaseDAO = require('./basedao')

module.exports = class ListeCourseDAO extends BaseDAO{
    constructor(db)
    {
        super(db, "list")
    }
    insert(list)
    {
        //console.log("dao list ",list)
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO list(id, name, archived) VALUES($1, $2, $3)", [list.id, list.name, list.archived])
                .then( res => resolve(res.rows))
                .catch( e => reject(e)))
    }
    getCurrent()
    {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM list where archived = False")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }
    getArchived()
    {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM list where archived = True")
                .then( res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }
    getAll()
    {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list")
                .then( res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    get(p_id)
    {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list WHERE id=$1",[p_id])
                .then( res => resolve(res))
                .catch(e => reject(e)))
    }
    update(lst)
    {
        console.log("update: ",lst.id, lst.name, lst.archived)
        return this.db.query("UPDATE list SET name=$2, archived=$3 WHERE id=$1",[lst.id, lst.name, lst.archived])
    }
};