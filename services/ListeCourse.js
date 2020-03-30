const ListeCourseDAO = require("../datamodel/ListeCourseDAO")

module.exports = class ListService {
    constructor(db) {
        this.dao = new ListeCourseDAO(db)
    }
}