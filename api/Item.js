const Item = require('../datamodel/Item')

module.exports = (app, item) => {
    app.get("/item", async  (req, res) => {
        res.json(await item.dao.getAll())
    })
    app.get("/item/:id", async (req ,res) => {
        try {
            const itm = await item.dao.getById(req.params.id)
            if (itm === undefined) return res.status(404).end()
            return res.json(itm)
        }catch (e) {
            res.status(400).end()
        }
    })
    app.get("/liste/:id", async (req ,res) => {
        try{
            const itmList = await item.dao.getListItems(req.params.id)
            if (itmList === undefined) return res.status(404).end()
            return  res.json(itmList)
        }catch (e) {
            res.status(400).end()
        }
    })
    app.post("/item",(req ,res) => {
        const itm = req.body
        if (!item.isValid(itm))return res.status(400).end()
        item.dao.insert(itm)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}