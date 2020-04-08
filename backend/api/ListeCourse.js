const List = require('../datamodel/ListeCourse')

module.exports = (app, list, jwt) => {
    //get lists
    app.get("/list", jwt.validateJWT, (req, res) => {
        list.dao.getAll().then( result => {
            res.json(result)
        }).catch(e => console.error(e))
    })
    //get current lists
    app.get("/list/current", jwt.validateJWT, (req, res) => {
        list.dao.getCurrent().then( result => {
            res.json(result)
        }).catch(e => console.error(e))
    })
    //get archived lists
    app.get("/list/archived", jwt.validateJWT, (req, res) => {
        list.dao.getArchived().then( result => {
            res.json(result)
            console.log(result)
        }).catch(e => console.error(e))
    })
    //get list
    app.get("/list/:id", jwt.validateJWT, (req, res) => {
        list.dao.get(req.params.id).then( result => {
            res.json(result)
            console.log("good list")
        }).catch(e => console.error(e))
    })
    //add list
    app.post("/list", jwt.validateJWT, (req ,res) => {
        const lst = req.body
        if (!list.isValid(lst))return res.status(400).end()
        list.dao.insert(lst)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //update list
    app.put("/list/update", jwt.validateJWT, (req, res) => {
        console.log(req.body.rows[0])
        let Nlst = new List(req.body.rows[0].id, req.body.rows[0].name)
        Nlst.archived = true
        list.dao.update(req.body.rows[0])
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //delete list
    app.delete("/list/:id", jwt.validateJWT, (req, res) => {
        list.dao.getById(req.params.id).then( lst => {
            if (lst === undefined) {
                return res.status(404).end()
            }
            list.dao.delete(req.params.id)
                .then(res.status(200).end())
                .catch(e => {
                    console.log(e)
                    res.status(500).end()
                })
        })
    })
}