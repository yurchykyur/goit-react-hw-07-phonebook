import React from 'react';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import ContactAmount from 'components/ContactAmount';
import Notification from 'components/Notification';

import { AppContainer, MainTitle, SecondTitle } from './App.styled';
import { useSelector } from 'react-redux';

export default function App() {
  const contacts = useSelector(state => state.contacts);

  const isContact = !contacts.length ? false : true;

  return (
    <AppContainer>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm />
      <SecondTitle>Contacts</SecondTitle>
      <Filter />
      <ContactAmount></ContactAmount>
      {isContact ? (
        <ContactList />
      ) : (
        <Notification
          message={'There are no contacts in your phonebook'}
        ></Notification>
      )}
    </AppContainer>
  );
}
