import React from 'react';
import s from './ContatcItem.module.css';
import PropTypes from 'prop-types';

const ContactItem = ({ name, number, id, btnDelete }) => {
  return (
    <li key={id} className={s.item}>
      {name}: {number}
      <button className={s.btn} type="button" onClick={() => btnDelete(id)}>
        <span className={s.btn__name}>delete</span>
      </button>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  btnDelete: PropTypes.func.isRequired,
};
