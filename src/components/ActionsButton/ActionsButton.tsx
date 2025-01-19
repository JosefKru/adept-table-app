import { memo, useCallback } from 'react'
import './ActionsButton.css'
import { Company } from '../../types/models'
import { addCompany, removeCompany } from '../../slices/companiesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'

interface IActionsButtonProps {
  resetSelection: () => void
  selectedIds: string[]
}

const ActionsButton = memo(({  selectedIds, resetSelection }: IActionsButtonProps) => {
  const companies = useSelector((state: RootState) => state.companies.companies)  
  const dispatch: AppDispatch = useDispatch()

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
    <div className='actions'>
      <button onClick={handleAddCompany} className='btn-add'>
        Добавить
      </button>
      <button onClick={handleRemoveCompany} className='btn-remove' disabled={selectedIds?.length === 0}>
        Удалить выбранные
      </button>
    </div>
  )
})


export default ActionsButton
