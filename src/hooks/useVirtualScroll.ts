import { useState, useEffect, useRef } from 'react'
import { ROW_HEIGHT, VISIBLE_ROWS } from '../variables/const'

export function useVirtualScroll(totalItems: number) {
  const [start, setStart] = useState<number>(0)
  const tableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = tableRef.current

    if (element) {
      const handleScroll = (event: Event) => {
        const target = event.target as HTMLDivElement
        setStart(Math.floor(target.scrollTop / ROW_HEIGHT))
      }

      element.addEventListener('scroll', handleScroll)

      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const getTopHeight = () => ROW_HEIGHT * start
  const getBottomHeight = () => Math.max(0, ROW_HEIGHT * (totalItems - (start + VISIBLE_ROWS)))

  return {
    start,
    tableRef,
    getTopHeight,
    getBottomHeight,
  }
}
