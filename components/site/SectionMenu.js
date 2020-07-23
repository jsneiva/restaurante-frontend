import { useState, useEffect } from 'react'
import axios from '../../config/axios'
import MessageBox from '../common/MessageBox'
import utils from '../../utils/utils'

import Loading from '../common/Loading'
import InputCheck from '../common/InputCheck'

export default function SectionMenu(props) {
  const [groups, setGroups] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selGroup, setSelGroup] = useState(0)
  const [msg, setMsg] = useState(null)
  const [selPromo, setSelPromo] = useState(false)

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
      const params = {
        group_id: selGroup,
        is_promo: selPromo
      }
      const resp = await axios.get('/menu/products', { params })
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

  function onChangePromo(name, checked) {
    setSelPromo(checked)
  }

  useEffect(() => { loadGroups() }, [])

  useEffect(() => { loadProducts() }, [selGroup, selPromo])

  return (
    <div className="columns">
      <div className="column is-4">
        <p className="ml-4 mb-5">
          <InputCheck 
            label="&nbsp;Somente promoções"
            checked={selPromo}
            onChange={onChangePromo}
          />
        </p>
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
        {products.length > 0 && !loading && 
          <ul id="menu-products">
            {products.map(item => (
              <li key={item.id}>
                <div className="my-4">
                  <div className="columns">
                    <div className="column is-2">
                      <figure className="image is-square">
                        <img className="is-rounded" src={item.image} alt={item.name} />
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
                        {item.promotion ? (
                          <>
                            <span 
                              style={{ 
                                textDecoration: 'line-through',
                                fontWeight: 'normal',
                                fontSize: '0.8em'
                              }}
                            >{utils.formatCurrency(item.price)}</span>
                            <span className="ml-4 has-text-success">{utils.formatCurrency(item.price_promo)}</span>
                          </>
                        ) : (
                          utils.formatCurrency(item.price)
                        )}
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
