import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import ContactItem from '../ContactItem';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <ContactItem
            name={name}
            number={number}
            onClick={() => onDeleteContact(id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
