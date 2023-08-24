import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

import {
  FormWrapper,
  FormInputLabel,
  FormSubmitBtn,
  StyledForm,
  StyledField,
  StyledErrorMessage,
} from './ContactForm.styled';

import { createContact } from 'components/redux/contacts/contactSlice';
import { toast } from 'react-toastify';

const addContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('A name is required'),
  number: Yup.number()
    .integer("A phone number can't include a decimal point")
    .positive("A phone number can't start with a minus")
    .required('A phone number is required'),
});

export default function ContactForm() {
  const contacts = useSelector(state => state.contacts);
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
      toast.warn(`${name} is already in contacts`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    const contact = { ...newContact, id: nanoid() };

    dispatch(createContact(contact));
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
