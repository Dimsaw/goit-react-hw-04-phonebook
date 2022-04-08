import React from 'react';
import s from './ContatcItem.module.css';
import PropTypes from 'prop-types';

const ContactItem = ({ name, number, onClick }) => {
  return (
    <>
      {name}: {number}
      <button className={s.btn} type="button" onClick={onClick}>
        <span className={s.btn__name}>delete</span>
      </button>
    </>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
