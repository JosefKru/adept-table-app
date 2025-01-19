import './App.css'
import CompanyTable from './components/CompanyTable/CompanyTable'
import ActionsButton from './components/ActionsButton/ActionsButton'
import { useSelectedIds } from './hooks/useSelectedIds'

function App() {
  const { resetSelection, selectedIds, handleSelectAll, handleSelectRow } = useSelectedIds()

  return (
    <div className='main-containter'>
      <h1 className='title'>Список компаний</h1>
      <CompanyTable
        selectedIds={selectedIds}
        onChangeSelectRow={handleSelectRow}
        onChangeSelectAll={handleSelectAll}
      />
      <ActionsButton resetSelection={resetSelection} selectedIds={selectedIds} />
    </div>
  )
}

export default App
