import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://restaurante-back.herokuapp.com'   //'http://localhost:3200' 
})

export default instance
