import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  FormWrapper,
  FormInputLabel,
  FormSubmitBtn,
  StyledForm,
  StyledField,
  StyledErrorMessage,
} from './ContactForm.styled';

import { fetchAddContacts } from 'components/redux/contacts/contactsOperations';
import { toastWarn } from 'service/toastify';

const addContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('A name is required'),
  number: Yup.number('Please, enter a number')
    .integer("A phone number can't include a decimal point")
    .positive("A phone number can't start with a minus")
    .required('A phone number is required'),
});

export default function ContactForm() {
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const handleFormSubmit = (newContact, { resetForm }) => {
    const { name } = newContact;

    if (
      contacts.length !== 0 &&
      contacts.find(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      toastWarn(`${name} is already in contacts`);

      return;
    }

    dispatch(fetchAddContacts(newContact));
    resetForm();
  };

  return (
    <>
      <FormWrapper>
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={addContactSchema}
          onSubmit={handleFormSubmit}
        >
          <StyledForm>
            <FormInputLabel>
              Name
              <StyledField name="name" type="text" placeholder="John Wick" />
              <StyledErrorMessage component="div" name="name" />
            </FormInputLabel>
            <FormInputLabel>
              Phone number
              <StyledField
                name="number"
                type="tel"
                placeholder="+380501234567"
              />
              <StyledErrorMessage component="div" name="number" />
            </FormInputLabel>
            <FormSubmitBtn type="submit">Add contact</FormSubmitBtn>
          </StyledForm>
        </Formik>
      </FormWrapper>
    </>
  );
}
