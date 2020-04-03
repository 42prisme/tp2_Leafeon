const serviceBaseUrl = "http://localhost:3333/list";

class Listapi {
    getAll()
    {
        return fetchJSON(serviceBaseUrl)
    }
    get(p_id)//get all items from list
    {
        return fetchJSON(`${serviceBaseUrl}/id/${p_id}`)
    }
    getCurrent()
    {
        return fetchJSON(`${serviceBaseUrl}/current`)
    }
    async getArchived()
    {
        return await fetchJSON(`${serviceBaseUrl}/archived`)
    }
    async delete(p_id)
    {
        return await fetch(`${serviceBaseUrl}/${p_id}`, { method: 'DELETE'})
    }
    async insert(p_list)
    {
        return await fetch(serviceBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p_list)
        })
    }
    async archive(p_id)
    {
        return await  fetch(`serviceBaseUrl/archive`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p_id)
        })
    }
}