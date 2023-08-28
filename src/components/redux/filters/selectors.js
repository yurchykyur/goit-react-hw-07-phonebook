import { createSelector } from '@reduxjs/toolkit';

import { selectContacts } from '../contacts/selectors';

export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, valueFilter) => {
    const normalizedFilterQuery = valueFilter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterQuery)
    );
  }
);
