const User = require('../datamodel/User')

module.exports = (app, user, jwt) => {
    //get all
    app.get("/users", jwt.validateJWT, async  (req, res) => {
        res.json(await user.dao.getAll())
    })
    //insert user
    app.post("/user",(req ,res) => {
        const usr = req.body
        console.log(usr)
        if (!user.isValid(usr))return res.status(400).end()
        user.dao.insert(usr)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //delete user
    app.delete("/user/id/:id", jwt.validateJWT, async (req, res) => {
        const usr = await user.dao.getById(req.params.id)
        if (usr === undefined) {
            return res.status(404).end()
        }
        user.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //update item
    app.put("/user", jwt.validateJWT, async (req, res) => {
        const usr = req.body
        console.log("itm: ", usr)
        if (!user.isValid(usr)){
            return res.status(400).end()
        }
        if (await user.dao.getById(usr.id) === undefined) {
            return res.status(404).end()
        }
        user.dao.update(usr)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.post('/user/auth', (req, res) => {
        const { login, password } = req.body
        console.log(req.body)
        if ((login === undefined) || (password === undefined)) {
            console.log(req.body)
            res.status(400).end()
            return
        }
        user.validatePassword(login, password)
            .then(autheticated => {
                if (!autheticated) {
                    res.status(401).end()
                    return
                }
                res.json({'token': jwt.generateJWT(login)})
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })

    })
}