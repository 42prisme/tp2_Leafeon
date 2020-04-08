const Item = require('../datamodel/Item')

module.exports = (app, item) => {
    //get all items
    app.get("/item", async  (req, res) => {
        res.json(await item.dao.getAll())
    })
    //get item by id
    app.get("/item/id/:id", async (req ,res) => {
        try {
            const itm = await item.dao.getById(req.params.id)
            if (itm === undefined) return res.status(404).end()
            return res.json(itm)
        }catch (e) {
            res.status(400).end()
        }
    })
    //get item by list
    app.get("/list/id/:id",(req ,res) => {
        console.log("ID ---")
        try{
            item.dao.getListItems(req.params.id).then( result => {
                if (result === undefined) return res.status(404).end()
                //console.log(res.json(result))
                return  res.json(result)
            })
        }catch (e) {
            res.status(400).end()
        }
    })
    //insert item
    app.post("/item",(req ,res) => {
        const itm = req.body
        console.log(itm)
        if (!item.isValid(itm))return res.status(400).end()
        item.dao.insert(itm)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //delete Item
    app.delete("/item/id/:id", async (req, res) => {
        const itm = await item.dao.getById(req.params.id)
        if (itm === undefined) {
            return res.status(404).end()
        }
        item.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //update item
    app.put("/item", async (req, res) => {
        const itm = req.body
        console.log("itm: ", itm)
        if (!item.isValid(itm)){
            return res.status(400).end()
        }
        if (await item.dao.getById(itm.id) === undefined) {
            return res.status(404).end()
        }
        item.dao.update(itm)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}