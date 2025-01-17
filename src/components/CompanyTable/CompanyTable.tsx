import { RootState } from '../../store/store'
import './CompanyTable.css'
import { useSelector } from 'react-redux'

const CompanyTable = () => {
  const companies = useSelector((state: RootState) => state.companies.companies)

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type='checkbox' />
          </th>
          <th>Название компании</th>
          <th>Специализация</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((com) => (
          <tr key={com.id}>
            <td>
              <input type='checkbox' />
            </td>
            <td>{com.name}</td>
            <td>{com.specificity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CompanyTable
