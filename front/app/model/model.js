class Model {
    constructor() {
        this.listapi = new Listapi()
        this.itemapi = new Itemapi()
    }
    async renew(p_user)
    {
        this.listapi.renew(p_user, sessionStorage.getItem("token"))
            .then(res => {
                if (res === 401)
                {
                    console.log("back to login")
                    //window.location.replace("login.html")
                }
                console.log("new key body", res)
                sessionStorage.setItem("token",res)
            })
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

    getItem(p_id){
        return this.itemapi.get(p_id)
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
        return new Promise(((resolve, reject) =>
            this.listapi.insert(this.currentList)
            .then(res => {
                if(res.status === 401)
                {
                    M.toast({html:'session invalid'});
                    window.location.replace("login.html");
                }else{
                    resolve(res)
                }
            }).catch(e => reject(e))
        ))
    }
    //add a new item
    insertItem(p_quantity, p_name, p_Lid)
    {
        const itm = new Item(p_quantity, p_name, p_Lid)
        return this.itemapi.insert(itm)
     }

     updateItem(p_quantity, p_name, p_Lid)
     {
         const itm = new Item(p_quantity, p_name, p_Lid)
         return this.itemapi.update(itm)
     }

     updateItem_copy(item)
     {
        return this.itemapi.update(item)
     }

    deleteList(p_id)
    {
        return new Promise((resolve, reject) => {
            this.listapi.delete(p_id)
                .then( re => {
                    if (re.status === 401)
                    {
                        resolve(re.status)
                    }
                    this.listapi.get(p_id).then( res => {
                        for (let itm of res)
                        {
                            this.deleteItem(itm.id, itm.list_id)
                        }
                        resolve(res)
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

