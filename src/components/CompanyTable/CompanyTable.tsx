import { RootState } from '../../store/store'
import './CompanyTable.css'
import { useSelector } from 'react-redux'

interface IProps {
  selectedIds: string[]
  onChangeSelectAll: (select: boolean) => void
  onChangeSelectRow: (id: string, select: boolean) => void
}

const CompanyTable = ({ selectedIds, onChangeSelectAll, onChangeSelectRow }: IProps) => {
  const companies = useSelector((state: RootState) => state.companies.companies)

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type='checkbox'
              onChange={(e) => onChangeSelectAll(e.target.checked)}
              checked={selectedIds.length === companies.length}
            />
          </th>
          <th>Название компании</th>
          <th>Специализация</th>
        </tr>
      </thead>
      <tbody>
        {!companies.length ? (
          <div>Таблица не заполнена</div>
        ) : (
          companies.map((com) => (
            <tr key={com.id} className={selectedIds.includes(com.id) ? 'selected' : ''}>
              <td>
                <input
                  type='checkbox'
                  checked={selectedIds.includes(com.id)}
                  onChange={(e) => onChangeSelectRow(com.id, e.target.checked)}
                />
              </td>
              <td>{com.name}</td>
              <td>{com.address}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default CompanyTable
