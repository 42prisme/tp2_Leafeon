module.exports = class Item {
  constructor(name,quant,list_id) {
      this.id = Date.now()
      this.list_id = list_id
      this.name = name
      this.quantity = quant
      this.valid = false
  }
};