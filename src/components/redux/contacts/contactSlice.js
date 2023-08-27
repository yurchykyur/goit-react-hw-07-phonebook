import { createSlice } from '@reduxjs/toolkit';

import { contactsInitialState } from './initialState';
import {
  fetchAddContacts,
  fetchContacts,
  fetchDeleteContacts,
} from './contactsOperations';
import { toastSuccess } from 'service/toastify';

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
    builder.addCase(fetchContacts.fulfilled, (state, action) => ({
      ...state,
      items: [...action.payload],
      isLoading: false,
    }));
    builder.addCase(fetchContacts.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(fetchContacts.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));

    builder.addCase(fetchDeleteContacts.fulfilled, (state, action) => {
      toastSuccess('Contact deleted successfully');
      return { ...state, items: [...action.payload], isLoading: false };
    });
    builder.addCase(fetchDeleteContacts.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(fetchDeleteContacts.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));

    builder.addCase(fetchAddContacts.fulfilled, (state, action) => {
      toastSuccess('Contact successfully added');

      return { ...state, items: [...action.payload], isLoading: false };
    });
    builder.addCase(fetchAddContacts.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(fetchAddContacts.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));
  },
});

export const contactReducer = contactSlice.reducer;
