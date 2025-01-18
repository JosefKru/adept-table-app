import { useState } from 'react'
import { Company } from '../types/models'
import './EditModal.css'

interface IEditModalProps {
  company: Company | null
  onClose: () => void
  onSave: (updatedCompany: Company) => void
}

const EditModal = ({ company, onClose, onSave }: IEditModalProps) => {
  const [newValues, setNewValues] = useState({
    name: company?.name || '',
    address: company?.address || '',
  })

  if (!company) return null

  const handleSubmit = () => {
    if (newValues.address && newValues.name) {
      onSave({ ...company, ...newValues })
      onClose()
    }
  }

  return (
    <div className='modal-overlay'>
      <form className='modal-content' onSubmit={handleSubmit}>
        <h3>Редактор компании</h3>
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
          <button onClick={onClose}>Закрыть</button>
        </div>
      </form>
    </div>
  )
}

export default EditModal
