import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Company } from '../components/types/models'

interface CompaniesState {
  companies: Company[]
}

const initialState: CompaniesState = {
  companies: [
    { id: Date.now().toString() + '-1', name: 'Компания 1', address: 'Адрес 1' },
    { id: Date.now().toString() + '-2', name: 'Компания 2', address: 'Адрес 2' },
    { id: Date.now().toString() + '-3', name: 'Компания 3', address: 'Адрес 3' },
  ],
}

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload)
    },
    removeCompany: (state, action) => {
      state.companies = state.companies.filter((com) => com.id !== action.payload)
    },
  },
})

export const { addCompany, removeCompany } = companiesSlice.actions

export default companiesSlice.reducer
