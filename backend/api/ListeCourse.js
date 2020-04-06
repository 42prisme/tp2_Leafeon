module.exports = (app, list) => {
    //get lists
    app.get("/list", (req, res) => {
        list.dao.getAll().then( result => {
            res.json(result)
        }).catch(e => console.error(e))
    })
    //get current list
    app.get("/list/current", (req, res) => {
        list.dao.getCurrent().then( result => {
            res.json(result)
        }).catch(e => console.error(e))
    })
    //get archived list
    app.get("/list/archived", (req, res) => {
        list.dao.getArchived().then( result => {
            res.json(result)
        }).catch(e => console.error(e))
    })
    //add list
    app.post("/list", (req ,res) => {
        const lst = req.body
        if (!list.isValid(lst))return res.status(400).end()
        list.dao.insert(lst)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //delete list
    app.delete("/list/:id", (req, res) => {
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