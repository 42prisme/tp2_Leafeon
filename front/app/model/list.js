class List {
    constructor(name, owner)
    {
        this.id = Date.now();
        this.owner = owner;
        this.name = name;
        this.archived = false;
    }
};