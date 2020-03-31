const serviceBaseUrl = "http://localhost:3333/list";

class Listapi {
    getAll()
    {
        return fetchJSON(serviceBaseUrl)
    }
    get(p_id)//get all items from list
    {
        return fetchJSON(`${serviceBaseUrl}/${p_id}`)
    }
    delete(p_id)
    {
        return fetch(`${serviceBaseUrl}/${p_id}`, { method: 'DELETE'})
    }
    insert(p_item)
    {
        return fetch(serviceBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p_item)
        })
    }
}