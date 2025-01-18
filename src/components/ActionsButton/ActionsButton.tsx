import './ActionsButton.css'

interface IActionsButtonProps {
  onAddCompany: () => void
  onRemoveCompany: () => void
  selectedIds: string[]
}

function ActionsButton({ onAddCompany, onRemoveCompany, selectedIds }: IActionsButtonProps) {
  return (
    <div className='actions'>
      <button onClick={onAddCompany} className='btn-add'>
        Добавить
      </button>
      <button onClick={onRemoveCompany} className='btn-remove' disabled={selectedIds?.length === 0}>
        Удалить выбранные
      </button>
    </div>
  )
}

export default ActionsButton
