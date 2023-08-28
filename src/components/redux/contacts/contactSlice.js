import { createSlice } from '@reduxjs/toolkit';

import { contactsInitialState } from './initialState';
import {
  fetchAddContacts,
  fetchContacts,
  fetchDeleteContacts,
} from './contactsOperations';
import { toastSuccess, toastError } from 'service/toastify';

const handleRejected = (state, action) => {
  toastError('Something went wrong, please try again later');
  return {
    ...state,
    error: action.payload,
    isLoading: false,
  };
};

const handlePending = state => ({
  ...state,
  isLoading: true,
});

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    // createContact: (state, action) => {
    //   state.push({ ...action.payload });
    // },
    // deleteContact: (_, action) => [...action.payload],
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.pending, handlePending);
    builder.addCase(fetchContacts.fulfilled, (state, action) => ({
      ...state,
      items: [...action.payload],
      isLoading: false,
    }));
    builder.addCase(fetchContacts.rejected, handleRejected);

    builder.addCase(fetchDeleteContacts.pending, handlePending);
    builder.addCase(fetchDeleteContacts.fulfilled, (state, action) => {
      toastSuccess('Contact deleted successfully');
      return { ...state, items: [...action.payload], isLoading: false };
    });
    builder.addCase(fetchDeleteContacts.rejected, handleRejected);

    builder.addCase(fetchAddContacts.pending, handlePending);
    builder.addCase(fetchAddContacts.fulfilled, (state, action) => {
      toastSuccess('Contact added successfully');
      return { ...state, items: [...action.payload], isLoading: false };
    });
    builder.addCase(fetchAddContacts.rejected, handleRejected);
  },
});

export const contactReducer = contactSlice.reducer;
