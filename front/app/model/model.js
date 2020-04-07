class Model {
    constructor() {
        this.listapi = new Listapi()
        this.itemapi = new Itemapi()
        this.current = [ ]

    }
    //  --- get ---
    //get current list name
    getCurrentName(){
        let curNam = this.listapi.getCurrent().name
        if (curNam !== undefined) return curNam
    }
    //get the items in the current list
    getCurrentItems(p_id){
        return this.listapi.get(p_id)

        /*return new Promise((resolve, reject) => {
            console.log("getcurrentitems :",this.current)
            this.listapi.getCurrent()
                .then( res => {
                    //console.log(res)
                    for (let list of res)
                    {
                        this.listapi.get(list.id).then( result => {
                            for (let i=0; i< result.length; i++)
                            {
                                this.current.push(result[i])
                            }
                        })
                    }
                    for (let v of res){
                        console.log(v)
                    }
                    console.log("current items1 :", this.current)
                    console.log("current items2 :", this.current.length)
                    //return this.current.items
                }).catch( res => {
                    if (res.status === 200){
                        resolve("Good")
                    }else{
                        reject(res)
                    }
            })
            //return this.current.items

        })*/
    }
    getCurrentLists()
    {
        return this.listapi.getCurrent()
        /*return new Promise((resolve, reject) => {
            this.listapi.getCurrent()
                .then(res => resolve(res.rows))
                .catch(res => {
                    console.log("yo")
                    if (res.status === 200){
                        console.log("model get lists: ",res)
                        resolve(res.rows)
                    } else {
                        reject(res)
                    }
                }
            )
        })*/
    }
    //archive current lists when adding a new one
    async archiveList()
    {
        let currentId = await this.listapi.getCurrent()
        console.log(currentId)
        for (let id of currentId)
        {
            await this.listapi.archive(id.id)
            console.log("archive: ",id.id)
        }
    }
    // --- NEW ---
    //add a new list
    insertList(p_name){
        this.currentList = new List(p_name)
        this.listapi.insert(this.currentList).then(() => {return this.currentList})
        console.log("cur_lst_id",this.currentList.id)
        //return this.currentList
    }
    //add a new item
    insertItem(p_quantity, p_name, p_Lid)
    {
        const itm = new Item(p_quantity, p_name, p_Lid)
        console.log("itm: ", itm)
        return this.itemapi.insert(itm)
     }
    // validation system
    /*validateItem(p_id)
    {
        for (let item of this.current.items)
        {
            if (p_id === item.id)
            {
                if (item.valid === true)
                {
                    item.valid = false
                }else{
                    item.valid = true
                }
                this.save_current()
                console.log(item.valid)
            }
        }
    }*/
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

