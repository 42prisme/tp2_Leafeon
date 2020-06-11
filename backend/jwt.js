const jwt = require('jsonwebtoken')
const jwtKey = '?@a-Z8W2tb]<EzqRKg,)5:{g3F^ZG_L#?]r-'
const jwtExpirySeconds = 900

module.exports = (userAccountService) => {
    return {
        validateJWT(req, res, next) {
            //console.log("header auth :", req.headers.authorization)
            if (req.headers.authorization === undefined) {
                //console.log("1 auth", req.headers)
                res.status(401).end()
                return
            }
            const token = req.headers.authorization.split(" ")[1];
            //console.log("jwt token:", token)
            jwt.verify(token, jwtKey, {algorithm: "HS256"},  async (err, user) => {
                if (err) {
                    //console.log("erreur",err)
                    res.status(401).end()
                    return
                }
                try {
                    req.user = await userAccountService.dao.getByLogin(user.login)
                    return next()
                } catch(e) {
                    console.log(e)
                    res.status(401).end()
                }

            })
        },
        generateJWT(login, time) {
            return jwt.sign({login}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: time
            })
        },
        getLoginJWT(req)
        {
            if (req.headers.authorization === undefined) {
                //console.log("1 auth", req.headers)
                res.status(401).end()
                return
            }
            return jwt.decode(req.headers.authorization.split(" ")[1]).login
        },
        getLoginJWTfromToken(req)
        {
            return jwt.decode(req).login
        }
    }
}
