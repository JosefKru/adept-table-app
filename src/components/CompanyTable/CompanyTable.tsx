import { useState } from 'react'
import { RootState } from '../../store/store'
import './CompanyTable.css'
import { useSelector } from 'react-redux'

const CompanyTable = () => {
  const companies = useSelector((state: RootState) => state.companies.companies)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  console.log(selectedIds)

  const handleSelectAll = (select: boolean) => {
    setSelectedIds(select ? companies.map((item) => item.id) : [])
  }

  const handleRowSelect = (id: number, select: boolean) => {
    setSelectedIds((prevState) =>
      select ? [...prevState, id] : prevState.filter((selectedId) => selectedId !== id)
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type='checkbox'
              onChange={(e) => handleSelectAll(e.target.checked)}
              checked={selectedIds.length === companies.length}
            />
          </th>
          <th>Название компании</th>
          <th>Специализация</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((com) => (
          <tr key={com.id} className={selectedIds.includes(com.id) ? 'selected' : ''}>
            <td>
              <input
                type='checkbox'
                checked={selectedIds.includes(com.id)}
                onChange={(e) => handleRowSelect(com.id, e.target.checked)}
              />
            </td>
            <td>{com.name}</td>
            <td>{com.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CompanyTable
