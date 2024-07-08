import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import * as yup from 'yup';

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required().positive(),
});

const initialValues = { name: '', number: '' };

export const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.contact_form}>
        <div className={css.contact_form_wrapper}>
          <label className={css.label}>
            Name
            <Field type="text" name="name" className={css.input} />
          </label>
          <FormError name="name" />

          <label className={css.label}>
            Number
            <Field
              type="tel"
              name="number"
              className={css.input}
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
        </div>
        <button type="submit" className={css.btn_submit}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
