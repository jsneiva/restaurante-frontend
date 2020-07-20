import axios from '../config/axios'

export async function userLoggedSSR(ctx) {
  let user = null
  try {    
    const token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    if (!token) {
      throw new Error('Token não encontrado!')
    }
    axios.defaults.headers.Authorization = 'Bearer ' + token
    const resp = await axios.get('/users/profile')
    user = resp.data
  } catch (error) {
    ctx.res.json({mensagem: error})
    //ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
  }
  return user
}
