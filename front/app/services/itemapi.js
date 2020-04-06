const ServiceBaseUrl = "http://localhost:3333/item";

class Itemapi {
    getAll()
    {
        return fetchJSON(ServiceBaseUrl)
    }
    get(p_id)
    {
        return fetchJSON(`${ServiceBaseUrl}/id/${p_id}`)
    }
    delete(p_id)
    {
        return fetch(`${ServiceBaseUrl}/id/${p_id}`, { method: 'DELETE'})
    }
    insert(p_item)
    {
        return fetch(ServiceBaseUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(p_item)
        })
     }
    update(p_item) {
        return fetch(ServiceBaseUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p_item)
        })
    }
}