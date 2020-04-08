const serviceBaseUrl = "http://localhost:3333/list";

class Listapi {
    getAll()
    {
        return fetchJSON(serviceBaseUrl)
    }
    getList(p_id)
    {
        return fetchJSON(`${serviceBaseUrl}/${p_id}`)
    }
    get(p_id)//get all items from list
    {
        return fetchJSON(`${serviceBaseUrl}/id/${p_id}`)
    }
    getCurrent()
    {
        return fetchJSON(`${serviceBaseUrl}/current`)
    }
    getArchived()
    {
        return fetchJSON(`${serviceBaseUrl}/archived`)
    }
    delete(p_id)
    {
        return fetch(`${serviceBaseUrl}/${p_id}`, { method: 'DELETE'})
    }
    insert(p_list)
    {
        return fetch(serviceBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p_list)
        })
    }
    update(lst)
    {
        console.log("in api")
        return fetch(`${serviceBaseUrl}/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lst)
        })
    }
}