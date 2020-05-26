class IndexController extends BaseController{
    constructor() {
        super()
        console.log("constructor")
        this.displayLists()
        //archiving old current lists
        /*if (this.model.current.name !== "")
        {
            this.archivelist()
        }*/
    }
    displayInputMethod(p_listId)
    {   //<td style="width: 10%"><a class="waves-effect waves-light btn-small" onclick="indexController.archiveList()">Archiver</a></td>
        document.getElementById("list_add").innerHTML = `<tr>
                            <td style="width: 10%">
                                <input id="quant" type="number" >
                            </td><td>
                                <input id="item" type="text" >
                            </td><td>
                                <a class="waves-effect waves-light btn" onclick="indexController.addItem(${p_listId})"><i class="material-icons left">add</i></a>
                            </td>
                            </tr>`
    }
    displayItems(lst_id) {
        this.model.getItems(lst_id)
            .then( items => {
                let html = "";
                let valid = "";
                for(let item of items) {
                    console.log("item",item);
                    if (item.valid === true)
                    {
                        valid = "grey"
                    }else{
                        valid = "green"
                    }
                    html += `<tr><td><a id="${item.id}" class="btn-floating btn-large waves-effect waves-light ${valid}" onclick="indexController.validate(${item.id})"><i class="material-icons">check</i></a></td><td>${item.quantity}</td><td>${item.name}</td><td><a class="waves-effect waves-light btn red" onclick="indexController.deleteItem(${item.id}, ${item.list_id})">Delete</a></td></tr>`
                }
                document.getElementById("list_content").innerHTML = html
            }).then(() => this.displayInputMethod(lst_id)).catch(err => {
                if (err === 401)
                {
                    M.toast({html:'session invalid'});
                    window.location.replace("login.html")
                }
        })
    }
    displayLists()
    {
        document.getElementById("title").innerHTML = `<h5>Listes de courses</h5>`;
        document.getElementById("list_add").innerHTML = ""
        console.log("mark1")
        this.model.getLists()
            .then( res => {
                    let html = "";
                    for (let list of res)
                    {
                        console.log("list",list)
                        html += `<tr><td><a id="${list.id}" class="waves-effect waves-light btn green" onclick="indexController.archive(${list.id})">archiver</a></td><td onclick="indexController.displayItems(${list.id})" >${list.name}</td><td><a class="waves-effect waves-light btn red" onclick="indexController.deleteList(${list.id})">Delete</a></td></tr>`
                    }
                    document.getElementById("list_content").innerHTML = html
                }
            ).catch(err => {
                if (err === 401)
                {
                    M.toast({html:'session invalid'});
                    window.location.replace("login.html")
                }
        })
        this.model.listapi.getAll().then(res => console.log(res))
    }

    displayHistory()
    {
        document.getElementById("title").innerHTML = `<h5>Historique</h5>`;
        document.getElementById("list_add").innerHTML = ""
        this.model.getArchived()
            .then( lists => {
                let html = "";
                for (let list of lists)
                {
                    html+=`<tr><td><a href="#View_arch_list" class="modal-trigger" onclick="indexController.displayArchList(${list.id})">${list.name}</a></td><td><a class="waves-effect waves-light btn red" onclick="indexController.deleteArchList(${list.id})">Delete</a></td></tr>`
                }
                document.getElementById("list_content").innerHTML = html
            }).catch(err => {
            if (err === 401)
            {
                M.toast({html:'session invalid'});
                window.location.replace("login.html")
            }
        })
    }

    displayArchList(p_id)
    {
        this.model.getItems(p_id)
            .then( res => {
                document.getElementById("itemLst").innerHTML = ""
                let html = ""
                for (let itm of res)
                {
                    html+=`<tr><td>${itm.quantity}</td><td>${itm.name}</td></tr><br>`
                }
                document.getElementById("itemLst").innerHTML = html
            }).catch(err => {
            if (err === 401)
            {
                M.toast({html:'session invalid'});
                window.location.replace("login.html")
            }
        })
    }

    createNewList()
    {
        document.getElementById("page_title").innerText = "Listes de courses";
        const listname = document.getElementById("list_name").value;
        if (listname === "" || listname === null)
        {
            M.toast({html:'a girl has no name (SO6EO2 GOT)'});
            return
        }
        document.getElementById("list_content").innerHTML = "";
        document.getElementById("list_name").value = "";
        //insertion de la list
        this.lst = this.model.insertList(listname)
        console.log("nw list", this.lst)
        if (this.lst === undefined)
        {
            M.toast({html:'session invalid'});
            window.location.replace("login.html");
            return;
        }
        document.getElementById("title").innerHTML = `<h5>Liste : ${listname}</h5>`;
        this.displayInputMethod(this.lst.id);
    }

    addItem(p_lId){
        const quantity = $("#quant").value;
        const item = $("#item").value;
        if (quantity === 0 || quantity === "" || item === "") /// need to be more restrictive!!!
        {
            M.toast({html:'les champs doivent etre correctement renseigner'});
            return
        }
        if (p_lId === undefined)
        {
            M.toast({html:'liste inexistante'});
            return
        }
        console.log("lst.id : ",p_lId);
        this.model.insertItem(quantity, item, p_lId)
            .then(res => {
                if (res.status === 200){
                    this.displayItems(p_lId)
                }
                if (res.status === 401){
                    window.location.replace("login.html")
                }
            });
        document.getElementById("quant").value = "";
        document.getElementById("item").value = ""
    }
    deleteItem(p_id, p_listId)
    {
        this.model.deleteItem(p_id)
            .then(() => this.displayItems(p_listId))
            .catch(err => {
            if (err === 401)
            {
                M.toast({html:'session invalid'});
                window.location.replace("login.html")
            }
        })
    }
    deleteList(p_id)
    {
        this.model.deleteList(p_id)
            .then(() => this.displayLists())
            .catch(err => {
            if (err === 401)
            {
                M.toast({html:'session invalid'});
                window.location.replace("login.html")
            }
        })
    }
    deleteArchList(p_id)
    {
        this.model.deleteList(p_id)
            .catch(err => {
                if (err === 401){
                    window.location.replace("login.html")
                }
            })
            .then(() => this.displayHistory())
    }
    archive(p_id)   //archives lists
    {
        console.log("archive")
        this.model.listapi.getList(p_id)
            .catch(err => {
                if (err === 401){
                    window.location.replace("login.html")
                }
            })
            .then( lst => {
                console.log(lst)
                console.log(lst.archived)
                lst.archived = true //rows[0].
                this.model.listapi.update(lst)
                    .then(() => this.displayLists())
            })
    }
    validate(p_id)  //validate items
    {
        this.model.itemapi.get(p_id)
            .then( res => {
                console.log("res", res)
                if (res.valid)
                {
                    res.valid = false
                }else{
                    res.valid = true
                }
                console.log("res", res)
                this.model.itemapi.update(res)
                    .then(() => {
                        const item = document.getElementById(p_id).classList;
                        if (!item.contains("grey"))
                        {
                            item.remove("green");
                            item.add("grey")
                        }else{
                            item.remove("grey");
                            item.add("green")
                        }
                    })
            }).catch(err => {
            if (err === 401)
            {
                M.toast({html:'session invalid'});
                window.location.replace("login.html")
            }
        })
    }
}

window.indexController = new IndexController();
