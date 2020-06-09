const acStatusDAO = require("../datamodel/acStatusDAO")

module.exports = class acStatus {
    constructor(db) {
        this.dao = new acStatusDAO(db)
    }
    addNewValidator(login, token)
    {
        this.dao.insert(login, token)
            .then()
    }
    renewValidator(login, token)
    {
        this.dao.update(login, token)
    }
}