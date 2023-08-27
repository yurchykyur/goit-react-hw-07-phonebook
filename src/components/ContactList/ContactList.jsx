import { useDispatch, useSelector } from 'react-redux';

import {
  ListElement,
  PhonebookList,
  ContactItemWrapper,
  ContactItemName,
  ContactItemNum,
  DeleteBtn,
} from './ContactList.styled';
import { fetchDeleteContacts } from 'components/redux/contacts/contactsOperations';

export default function ContactList() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const deleteContacts = id => {
    dispatch(fetchDeleteContacts(id));
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
