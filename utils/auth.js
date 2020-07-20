import axios from '../config/axios'

export async function userLoggedSSR(ctx) {
  let user = null
  try {    
    const token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    axios.defaults.headers.Authorization = 'Bearer ' + token
    const resp = await axios.get('/users/profile')
    user = resp.data
  } catch (error) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }
  return user
}
