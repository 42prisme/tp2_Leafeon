const List = require('../datamodel/ListeCourse')
const jwt = require('../jwt')

module.exports = (app, list, jwt) => {
    //get lists
    app.get("/list", jwt.validateJWT, (req, res) => {
        list.dao.getAll(req.user.name).then( result => {
            res.json(result)
        }).catch(e => console.error(e))
    })
    //get current lists
    app.get("/list/current", jwt.validateJWT, (req, res) => {
        //console.log("disp current :",req.user.name)
        list.dao.getCurrent(req.user.name).then( result => {
            res.json(result)
        }).catch(e => console.error(e))
    })
    //get archived lists
    app.get("/list/archived", jwt.validateJWT, (req, res) => {
        list.dao.getArchived(req.user.name).then( result => {
            res.json(result)
            console.log(result)
        }).catch(e => console.error(e))
    })
    //get list
    app.get("/list/:id", jwt.validateJWT, (req, res) => {
        //console.log("req",req)
        list.dao.getById(req.params.id).then( result => {
            res.json(result)
        }).catch(e => console.error(e))
    })
    //add list
    app.post("/list", jwt.validateJWT, (req ,res) => {
        const lst = req.body
        if (!list.isValid(lst))return res.status(400).end()
        list.dao.insert(lst, req.user.name)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    //update list
    app.put("/list/update", jwt.validateJWT, (req, res) => {
        list.dao.update(req.body, req.user.name)
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
    //renew token
    app.post('/list/renewauth', jwt.validateJWT, (req, res) => {
        console.log("the req", req.body.user)
        res.json({'token' : jwt.generateJWT(req.body.user)})
    })
}