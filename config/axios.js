import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://restaurante-back.herokuapp.com'   
  //baseURL: 'http://localhost:3200' 
})

export default instance
