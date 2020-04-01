module.exports = (app, list) => {
    //get lists
    app.get("/list", async  (req, res) => {
        res.json(await list.dao.getAll())
    })
    //get current list
    app.get("/list/current", async  (req, res) => {
        console.log("current ---")
        res.json(await list.dao.getCurrent())
    })
    //get archived list
    app.get("/list/archived", async  (req, res) => {
        res.json(await list.dao.getArchived())
    })
    //add list
    app.post("/list", async (req ,res) => {
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
    app.delete("/list/:id", async (req, res) => {
        const lst = await list.dao.getById(req.params.id)
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
}