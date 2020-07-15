export function cpf(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2}).+/, '$1')
}

export function cnpj(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')      
    .replace(/(-\d{2}).+/, '$1')
}

export function cnpjCpf(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(
      /(\d{2})(\d)\.(\d{2})(\d).(\d{2})(\d)-(\d{3})/,
      '$1.$2$3.$4$5/$6$7'
    )
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2}).+/, '$1')    
}

export function cep(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3}).+/, '$1')
}

export function phone(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')    
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')  
    .replace(/(-\d{4}).+/, '$1')
}

export function date(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4}).+/, '$1')
}


export function time(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1:$2')
    .replace(/(\d{2})(\d)/, '$1:$2')
    .replace(/(\/\d{2}).+/, '$1')
}


export default {
  cpf,
  cnpj,
  cnpjCpf,
  cep,
  phone,
  date,
  time
}

export function applyMask(value, mask) {
  if (value && mask) {
    switch (mask.toLowerCase()) {
      case 'cpf': return cpf(value)
      case 'cnpj': return cnpj(value)
      case 'cnpjcpf': return cnpjCpf(value)
      case 'cep': return cep(value)
      case 'date': return date(value)
      case 'time': return time(value)
      case 'phone': return phone(value)
      default: return value
    }
  }
  return value
}


