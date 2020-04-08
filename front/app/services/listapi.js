//const serviceBaseUrl = "http://localhost:3333/list";

class Listapi extends BaseAPI {
    constructor() {
        super("list");
    }
    getAll()
    {
        return fetchJSON(this.url, this.token)
    }
    getList(p_id)
    {
        return fetchJSON(`${this.url}/${p_id}`, this.token)
    }
    get(p_id)//get all items from list
    {
        return fetchJSON(`${this.url}/id/${p_id}`)
    }
    getCurrent()
    {
        return fetchJSON(`${this.url}/current`, this.token)
    }
    getArchived()
    {
        return fetchJSON(`${this.url}/archived`, this.token)
    }
    delete(p_id)
    {
        return fetch(`${this.url}/${p_id}`, { method: 'DELETE', headers: this.headers })
    }
    insert(p_list)
    {
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(p_list)
        })
    }
    update(lst)
    {
        console.log("in api")
        return fetch(`${this.url}/update`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(lst)
        })
    }
}