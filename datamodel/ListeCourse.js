module.exports = class ListCourse {
    constructor(name)
    {
        this.id = Date.now();
        this.nom = name;
        this.archived = false;
    }
 };