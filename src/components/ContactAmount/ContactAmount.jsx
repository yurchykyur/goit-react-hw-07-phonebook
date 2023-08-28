import { TotalContactsText, TotalContactsNum } from './ContactAmount.styled';
import { useSelector } from 'react-redux';

import { selectContacts } from 'components/redux/contacts/selectors';

export default function ContactAmount() {
  const contacts = useSelector(selectContacts);

  const contactsAmount = contacts.length;

  return (
    <TotalContactsText>
      Contacts amount: <TotalContactsNum>{contactsAmount}</TotalContactsNum>
    </TotalContactsText>
  );
}
