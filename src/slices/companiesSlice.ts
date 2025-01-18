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
    addCompany: (state: CompaniesState, action: PayloadAction<Company>) => {
      state.companies.push(action.payload)
    },
    removeCompany: (state: CompaniesState, action: PayloadAction<string>) => {
      state.companies = state.companies.filter((com) => com.id !== action.payload)
    },
    editCompany: (state: CompaniesState, action: PayloadAction<Company>) => {
      state.companies = state.companies.map((com) => (com.id === action.payload.id ? action.payload : com))
    },
  },
})

export const { addCompany, removeCompany, editCompany } = companiesSlice.actions

export default companiesSlice.reducer
