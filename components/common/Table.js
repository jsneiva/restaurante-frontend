import Button from '../common/Button'

export default function({ 
  headers, 
  rows, 
  editRow, 
  removeRow 
}) {
  return (
    <div className="table-container">

      <table className="table is-fullwidth is-hoverable">

        <thead className="thead-light">
          <tr>
            {headers.map(col => (
              <th key={col.title} align={col.align}>{col.title}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {rows && rows.map(row => (
            <tr key={row.id}>
              {headers.map(col => (
                <td key={col.field} align={col.align}>
                  { col.render ? col.render(row[col.field]) : row[col.field] }
                </td>
              ))}
              <td>
                <Button
                  onClick={() => editRow(row.id)}
                  icon="fas fa-pencil-alt"
                  theme="info"
                  outlined
                  small
                />
                <Button
                  className="ml-4"
                  onClick={() => removeRow(row.id)}
                  icon="fas fa-trash-alt"
                  theme="danger"
                  outlined
                  small
                />
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}

