import './App.css'
import CompanyTable from './components/CompanyTable/CompanyTable'
import { addCompany, removeCompany } from './slices/companiesSlice'
import { Company } from './types/models'
import ActionsButton from './components/ActionsButton/ActionsButton'
import { useSelectedIds } from './hooks/useSelectedIds'
import { useCallback } from 'react'

function App() {
  const { resetSelection, selectedIds, companies, dispatch, handleSelectAll, handleSelectRow } =
    useSelectedIds()

  const handleAddCompany = useCallback(() => {
    const nextValCom = companies.length + 1
    const newCompany: Company = {
      id: Date.now().toString(),
      name: `Компания ${nextValCom}`,
      address: `Адрес ${nextValCom}`,
    }
    dispatch(addCompany(newCompany))
  }, [companies.length, dispatch])

  const handleRemoveCompany = useCallback(() => {
    selectedIds.forEach((id) => {
      dispatch(removeCompany(id))
    })
    resetSelection()
  }, [selectedIds, resetSelection, dispatch])

  return (
    <>
      <div className='main-containter'>
        <h1 className='title'>Список компаний</h1>
        <CompanyTable
          selectedIds={selectedIds}
          onChangeSelectRow={handleSelectRow}
          onChangeSelectAll={handleSelectAll}
          companies={companies}
        />
        <ActionsButton
          onAddCompany={handleAddCompany}
          onRemoveCompany={handleRemoveCompany}
          selectedIds={selectedIds}
        />
      </div>
    </>
  )
}

export default App
