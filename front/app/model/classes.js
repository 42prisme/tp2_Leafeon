class Item {
    constructor(p_quantity, p_item_name) {
        this.id = Date.now()
        this.quant = p_quantity
        this.name = p_item_name
        this.valid = false
    }
    toString() {
        return `${this.quant} ${this.name} ${this.id}`
    }
}
