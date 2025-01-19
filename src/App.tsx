import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import CompanyTable from './components/CompanyTable/CompanyTable'
import { RootState } from './store/store'
import { addCompany, removeCompany } from './slices/companiesSlice'
import { Company } from './components/types/models'
import { useState } from 'react'
import ActionsButton from './components/ActionsButton/ActionsButton'

function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const companies = useSelector((state: RootState) => state.companies.companies)
  const dispatch = useDispatch()

  const handleSelectAll = (select: boolean) => {
    setSelectedIds(select ? companies.map((item) => item.id) : [])
  }

  const handleSelectRow = (id: string, select: boolean) => {
    setSelectedIds((prevState) =>
      select ? [...prevState, id] : prevState.filter((selectedId) => selectedId !== id)
    )
  }

  const handleAddCompany = () => {
    const nextValCom = companies.length + 1
    const newCompany: Company = {
      id: Date.now().toString(),
      name: `Компания ${nextValCom}`,
      address: `Адрес ${nextValCom}`,
    }
    dispatch(addCompany(newCompany))
  }

  const handleRemoveCompany = () => {
    selectedIds.forEach((id) => {
      dispatch(removeCompany(id))
    })
    setSelectedIds([])
  }

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
