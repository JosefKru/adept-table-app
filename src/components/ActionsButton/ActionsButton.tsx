import './ActionsButton.css'

interface IActionsButtonProps {
  onAddCompany: () => void
  onRemoveCompany: () => void
}

function ActionsButton({ onAddCompany, onRemoveCompany }: IActionsButtonProps) {
  return (
    <div className='actions'>
      <button onClick={onAddCompany} className='btn-add'>
        Добавить
      </button>
      <button onClick={onRemoveCompany} className='btn-remove'>
        Удалить выбранные
      </button>
    </div>
  )
}

export default ActionsButton
