class Model {
    constructor() {
        this.listapi = new Listapi()
        this.itemapi = new Itemapi()
    }
    //  --- get ---
    //get current list name
    getCurrentName(){
        let curNam = this.listapi.getCurrent().name
        if (curNam !== undefined) return curNam
    }
    //get the items in the current list
    getItems(p_id){
        return this.listapi.get(p_id)
    }
    getLists()
    {
        return this.listapi.getCurrent()
    }
    getArchived()
    {
        return this.listapi.getArchived()
    }
    // --- NEW ---
    //add a new list
    insertList(p_name){
        this.currentList = new List(p_name)
        this.listapi.insert(this.currentList)
            .then(() => {return this.currentList})

        console.log("cur_lst",this.currentList)
        return this.currentList
    }
    //add a new item
    insertItem(p_quantity, p_name, p_Lid)
    {
        const itm = new Item(p_quantity, p_name, p_Lid)
        console.log("itm: ", itm)
        return this.itemapi.insert(itm)
     }

    deleteList(p_id)
    {
        return new Promise((resolve, reject) => {
            this.listapi.delete(p_id)
                .then(() => {
                    this.listapi.get(p_id).then( res => {
                        console.log(res)
                        for (let itm of res)
                        {
                            this.deleteItem(itm.id, itm.list_id)
                        }
                        resolve("item deleted")
                    })
                })
                .catch(r => {console.log(r.status); reject(r)})
        })
    }
    deleteItem(p_id)
    {
        return new Promise((resolve, reject) => {
            this.itemapi.delete(p_id)
                .then(res => {
                    resolve(res)
                })
                .catch( r => reject(r))
        })
    }
}

