import { useEffect, useState } from 'react'
import EditModal from '../EditModal/EditModal'
import './CompanyTable.css'
import { useDispatch } from 'react-redux'
import { Company } from '../types/models'
import { editCompany } from '../../slices/companiesSlice'

interface IProps {
  selectedIds: string[]
  onChangeSelectAll: (select: boolean) => void
  onChangeSelectRow: (id: string, select: boolean) => void
  companies: Company[]
}

const CompanyTable = ({ selectedIds, onChangeSelectAll, onChangeSelectRow, companies }: IProps) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [limit, setLimit] = useState(15)
  const [visibleCompanies, setVisibleCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setVisibleCompanies(companies.slice(0, limit))
  }, [limit, companies])

  const handleSaveCompany = (company: Company) => {
    if (company) {
      dispatch(editCompany(company))
    }
  }

  const handleScroll = (e: React.UIEvent) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading && limit !== companies.length) {
      setIsLoading(true)
      setTimeout(() => {
        setLimit((prevLimit) => Math.min(prevLimit + 10, companies.length))
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleCloseModal = () => {
    setSelectedCompany(null)
  }

  const handleEditCompany = (company: Company, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedCompany(company)
  }

  return (
    <>
      <div className='scrollbar' onScroll={handleScroll}>
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
              <tr>
                <td colSpan={3}>Таблица не заполнена</td>
              </tr>
            ) : (
              visibleCompanies.map((com) => (
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
                    <div
                      className='menu'
                      onClick={(e) => {
                        handleEditCompany(com, e)
                      }}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {isLoading && <div className='loading-indicator'>Загрузка...</div>}
      </div>
      {selectedCompany && (
        <EditModal company={selectedCompany} onClose={handleCloseModal} onSave={handleSaveCompany} />
      )}
    </>
  )
}

export default CompanyTable
