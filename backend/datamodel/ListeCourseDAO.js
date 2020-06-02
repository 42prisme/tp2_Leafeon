const BaseDAO = require('./basedao')

module.exports = class ListeCourseDAO extends BaseDAO{
    constructor(db)
    {
        super(db, "list")
    }
    insert(list, user)
    {
        list.owner = user
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO list(id, name, owner, archived) VALUES($1, $2, $3, $4)", [list.id, list.name, list.owner, list.archived])
                .then( res => resolve(res.rows))
                .catch( e => reject(e)))
    }
    getCurrent(user)
    {
        return new Promise((resolve, reject) => {
            console.log("user :",user)
            this.db.query("SELECT * FROM list where archived = False AND owner = $1",[user])
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }
    getById(p_id)
    {
        return new Promise(((resolve, reject) => {
            this.db.query('SELECT * FROM list WHERE id=$1 ',[p_id])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e))
        }))
    }
    getOwnerById(p_id)
    {
        return new Promise(((resolve, reject) => {
            this.db.query('SELECT owner FROM list WHERE id=$1 ',[p_id])
                .then(res => resolve(res.rows[0].owner) )
                .catch(e => reject(e))
        }))
    }
    getArchived(user)
    {
        return new Promise((resolve, reject) => {
            console.log("user :",user)
            this.db.query("SELECT * FROM list where archived = True AND owner = $1",[user])
                .then( res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }
    getAll(user)
    {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list WHERE owner = $1",[user])//WHERE owner = $1,[user]
                .then( res => resolve(res.rows))
                .then( res => console.log(res))
                .catch(e => reject(e)))
    }

    update(lst, user)
    {
        console.log("update: ",lst.id, lst.name, lst.archived)
        return this.db.query("UPDATE list SET name=$2, archived=$3 WHERE id=$1 AND owner=$4",[lst.id, lst.name, lst.archived, user])
    }
};