import { useEffect } from 'react'
import { useAppContext } from '../../components/providers/AppContext'

import Layout from '../../components/admin/Layout'
import BoxCounter from '../../components/admin/BoxCounter'
// import { LineChartAdmin, PieChartAdmin } from '../../components/admin/Charts'

export default (props) => {
  return (
    <Layout>
      <div className="columns">
        <div className="column">
          <BoxCounter 
            icon="fas fa-users"
            bgColor="#273c75"
            title="Clientes"
            counter={50}
          />
        </div>
        <div className="column">
          <BoxCounter 
            icon="fas fa-chair"
            title="Reservas"
            bgColor="#c23616"
            counter={50}
          />
        </div>
        <div className="column">
          <BoxCounter 
            icon="fas fa-phone"
            title="Contatos"
            bgColor="#10ac84"
            counter={50}
          />
        </div>
        <div className="column">
          <BoxCounter 
            icon="fas fa-user"
            bgColor="#833471"
            title="Usuários"
            counter={50}
          />
        </div>
      </div>
      {/* <div className="columns">
        <div className="column">
          <LineChartAdmin />        
        </div>
        <div className="column is-4">
          <PieChartAdmin />       
        </div>
      </div> */}
    </Layout>
  )
}
