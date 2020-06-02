const List = require('../datamodel/ListeCourse')

module.exports = (app, list, item, jwt) => {
    //get lists
    app.get("/list", jwt.validateJWT, (req, res) => {
        const login = jwt.getLoginJWT(req)
        if (login !== req.user.name) return res.status(403).end()
        list.dao.getAll(req.user.name).then(result => {
            res.json(result)
        }).catch(e => console.error(e))
    })
    //get current lists
    app.get("/list/current", jwt.validateJWT, (req, res) => {
        const login = jwt.getLoginJWT(req)
        console.log("make me happy:", req.user.name)
        if (login !== req.user.name) return res.status(403).end()
        list.dao.getCurrent(req.user.name).then(result => {
            res.json(result)
        }).catch(e => console.error(e))
    })
    //get archived listsbg
    app.get("/list/archived", jwt.validateJWT, (req, res) => {
        const login = jwt.getLoginJWT(req)
        if (login !== req.user.name) return res.status(403).end()
        list.dao.getArchived(req.user.name).then(result => {
            res.json(result)
            console.log(result)
        }).catch(e => console.error(e))
    })
    //get list
    app.get("/list/:id", jwt.validateJWT, (req, res) => {
        const login = jwt.getLoginJWT(req)
        if (login !== req.user.name) return res.status(403).end()
        list.dao.getById(req.params.id, jwt.getLoginJWT(req)).then(result => {
            res.json(result)
            console.log("good list", result)
        }).catch(e => console.error(e))
    })
    //add list
    app.post("/list", jwt.validateJWT, (req, res) => {
        const lst = req.body
        if (!list.isValid(lst)) return res.status(400).end()
        const login = jwt.getLoginJWT(req)
        if (login !== req.user.name) return res.status(403).end()
        list.dao.insert(lst, req.user.name)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //update list
    app.put("/list/update", jwt.validateJWT, (req, res) => {
        const login = jwt.getLoginJWT(req)
        if (login !== req.user.name) return res.status(403).end()
        list.dao.update(req.body, req.user.name)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //delete list
    app.delete("/list/:id", jwt.validateJWT, async (req, res) => {
        const lst = await list.dao.getById(req.params.id)
        const login = jwt.getLoginJWT(req)
        if (lst === undefined) return res.status(400).end()
        if (login !== lst.owner) return res.status(403).end()
        item.dao.deleteListItems(req.params.id)
        list.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}