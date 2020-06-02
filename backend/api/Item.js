const Item = require('../datamodel/Item')

module.exports = (app, list, item, jwt) => {
    //get all items
    app.get("/item", jwt.validateJWT, async  (req, res) => {
        res.json(await item.dao.getAll())
    })
    //get item by id
    app.get("/item/id/:id", jwt.validateJWT, async (req ,res) => {
        try {
            const itm = await item.dao.getById(req.params.id)
            const login = jwt.getLoginJWT(req)
            const owner = await list.dao.getOwnerById(itm.list_id)
            if (owner !== login) return res.status(403).end()   //unauthorised access
            if (itm === undefined) return res.status(500).end()
            return res.json(itm)
        }catch (e) {
            res.status(400).end()
        }
    })
    //get item by list
    app.get("/list/id/:id", jwt.validateJWT, (req ,res) => {
        console.log("ID ---")
        try{
            item.dao.getListItems(req.params.id).then( async result => {
                if (result === undefined) return res.status(400).end()
                const login = jwt.getLoginJWT(req)
                const owner = await list.dao.getOwnerById(req.params.id)
                if (login === owner)
                {
                    return  res.json(result)
                }
                return res.status(403).end()    //unauthorised aces could raise a flag for unusual access to api
            })
        }catch (e) {
            res.status(400).end()
        }
    })
    //insert item
    app.post("/item", jwt.validateJWT, async (req ,res) => {
        const itm = req.body
        if (!item.isValid(itm))return res.status(400).end()
        const login = jwt.getLoginJWT(req)
        const owner = await list.dao.getOwnerById(itm.list_id)
        if (login !== owner) return res.status(403).end()
        item.dao.insert(itm)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //delete Item
    app.delete("/item/id/:id", jwt.validateJWT, async (req, res) => {
        const itm = await item.dao.getById(req.params.id)
        if (itm === undefined) return res.status(400).end()
        const login = jwt.getLoginJWT(req)
        const owner = await list.dao.getOwnerById(itm.list_id)
        console.log("owner", owner)
        if (login !== owner) return res.status(403).end()
        item.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //update item
    app.put("/item", jwt.validateJWT, async (req, res) => {
        const itm = req.body
        if (!item.isValid(itm)) return res.status(400).end()
        const login = jwt.getLoginJWT(req)
        const owner = await list.dao.getOwnerById(itm.list_id)
        if( login !== owner) return res.status(403).end()
        if (await item.dao.getById(itm.id) === undefined) return res.status(400).end()

        item.dao.update(itm)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}