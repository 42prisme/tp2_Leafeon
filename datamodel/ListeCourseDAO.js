

module.exports = class ListeCourseDAO {
    constructor(db)
    {
        this.db = db
        this.creat_table()
    }
    creat_table()
    {
        try {
            //list
            this.db.query("CREATE TABLE liste(id INT UNIQUE, name TEXT UNIQUE, archived BOOL)");
            //item
            this.db.query("CREATE TABLE item(id INT UNIQUE, list_id INT, name TEXT, quantity INT, valid BOOL)")
        }catch (err) {
            console.log(err)
        }
    }
    insert(listeCourse)
    {
        return this.db.query("INSERT INTO liste(id, name, archived) VALUES($1, $2, $3)", [listeCourse.id, listeCourse.name, listeCourse.archived])
    }
    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM liste")
                .then( res => resolve(res.rows))
                .catch(e => reject(e)))
    } //get all lists
    update(id) {}
    delete(id) {}

};