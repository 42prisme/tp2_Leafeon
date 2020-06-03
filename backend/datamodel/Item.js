module.exports = class Item {
  constructor(id, list_id, name, quantity) {
      this.id = id
      this.list_id = list_id
      this.name = name
      this.quantity = quantity
      this.valid = false
  }
};