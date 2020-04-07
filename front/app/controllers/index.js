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
    {
        document.getElementById("list_add").innerHTML = `<tr>
                            <td style="width: 10%"><a class="waves-effect waves-light btn-small" onclick="indexController.archiveList()">Archiver</a></td>
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
        this.model.getCurrentItems(lst_id)
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
            }).then(() => this.displayInputMethod(lst_id))
    }
    displayLists()
    {
        document.getElementById("list_add").innerHTML = ""
        console.log("mark1")
        this.model.getCurrentLists()
            .then( res => {
                    let html = "";
                    let valid = "";
                    for (let list of res)
                    {
                        console.log("list",list)
                        if (list.archived === true)
                        {
                            valid = "grey"
                        }else{
                            valid = "green"
                        }
                        html += `<tr><td><a id="${list.id}" class="btn-floating btn-large waves-effect waves-light ${valid}" onclick="indexController.archive(${list.id})"><i class="material-icons">check</i></a></td><td onclick="indexController.displayItems(${list.id})" >${list.name}</td><td><a class="waves-effect waves-light btn red" onclick="indexController.deleteList(${list.id})">Delete</a></td></tr>`
                    }
                    document.getElementById("list_content").innerHTML = html
                }
            )
    }
   /* display_odl()
    {
        if (this.model.curent.name !== "")
        {
            this.archivelist();
            M.toast({html:'on archive la liste en cours'})
        }
        document.getElementById("page_title").innerText = "Historique";
        const lists = this.model.getAllOldItems();
        console.log("marker");
        console.log(lists);
        let html = "";
        for (let list of lists)
        {
            console.log(list);
            html+=`<tr><td><a href="#View_arch_list" class="modal-trigger" onclick="indexController.fill_arch_list_display(${list.id})">${list.name}</a></td><td><a class="waves-effect waves-light btn red" onclick="indexController.deleteArchList(${list.id})">Delete</a></td></tr>`
        }
        document.getElementById("list_content").innerHTML = html
    }*/
    /*deleteArchList(p_id)
    {
        this.model.delete_arch_list(p_id);
        this.display_odl()
    }*/
    /*archiveList()
    {
        new Promise((resolve, reject) => {
            this.model.archiveList().then(r => console.log(r))
        }).catch(e => console.log(e));
        //remove input method
        document.getElementById("list_add").innerHTML = '';
        //remove title
        document.getElementById("title").innerHTML = ''

    }*/
    createNewList()
    {
        document.getElementById("list_content").innerHTML = "";
        console.log("creat name: undefined is good :",this.model.getCurrentName());
        if (this.model.getCurrentName() !== undefined)
        {
            console.log("undefined problem if first list");
            this.archiveList()
        }
        document.getElementById("page_title").innerText = "Listes de courses";
        const listname = document.getElementById("list_name").value;
        if (listname === "" || listname === null)
        {
            M.toast({html:'a girl has no name (SO6EO2 GOT)'});
            return
        }
        console.log("get lst name : ",listname);
        document.getElementById("list_name").value = "";
        this.lst = this.model.insertList(listname);
        console.log("insert list ,id :", this.lst);
        //display title
        document.getElementById("title").innerHTML = `<h5>Liste : ${listname}</h5>`;
        this.displayInputMethod();
    }

    addItem(p_lId){
        const quantity = $("#quant").value;
        const item = $("#item").value;
        if (quantity === 0 || quantity === "" || item === "") /// need to be more restrictive!!!
        {
            M.toast({html:'les champs doivent etre renseigner'});
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
            });
        document.getElementById("quant").value = "";
        document.getElementById("item").value = ""
    }
    deleteItem(p_id, p_listId)
    {
        this.model.deleteItem(p_id)
            .then(() => this.displayItems(p_listId))
    }
    deleteList(p_id)
    {
        this.model.deleteList(p_id)
            .then(() => this.displayLists())
    }
    archive(p_id)   //archives lists
    {

    }
    validate(p_id)  //validate items
    {
        //this.model.validateItem(p_id);
        const item = document.getElementById(p_id).classList;
        if (!item.contains("grey"))
        {
            item.remove("green");
            item.add("grey")
        }else{
            item.remove("grey");
            item.add("green")
        }

    }
}

window.indexController = new IndexController();
