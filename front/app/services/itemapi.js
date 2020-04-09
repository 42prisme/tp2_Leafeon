//const ServiceBaseUrl = "http://localhost:3333/item";

class Itemapi extends BaseAPI {
    constructor() {
        super("item");
    }
    getAll()
    {
        return fetchJSON(this.url, this.token)
    }
    get(p_id)
    {
        return fetchJSON(`${this.url}/id/${p_id}`, this.token)
    }
    delete(p_id)
    {
        return fetch(`${this.url}/id/${p_id}`, { method: 'DELETE', headers: this.headers})
    }
    insert(p_item)
    {
        console.log("itm",p_item)
        this.headers.set("Content-Type", `application/json`)
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(p_item)
        })
     }
    update(p_item) {
        this.headers.set("Content-Type", `application/json`)
        return fetch(this.url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(p_item)
        })
    }
}