class IndexController extends BaseController{
    constructor() {
        super()
        this.lst_id = 0
        //archiving old current lists
        /*if (this.model.current.name !== "")
        {
            this.archivelist()
        }*/
    }
    displayInputmethod()
    {
        document.getElementById("list_add").innerHTML = '<tr>\n' +
            '        <td style="width: 10%"><a class="waves-effect waves-light btn-small" onclick="indexController.archivelist()">Archiver</a></td>' +
            '       <td style="width: 10%">\n' +
            '            <input id="quant" type="number" >\n' +
            '        </td>\n' +
            '        <td>\n' +
            '            <input id="item" type="text" >\n' +
            '        </td>\n' +
            '        <td>\n' +
            '            <a class="waves-effect waves-light btn" onclick="indexController.addItem()"><i class="material-icons left">add</i></a>\n' +
            '        </td>\n' +
            '    </tr>'
    }
    displayCurrentList() {
        const items = this.model.getCurrentItems()

        console.log("items", items)
        let html = ""
        let valid = ""
        for(let item of items) {
            if (item.valid === true)
            {
                valid = "grey"
            }else{
                valid = "green"
            }
            html += `<tr><td><a id="${item.id}" class="btn-floating btn-large waves-effect waves-light ${valid}" onclick="indexController.validate(${item.id})"><i class="material-icons">check</i></a></td><td>${item.quant}</td><td>${item.name}</td><td><a class="waves-effect waves-light btn red" onclick="indexController.model.delete_item(${item.id})">Delete</a></td></tr>`
        }
        document.getElementById("list_content").innerHTML = html
    }
    display_odl()
    {
        if (this.model.curent.name !== "")
        {
            this.archivelist()
            M.toast({html:'on archive la liste en cours'})
        }
        document.getElementById("page_title").innerText = "Historique"
        const lists = this.model.getAllOldItems()
        console.log("marker")
        console.log(lists)
        let html = ""
        for (let list of lists)
        {
            console.log(list)
            html+=`<tr><td><a href="#View_arch_list" class="modal-trigger" onclick="indexController.fill_arch_list_display(${list.id})">${list.name}</a></td><td><a class="waves-effect waves-light btn red" onclick="indexController.deleteArchList(${list.id})">Delete</a></td></tr>`
        }
        document.getElementById("list_content").innerHTML = html
    }
    deleteArchList(p_id)
    {
        this.model.delete_arch_list(p_id)
        this.display_odl()
    }
    archivelist()
    {
        this.model.archiver_curent()
        this.displayCurrentList()
        //remove input method
        document.getElementById("list_add").innerHTML = ''
        //remove title
        document.getElementById("title").innerHTML = ''

    }
    createNewList()
    {
        document.getElementById("list_content").innerHTML = ""
        console.log("crent name: ",this.model.getCurrentName())
        if (this.model.getCurrentName() !== undefined)
        {
            this.archivelist()
        }
        document.getElementById("page_title").innerText = "Listes de courses"
        const listname = document.getElementById("list_name").value
        console.log("get lst name : ",listname)
        document.getElementById("list_name").value = ""
        this.lst_id = this.model.insertList(listname).id
        //display title
        document.getElementById("title").innerHTML = `<h5>Liste : ${listname}</h5>`
        this.displayInputmethod();
    }
    fill_arch_list_display(p_id)
    {
        let html = ""
        for (let list of this.model.old)
        {
            if (p_id === list.id)
            {
                for (let item of list.items)
                {
                    let valid = ""
                    if (item.valid)
                    {
                        //document.getElementById(item.id).className = "green"
                        valid = "green"
                    }else{
                        //document.getElementById(item.id).className = "red"
                        valid = "red"
                    }
                    html += `<tr><td>${item.name}</td><br/></tr>`
                }
                document.getElementById("itemLst").innerHTML = html
            }
        }
    }
    addItem(){
        const quant = $("#quant").value
        const item = $("#item").value
        if (quant === 0 || quant === "" || item === "")
        {
            M.toast({html:'les champs doivent etre renseigner'})
            return
        }
        if (this.lst_id === 0)
        {
            M.toast({html:'liste inexistante'})
            return
        }
        this.model.insertItem(quant, item, this.lst_id)
        document.getElementById("quant").value = ""
        document.getElementById("item").value = ""
        this.displayCurrentList()
    }
    validate(p_id)
    {
        this.model.validateItem(p_id)
        const item = document.getElementById(p_id).classList
        if (!item.contains("grey"))
        {
            item.remove("green")
            item.add("grey")
        }else{
            item.remove("grey")
            item.add("green")
        }

    }
}

window.indexController = new IndexController()
