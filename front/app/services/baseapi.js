const serviceBaseUrl = "http://localhost:3333"

class BaseAPI {
    constructor(url) {
        this.url = `${serviceBaseUrl}/${url}`
        this.token = sessionStorage.getItem("token")
        console.log("token",this.token)
        this.headers = new Headers()
        if (this.token !== undefined) {
            this.headers.append("authorization", `Bearer ${this.token}`)
            //this.headers.append("Content-Type", `application/json`)
        }
    }
}