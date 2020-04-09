module.exports = class ListCourse {
    constructor(id, name, owner)
    {
        this.id = id;
        this.owner = owner
        this.name = name;
        this.archived = false;
    }
 };