import { useState } from 'react'
import { Company } from '../../types/models'
import './EditModal.css'

interface IEditModalProps {
  selectedCompany: Company | null
  onClose: () => void
  onSave: (updatedCompany: Company) => void
}

const EditModal = ({ selectedCompany, onClose, onSave }: IEditModalProps) => {
  const [newValues, setNewValues] = useState({
    name: selectedCompany?.name || '',
    address: selectedCompany?.address || '',
  })

  if (!selectedCompany) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newValues.address && newValues.name) {
      onSave({ ...selectedCompany, ...newValues })
      onClose()
    }
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h3>Редактор компании</h3>
        <form id='form-modal' name='form-modal' onSubmit={handleSubmit}>
          <label htmlFor='name'>
            Название:
            <input
              id='name'
              value={newValues.name}
              onChange={(e) => setNewValues({ ...newValues, name: e.target.value })}
              required
              maxLength={30}
            />
          </label>
          <label htmlFor='address'>
            Адрес:
            <input
              id='address'
              value={newValues.address}
              onChange={(e) => setNewValues({ ...newValues, address: e.target.value })}
              required
              maxLength={40}
            />
          </label>
          <div className='actions'>
            <button type='submit'>Сохранить</button>
            <button type='button' onClick={onClose}>
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal
