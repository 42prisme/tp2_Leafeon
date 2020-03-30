module.exports = (app, list) => {
    app.get("/ListeCourse", async  (req, res) => {
        res.json(await list.dao.getAll())
    })
    app.get("/", async (req ,res) => {
        
    })
}