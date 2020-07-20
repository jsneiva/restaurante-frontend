import Button from '../common/Button'
import Loading from '../common/Loading'

export default function({ 
  headers, 
  rows, 
  editRow, 
  removeRow,
  showRow,
  loading
}) {
  return (
    <div className="table-container">
      {loading ? (
        <Loading />
      ) : (
        <table className="table is-fullwidth is-hoverable is-bordered">

          <thead className="thead-light">
            <tr>
              {headers.map((col, i) => (
                <th key={i} align={col.align}>{col.title || ''}</th>
              ))}
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {rows && rows.map(row => (
              <tr key={row.id}>
                {headers.map((col, i) => (
                  <td key={i} align={col.align} style={{
                    width: col.width || 'auto'
                  }}>
                    { col.render ? col.render(row) : row[col.field] }
                  </td>
                ))}
                <td>
                  {showRow &&
                    <Button
                      onClick={() => showRow(row.id)}
                      icon="far fa-eye"
                      className="mx-2"
                      theme="info"
                      outlined
                      small
                    />
                  }
                  {editRow &&
                    <Button
                      onClick={() => editRow(row.id)}
                      icon="fas fa-pencil-alt"
                      className="mx-2"
                      theme="info"
                      outlined
                      small
                    />
                  }
                  {removeRow &&
                    <Button
                      className="mx-2"
                      onClick={() => removeRow(row.id)}
                      icon="fas fa-trash-alt"
                      theme="danger"
                      outlined
                      small
                    />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

