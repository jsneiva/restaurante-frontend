import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Sector, Cell
} from 'recharts';

import Loading from '../common/Loading'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import { useState, useEffect } from 'react'
import axios from '../../config/axios'
import { msgError, msgBoxError } from '../../utils/messages'

export function LineChartAdmin(props) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  async function loadData() {
    setLoading(true)
    try {
      const resp = await axios.get('/totals/days/7')
      setData(resp.data.map(item => ({
        Dia: format(new Date(item.date), 'EEEE', { locale: ptBR }),
        Contatos: item.contacts,
        Reservas: item.reservations
      })))
    } catch (error) {
      msgBoxError('Não foi possível obter os dados dos gráficos!')
    }
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="adm-charts">
      <h4>Resumo - Última Semana</h4>
      <hr/>
      <div>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 15, right: 40, left: 10, bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Dia" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Contatos" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Reservas" stroke="#82ca9d" />
        </LineChart>
      </div>      
    </div>    
  )
}


export function PieChartAdmin(props) {

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="adm-charts">
      <h4>Resumo - Últimos 12 meses</h4>
      <hr/>
      <div data-chart>
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
            labelLine={false}
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
      </div>      
    </div>      
  )
}



// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
// ]