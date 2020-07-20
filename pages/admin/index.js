import axios from '../../config/axios'

import Layout from '../../components/admin/Layout'
import BoxCounter from '../../components/admin/BoxCounter'
import { LineChartAdmin, PieChartAdmin } from '../../components/admin/Charts'
import { userLoggedSSR } from '../../utils/auth'

export default function(props) {
  return (
    <Layout>
      <div className="columns">
        <div className="column">
          <BoxCounter 
            icon="fas fa-chair"
            title="Reservas"
            bgColor="#c23616"
            counter={props.reservations}
          />
        </div>
        <div className="column">
          <BoxCounter 
            icon="fas fa-phone"
            title="Contatos"
            bgColor="#10ac84"
            counter={props.contacts}
          />
        </div>
        <div className="column">
          <BoxCounter 
            icon="fas fa-utensils"
            bgColor="#273c75"
            title="Produtos"
            counter={props.products}
          />
        </div>
        <div className="column">
          <BoxCounter 
            icon="fas fa-users"
            bgColor="#833471"
            title="Usuários"
            counter={props.users}
          />
        </div>
      </div>
      <div className="columns mt-5">
        <div className="column">
          <LineChartAdmin />        
        </div>
        <div className="column">
         <PieChartAdmin />       
        </div>
      </div> 
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  let data = {}
  const user = await userLoggedSSR(ctx)
  if (user) {
    try {
      const resp = await axios.get('/totals')    
      data = resp.data
    } catch (e) {
      console.log('Não foi possível obter os totais')    
    }
  }
  return {
    props: { ...data } 
  }
}