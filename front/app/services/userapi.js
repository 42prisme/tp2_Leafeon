class Userapi extends BaseAPI {
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
    //`id=${user.id}&name=${user.name}&email=${user.email}&password=${user.email}&status=${user.email}`
    updateUser(user)
    {
        console.log("user",user)
        this.NewHeader()
        this.headers.set("Content-Type", `application/json`)
        return new Promise((resolve, reject) => fetch(`${this.url}/reset`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(user)
        }).then(res => {
            if (res.status === 200)
            {
                resolve(res)

            }else{
                reject(res.status)
            }
        }).catch(err => reject(err)))
    }
    getUser(login)
    {
        this.NewHeader()
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        return fetchJSON(`${this.url}/getId/${login}`, this.token)
    }
}