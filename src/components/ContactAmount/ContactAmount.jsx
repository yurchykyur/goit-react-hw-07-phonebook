import { TotalContactsText, TotalContactsNum } from './ContactAmount.styled';
import { useSelector } from 'react-redux';

export default function ContactAmount() {
  const contacts = useSelector(state => state.contacts.items);

  const contactsAmount = contacts.length;

  return (
    <TotalContactsText>
      Contacts amount: <TotalContactsNum>{contactsAmount}</TotalContactsNum>
    </TotalContactsText>
  );
}
