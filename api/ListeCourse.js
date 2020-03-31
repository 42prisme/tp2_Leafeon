module.exports = (app, list) => {
    app.get("/list", async  (req, res) => {
        res.json(await list.dao.getAll())
    })
    app.get("/", async (req ,res) => {
        res.json()
    })
}