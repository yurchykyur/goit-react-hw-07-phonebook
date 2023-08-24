import { createSlice } from '@reduxjs/toolkit';
import { contactsInitialState } from './initialState';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    createContact: (state, action) => {
      state.push({ ...action.payload });
    },
    deleteContact: (_, action) => [...action.payload],
  },
});

export const contactReducer = contactSlice.reducer;

export const { createContact, deleteContact } = contactSlice.actions;
