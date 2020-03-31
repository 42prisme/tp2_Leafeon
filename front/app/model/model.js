class Model {
    constructor() {
        this.curentKey = "nv"
        this.oldKey = "old"
        this.load_curent()
        this.load_old()
        if (this.curent.length === 0) {  }   //creat a list
    }
    getAllCurentItems() {
        return this.curent.items
    }
    getAllOldItems() {
        console.log("old")
        console.log(this.old)
        this.load_old()
        console.log(this.old)
        return this.old
    }
    insert_name(p_name) {
        this.curent.name = p_name
        //create_id
        this.curent.id = Date.now()
        this.save_curent()
    }
    insert_item(p_item) {
        this.curent.items.push(p_item)
        this.save_curent()
    }
    load_curent() {
        this.curent = {'id':'', 'name':'', 'items':[]}
        let datas = JSON.parse(localStorage.getItem(this.curentKey), reviver)
        if (datas !== null) {
            console.log(datas)
            for (let item of datas.items) {
                if (item !== null) {
                    this.curent.items.push(Object.assign(new Item(), item))
                }
            }
        }
    }
    load_old(){
        this.old = []
        let old_datas = JSON.parse(localStorage.getItem(this.oldKey), reviver)
        if (old_datas !== null) {
            for (let list of old_datas) {
                console.log(list)
                this.old.push(list)
            }
        }
    }
    save_curent() {
        localStorage.setItem(this.curentKey, JSON.stringify(this.curent))
    }
    save_old() {
        localStorage.setItem(this.oldKey, JSON.stringify(this.old))
    }
    delete_item(p_id){
        let i = 0
        console.log(p_id)
        for (let data of this.curent.items)
        {
            console.log(i)
            if (p_id === data.id)
            {
                this.curent.splice(i,1)
            }
            i++
        }
        this.save_curent()
        indexController.displayCurentList()
    }
    delete_arch_list(p_lst_id)
    {
        console.log("delete arch list")
        for (let i=0; i<this.old.length; i++)
        {
            console.log("this.old[i].id")
            console.log(this.old[i].id)
            console.log(p_lst_id)
            if (this.old[i].id === p_lst_id)
            {
                console.log(i)
                this.old.splice(i,1)
            }
        }
        this.save_old()
    }
    validateItem(p_id)
    {
        for (let item of this.curent.items)
        {
            if (p_id === item.id)
            {
                if (item.valid === true)
                {
                    item.valid = false
                }else{
                    item.valid = true
                }
                this.save_curent()
                console.log(item.valid)
            }
        }
    }
    archiver_curent()   //placer le curent dans une liste de liste archiver()old
    {
        if (this.curent.name !== "")
        {
            this.old.push(this.curent)
            this.curent = {'id':'', 'name':'', 'items':[]}
            this.save_curent()
            this.save_old()
            this.load_curent()
            this.load_old()
        }
    }
}
