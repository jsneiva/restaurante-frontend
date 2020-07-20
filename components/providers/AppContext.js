import React, { useState, useEffect, useContext } from 'react'
import Cookies from 'universal-cookie'
import axios from '../../config/axios'

const initialState = {
  loading: null,
  user: null,
  sideBar: true,
}

const USER_TOKEN = 'token'

const cookies = new Cookies()

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext)
}

export default function(props) {
  const [state, setState] = useState(initialState)

  function login(token) {
    cookies.set(USER_TOKEN, token)
  }

  function logout() {
    cookies.remove(USER_TOKEN)
    axios.defaults.headers.Authorization = null
    setState({ ...state, user: null})
  }

  function logged() {
    return !!(state.user && state.user.username)
  }

  function toggleSideBar() { 
    setState({ ...state, sideBar: !state.sideBar })
  }

  async function loadUser() {
    setState(state => ({ ...state, loading: true }))
    const token = cookies.get(USER_TOKEN)            
    const data = { loading: false, user: {} }  
    if (token) {
      axios.defaults.headers.Authorization = 'Bearer ' + token
      const resp = await axios.get('/users/profile')
      data.user = resp.data
    }
    setState(state => ({ ...state, ...data }))
  }

  const ctx = {
    ...state,
    login,
    logout,
    logged,
    loadUser,
    toggleSideBar
  }

//  useEffect(() => { loadUser() }, [])
 
  return (
    <AppContext.Provider value={ctx}>    
      {props.children}
    </AppContext.Provider>    
  )

}
