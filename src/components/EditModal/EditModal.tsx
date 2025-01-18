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

  const handleSave = () => {
    onSave({ ...company, ...newValues })
    onClose()
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h3>Редактировать компанию</h3>
        <label htmlFor='name'>
          Название:
          <input
            id='name'
            value={newValues.name}
            onChange={(e) => setNewValues({ ...newValues, name: e.target.value })}
          />
        </label>
        <label htmlFor='address'>
          Адрес:
          <input
            id='address'
            value={newValues.address}
            onChange={(e) => setNewValues({ ...newValues, address: e.target.value })}
          />
        </label>
        <div className='actions'>
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  )
}

export default EditModal
