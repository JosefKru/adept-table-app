import { useState, useCallback } from 'react'
import { Company } from '../types/models'
import { useDispatch } from 'react-redux'
import { editCompany } from '../slices/companiesSlice'
import { AppDispatch } from '../store/store'

export function useModal() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const dispatch: AppDispatch = useDispatch()

  const handleCloseModal = useCallback(() => setSelectedCompany(null), [])

  const handleEditCompany = useCallback(
    (company: Company, event: React.MouseEvent) => {
      event.stopPropagation()
      setSelectedCompany(company)
    },
    [setSelectedCompany]
  )

  const handleSaveCompany = useCallback(
    (company: Company) => {
      if (company) {
        dispatch(editCompany(company))
        handleCloseModal()
      }
    },
    [dispatch, handleCloseModal]
  )

  return {
    handleEditCompany,
    selectedCompany,
    handleCloseModal,
    handleSaveCompany,
  }
}
