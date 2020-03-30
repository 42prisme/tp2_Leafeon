module.exports = (app, item) => {
    app.get("/item", async  (req, res) => {
        res.json(await item.dao.getAll())
    })
    app.get("/", async (req ,res) => {
        res.json()
    })
}