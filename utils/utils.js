
let lastId = 0;

export default {

  arrayRange(start, end) {
    const range = []
    for (let i = start; i <= end; i++) {
      range.push(i)
    }
    return range
  },

  formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR',{
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL',
    })
  },

  formatInteger(value) {
    return Number(value).toLocaleString('pt-BR',{minimumFractionDigits: 0})
  },

  isString(value) {
    return typeof value === 'string' || value instanceof String;
  },

  generateID(prefix = '_') {
    return `${prefix}${++lastId}`
  }

}