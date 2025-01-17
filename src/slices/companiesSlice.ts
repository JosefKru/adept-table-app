import { createSlice } from '@reduxjs/toolkit'

interface Company {
  id: number
  name: string
  specificity: string
}

interface CompaniesState {
  companies: Company[]
}

const initialState: CompaniesState = {
  companies: [
    { id: 1, name: 'Компания 1', specificity: 'IT' },
    { id: 2, name: 'Компания 2', specificity: 'Строительство' },
    { id: 2, name: 'Компания 3', specificity: 'Продажи' },
  ],
}

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
})

export default companiesSlice.reducer
