class Item {
    constructor(p_quantity, p_item_name, lstId) {
        this.id = Date.now()
        this.list_id = lstId
        this.quantity = p_quantity
        this.name = p_item_name
        this.valid = false
    }
    toString() {
        return `${this.quantity} ${this.name} ${this.id}`
    }
}
