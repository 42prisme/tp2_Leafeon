const itemDAO = require("../datamodel/ItemDAO")

module.exports = class itemService {
    constructor(db) {
        this.dao = new itemDAO(db)
    }
    isValid(item)
    {
        console.log("valid? ",item.id)
        if (item.id === undefined || item.id === null || isNaN(item.id)) return false
        console.log(item.list_id)
        if (item.list_id === undefined || item.list_id === null || isNaN(item.list_id)) return false
        item.name = item.name.trim()
        console.log(item.name)
        if (item.name === "" || item.name === undefined || item.name === null) return false
        console.log(item.quantity)
        if (isNaN(item.quantity)) return false
        console.log("isValid!!")
        return true
    }
}