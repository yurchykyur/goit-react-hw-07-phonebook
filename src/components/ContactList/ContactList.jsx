import { useDispatch, useSelector } from 'react-redux';

import {
  ListElement,
  PhonebookList,
  ContactItemWrapper,
  ContactItemName,
  ContactItemNum,
  DeleteBtn,
} from './ContactList.styled';

import { contactsOperations } from 'components/redux/contacts/';
import { filterSelectors } from 'components/redux/filters';

export default function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(filterSelectors.selectFilteredContacts);

  const deleteContacts = id => {
    dispatch(contactsOperations.fetchDeleteContacts(id));
  };

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
