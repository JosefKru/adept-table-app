import { memo } from 'react'
import { Company } from '../../types/models'

interface ITableRowProps {
  company: Company
  selectedIds: string[]
  onChangeSelectRow: (id: string, select: boolean) => void
  handleEditCompany: (company: Company, event: React.MouseEvent) => void
}

const TableRow = memo(({ company, selectedIds, onChangeSelectRow, handleEditCompany }: ITableRowProps) => {
  return (
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
  )
})

export default TableRow
