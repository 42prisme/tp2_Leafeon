class UserAPI extends BaseAPI {
    constructor() {
        super("user")
    }
    authenticate(login, password) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        return new Promise((resolve, reject) => fetch(`${this.url}/auth`, {
            method: "POST",
            headers: this.headers,
            body: `login=${login}&password=${password}`
        }).then(res => {
            if (res.status === 200) {
                resolve(res.json())
            }
            if (res.status === 207) {
                resolve(207)
            }else {
                reject(res.status)
            }
        }).catch(err => reject(err)))
    }
    createAccount(login, email, password)
    {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        return new Promise((resolve, reject) => fetch(`${this.url}/add`,{
            method: "POST",
            headers: this.headers,
            body: `login=${login}&password=${password}&email=${email}`
        }).then(res => {
            if (res.status === 200)
            {
                resolve(res)
            }else{
                reject(res.status)
            }
        }).catch(err => reject(err)))
    }
}