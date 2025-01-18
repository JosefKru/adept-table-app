import { useState } from 'react'
import { RootState } from '../../store/store'
import EditModal from '../EditModal/EditModal'
import './CompanyTable.css'
import { useDispatch, useSelector } from 'react-redux'
import { Company } from '../types/models'
import { editCompany } from '../../slices/companiesSlice'

interface IProps {
  selectedIds: string[]
  onChangeSelectAll: (select: boolean) => void
  onChangeSelectRow: (id: string, select: boolean) => void
}

const CompanyTable = ({ selectedIds, onChangeSelectAll, onChangeSelectRow }: IProps) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const companies = useSelector((state: RootState) => state.companies.companies)
  const dispatch = useDispatch()

  const handleSaveCompany = (company: Company) => {
    if (company) {
      dispatch(editCompany(company))
    }
  }

  const handleCloseModal = () => {
    setSelectedCompany(null)
  }

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company)
  }

  return (
    <>
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
                <td>
                  <button onClick={() => handleEditCompany(com)}>Ред.</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedCompany && (
        <EditModal company={selectedCompany} onClose={handleCloseModal} onSave={handleSaveCompany} />
      )}
    </>
  )
}

export default CompanyTable
