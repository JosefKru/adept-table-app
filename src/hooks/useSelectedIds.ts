import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export function useSelectedIds() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const companies = useSelector((state: RootState) => state.companies.companies)

  const handleSelectRow = useCallback(
    (id: string, select: boolean) => {
      setSelectedIds((prevState) => {
        if (select) {
          return prevState.includes(id) ? prevState : [...prevState, id]
        } else {
          return prevState.filter((selectedId) => selectedId !== id)
        }
      })
    },
    [setSelectedIds]
  )

  const handleSelectAll = useCallback(
    (select: boolean) => {
      setSelectedIds(select ? companies.map((item) => item.id) : [])
    },
    [setSelectedIds, companies]
  )

  const resetSelection = useCallback(() => {
    setSelectedIds([])
  }, [])

  return {
    handleSelectAll,
    handleSelectRow,
    setSelectedIds,
    selectedIds,
    resetSelection,
  }
}
