import { useState, useEffect } from 'react'
import axios from '../../config/axios'
import MessageBox from '../common/MessageBox'
import utils from '../../utils/utils'

import Loading from '../common/Loading'

export default function SectionMenu(props) {
  const [groups, setGroups] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selGroup, setSelGroup] = useState(0)
  const [msg, setMsg] = useState(null)

  async function loadGroups() {
    let oMsg = null
    setLoading(true)
    try {
      const resp = await axios.get('/menu/groups')
      setGroups(resp.data)
      if (resp.data.length) {
        setSelGroup(resp.data[0].id)
      }
    } catch (e) {
      oMsg = {
        error: true,
        message: 'Ops, não foi possível exibir o cardápio. Tente mais tarde.'
      }
    }
    setLoading(false)
    if (oMsg) setMsg(oMsg)
  }

  async function loadProducts() {
    let oMsg = null, result = []
    setLoading(true)
    try {
      const resp = await axios.get(URL_API + '/menu/products?group_id=' + selGroup)
      result = resp.data
    } catch (e) {
      oMsg = {
        error: true,
        message: 'Ops, não foi possível obter os itens deste grupo.'
      }
    }
    setLoading(false)
    setProducts(result)
    if (oMsg) setMsg(oMsg)
  }

  useEffect(() => { loadGroups() }, [])

  useEffect(() => { loadProducts() }, [selGroup])

  return (
    <div className="columns">
      <div className="column is-4">
        {groups.length > 0 && 
          <ul id="menu-groups">
            {groups.map(item => (
              <li key={item.id}>
                <a 
                  className={item.id === selGroup ? 'active' : ''}
                  onClick={e => setSelGroup(item.id)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        }
      </div>
      <div className="column">
        {loading && 
          <div id="menu-products-loader">
            <Loading />
          </div>
        }
        {products.length > 0 && 
          <ul id="menu-products">
            {products.map(item => (
              <li key={item.id}>
                <div className="my-4">
                  <div className="columns">
                    <div className="column is-2">
                      <figure className="image is-square">
                        <img 
                          className="is-rounded"
                          src="https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908__340.jpg" 
                          alt=""
                        />
                      </figure>
                    </div>                    
                    <div className="column">
                      <p className="is-size-4">
                        {item.name}
                      </p>
                      <p className="mt-3">
                        {item.description}
                      </p>
                      <p className="title is-4 my-3">
                        {utils.formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        }
        {msg && 
          <MessageBox {...msg} onClick={() => setMsg(null)} />
        }
      </div>
    </div>
  )
}
