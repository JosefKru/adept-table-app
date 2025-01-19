import { useEffect, useRef, useState } from 'react'
import EditModal from '../EditModal/EditModal'
import './CompanyTable.css'
import { useDispatch } from 'react-redux'
import { Company } from '../types/models'
import { editCompany } from '../../slices/companiesSlice'
import { ROW_HEIGHT, VISIBLE_ROWS } from '../../variables/const'

interface IProps {
  selectedIds: string[]
  onChangeSelectAll: (select: boolean) => void
  onChangeSelectRow: (id: string, select: boolean) => void
  companies: Company[]
}

const CompanyTable = ({ selectedIds, onChangeSelectAll, onChangeSelectRow, companies }: IProps) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [start, setStart] = useState(0)

  const tableRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useDispatch()

  const handleSaveCompany = (company: Company) => {
    if (company) {
      dispatch(editCompany(company))
    }
  }

  useEffect(() => {
    const element = tableRef.current

    if (element) {
      const handleScroll = (event: Event) => {
        const target = event.target as HTMLDivElement
        setStart(Math.floor(target.scrollTop / ROW_HEIGHT))
      }

      element.addEventListener('scroll', handleScroll)

      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [companies])

  const handleCloseModal = () => {
    setSelectedCompany(null)
  }

  const handleEditCompany = (company: Company, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedCompany(company)
  }

  const getTopHeight = () => {
    return ROW_HEIGHT * start
  }

  const getButtomHeight = () => {
    return ROW_HEIGHT * (companies.length - (start + VISIBLE_ROWS))
  }

  return (
    <>
      <div className='table-container' ref={tableRef}>
        <div style={{ height: getTopHeight() }} />
        <table className='company-table'>
          <thead>
            <tr>
              <th>
                <input
                  type='checkbox'
                  onChange={(e) => onChangeSelectAll(e.target.checked)}
                  checked={selectedIds.length === companies.length && companies.length !== 0}
                />
              </th>
              <th>Название компании</th>
              <th colSpan={2}>Адрес</th>
            </tr>
          </thead>
          <tbody>
            {!companies.length ? (
              <tr>
                <td colSpan={3}>Таблица не заполнена</td>
              </tr>
            ) : (
              companies.slice(start, start + 9).map((com) => (
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
        <div style={{ height: getButtomHeight() }} />
      </div>
      {selectedCompany && (
        <EditModal company={selectedCompany} onClose={handleCloseModal} onSave={handleSaveCompany} />
      )}
    </>
  )
}

export default CompanyTable
