import EditModal from '../EditModal/EditModal'
import './CompanyTable.css'
import { Company } from '../../types/models'
import { VISIBLE_ROWS } from '../../variables/const'
import { useVirtualScroll } from '../../hooks/useVirtualScroll'
import { useModal } from '../../hooks/useModal'

interface IProps {
  selectedIds: string[]
  onChangeSelectAll: (select: boolean) => void
  onChangeSelectRow: (id: string, select: boolean) => void
  companies: Company[]
}

const CompanyTable = ({ selectedIds, onChangeSelectAll, onChangeSelectRow, companies }: IProps) => {
  const { start, tableRef, getTopHeight, getBottomHeight } = useVirtualScroll(companies.length)

  const { selectedCompany, handleCloseModal, handleSaveCompany, handleEditCompany } = useModal()

  return (
    <>
      <div className='table-container' ref={tableRef}>
        <div style={{ height: getTopHeight() }} />
        <table className='company-table'>
          <thead>
            <tr>
              <th>
                <input
                  name='select-all'
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
              companies.slice(start, start + VISIBLE_ROWS).map((company) => (
                <tr key={company.id} className={selectedIds.includes(company.id) ? 'selected' : ''}>
                  <td>
                    <input
                      name='select-current'
                      type='checkbox'
                      checked={selectedIds.includes(company.id)}
                      onChange={(e) => onChangeSelectRow(company.id, e.target.checked)}
                    />
                  </td>
                  <td>{company.name}</td>
                  <td>{company.address}</td>

                  <td>
                    <div
                      className='menu'
                      onClick={(e) => {
                        handleEditCompany(company, e)
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
        <div style={{ height: getBottomHeight() }} />
      </div>
      {selectedCompany && (
        <EditModal selectedCompany={selectedCompany} onClose={handleCloseModal} onSave={handleSaveCompany} />
      )}
    </>
  )
}

export default CompanyTable
