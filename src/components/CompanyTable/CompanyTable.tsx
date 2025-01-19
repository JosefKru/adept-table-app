import EditModal from '../EditModal/EditModal'
import './CompanyTable.css'
import { VISIBLE_ROWS } from '../../variables/consts'
import { useVirtualScroll } from '../../hooks/useVirtualScroll'
import { useModal } from '../../hooks/useModal'
import { memo, useMemo } from 'react'
import TableRow from '../TableRow/TableRow'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

interface IProps {
  selectedIds: string[]
  onChangeSelectAll: (select: boolean) => void
  onChangeSelectRow: (id: string, select: boolean) => void
}

const CompanyTable = memo(({ selectedIds, onChangeSelectAll, onChangeSelectRow }: IProps) => {
  const companies = useSelector((state: RootState) => state.companies.companies)

  const { start, tableRef, getTopHeight, getBottomHeight } = useVirtualScroll(companies.length)

  const { selectedCompany, handleCloseModal, handleSaveCompany, handleEditCompany } = useModal()

  const isAllChecked = useMemo(() => {
    return selectedIds.length === companies.length && companies.length !== 0
  }, [selectedIds.length, companies.length])

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
                  checked={isAllChecked}
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
              companies
                .slice(start, start + VISIBLE_ROWS)
                .map((company) => (
                  <TableRow
                    key={company.id}
                    company={company}
                    selectedIds={selectedIds}
                    onChangeSelectRow={onChangeSelectRow}
                    handleEditCompany={handleEditCompany}
                  />
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
})

export default CompanyTable
