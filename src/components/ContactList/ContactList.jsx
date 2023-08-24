import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from 'components/redux/contacts/contactSlice';

import {
  ListElement,
  PhonebookList,
  ContactItemWrapper,
  ContactItemName,
  ContactItemNum,
  DeleteBtn,
} from './ContactList.styled';

export default function ContactList() {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const deleteContacts = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    dispatch(deleteContact(newContacts));
  };

  const getFilteredContact = () => {
    const normalizedFilterQuery = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterQuery)
    );
  };

  const filteredContacts = getFilteredContact();

  return (
    <>
      <PhonebookList>
        {filteredContacts.map(({ id, number, name }) => {
          return (
            <ListElement key={id}>
              <ContactItemWrapper>
                <ContactItemName>{name}</ContactItemName>
                <ContactItemNum href={`tel:${number}`}>{number}</ContactItemNum>
                <DeleteBtn onClick={() => deleteContacts(id)}>Delete</DeleteBtn>
              </ContactItemWrapper>
            </ListElement>
          );
        })}
      </PhonebookList>
    </>
  );
}
