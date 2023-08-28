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
import { selectFilteredContacts } from 'components/redux/filters/selectors';

export default function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  const deleteContacts = id => {
    dispatch(fetchDeleteContacts(id));
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
