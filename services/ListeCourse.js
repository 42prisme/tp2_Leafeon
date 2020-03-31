const ListeCourseDAO = require("../datamodel/ListeCourseDAO")

module.exports = class ListService {
    constructor(db) {
        this.dao = new ListeCourseDAO(db)
    }
    isValid(lst)
    {
        console.log(lst.id)
        if (lst.id === undefined || lst.id === null || isNaN(lst.id)) return false
        lst.name = lst.name.trim()
        console.log(lst.name)
        if (lst.name === "" || lst.name === undefined || lst.name === null) return false
        return true
    }
}