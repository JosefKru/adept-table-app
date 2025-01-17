import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import CompanyTable from './components/CompanyTable/CompanyTable'
import { RootState } from './store/store'
import { addCompany } from './slices/companiesSlice'

function App() {
  const companies = useSelector((state: RootState) => state.companies.companies)
  const dispatch = useDispatch()

  console.log(companies)

  const handleAddCompany = () => {
    const nextValCom = companies[companies.length - 1].id + 1
    const newCompany = {
      id: nextValCom,
      name: `Компания ${nextValCom}`,
      address: `Fдрес ${nextValCom}`,
    }
    dispatch(addCompany(newCompany))
  }

  return (
    <div className='main-containter'>
      <h1 className='title'>Список компаний</h1>
      <CompanyTable />

      <div className='actions'>
        <button onClick={handleAddCompany} className='btn-add'>
          Добавить
        </button>
        <button className='btn-remove'>Удалить выбранные</button>
      </div>
    </div>
  )
}

export default App
