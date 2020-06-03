const serviceBaseUrl = "http://localhost:3333"

class BaseAPI {
    constructor(url) {
        this.url = `${serviceBaseUrl}/${url}`
        this.token = sessionStorage.getItem("token")
        //console.log("token",this.token)
        this.headers = new Headers()
        if (this.token !== undefined) {
            this.headers.append("authorization", `Bearer ${this.token}`)
        }
    }
    async renew(user, token)
    {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        return new Promise((resolve, reject) => fetch(`${this.url}/renewauth`, {
            method: "POST",
            headers: this.headers,
            body: `user=${user}&token=${token}`
        }).then(res => {
            if (res.status === 200) {
                res.json().then(res => {
                    /*console.log("reset token", res.token)
                    this.token = res.token
                    this.headers.set("authorization", `Bearer ${this.token}`)*/
                    resolve(this.token)
                })
            } else {
                reject(res.status)
            }
        }).catch(err => reject(err)))
    }
    NewHeader()
    {
        this.token = sessionStorage.getItem("token")
        console.log("token",this.token)
        this.headers = new Headers()
        if (this.token !== undefined) {
            this.headers.append("authorization", `Bearer ${this.token}`)
        }
    }
}