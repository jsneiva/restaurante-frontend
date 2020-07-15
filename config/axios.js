import axios from 'axios'

const reDateTime = /^\d{4}-\d{2}-\d{2}( |T)\d{2}:\d{2}:\d{2}/      

const instance = axios.create({
  baseURL: 'http://localhost:3200',
})

instance.interceptors.response.use(response => {
  parseData(response.data)
  return response
}, error => {

  return Promise.reject(error)

})


function parseData(data) {

  Object.keys(data).forEach(key => {
    const value = data[key]
    if (Array.isArray(value)) {

      value.forEach(parseData)

    } else if (typeof value === 'object' && !!value) {

      parseData(value)

    } else if (typeof value === 'string' && reDateTime.test(value)) {

      data[key] = new Date(value)

    }
  })

}

export default instance
