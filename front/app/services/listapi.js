//const serviceBaseUrl = "http://localhost:3333/list";

class Listapi extends BaseAPI {
    constructor() {
        super("list");
    }
    getAll()
    {
        this.NewHeader()
        return fetchJSON(this.url, this.token)
    }
    getList(p_id)
    {
        this.NewHeader()
        return fetchJSON(`${this.url}/${p_id}`, this.token)
    }
    get(p_id)//get all items from list
    {
        this.NewHeader()
        return fetchJSON(`${this.url}/id/${p_id}`, this.token)
    }
    getCurrent()
    {
        //console.log("token :", this.token)
        this.NewHeader()
        return fetchJSON(`${this.url}/current`, this.token)
    }
    getArchived()
    {
        this.NewHeader()
        return fetchJSON(`${this.url}/archived`, this.token)
    }
    delete(p_id)
    {
        this.NewHeader()
        return fetch(`${this.url}/${p_id}`, { method: 'DELETE', headers: this.headers })
    }
    insert(p_list)
    {
        //console.log("p_list",p_list)
        this.NewHeader()
        this.headers.set("Content-Type", `application/json`)
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(p_list)
        })
    }
    update(lst)
    {
        this.NewHeader()
        console.log("in api", lst)
        this.headers.set("Content-Type", `application/json`)
        return fetch(`${this.url}/update`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(lst)
        })
    }
}