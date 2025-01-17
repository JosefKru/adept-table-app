import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Company {
  id: number
  name: string
  address: string
}

interface CompaniesState {
  companies: Company[]
}

const initialState: CompaniesState = {
  companies: [
    { id: 1, name: 'Компания 1', address: 'Адрес 1' },
    { id: 2, name: 'Компания 2', address: 'Адрес 2' },
    { id: 3, name: 'Компания 3', address: 'Адрес 3' },
  ],
}

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Company>) => {
        state.companies.push(action.payload);
      },
  },
})

export const { addCompany } = companiesSlice.actions;

export default companiesSlice.reducer
