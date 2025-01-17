import './App.css'
import CompanyTable from './components/CompanyTable/CompanyTable'

function App() {

  return (
    <div className="main-containter">
    <h1 className="title">Список компаний</h1>
    <CompanyTable />

      <div className="actions">
        <button className="btn-add">Добавить</button>
        <button className="btn-remove">Удалить выбранные</button>
      </div>

    </div>
  )
}

export default App
