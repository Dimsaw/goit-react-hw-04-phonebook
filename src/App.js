import React, { useState } from 'react';

import ContactsList from './componets/ContactsList';
import ContactForm from './componets/ContactForm';
import Filter from './componets/Filter';
import Container from './componets/Container';
import useLocalStorage from './hooks/useLocalStorage';
import s from './App.module.css';
import shortid from 'shortid';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '380px',
  position: 'center-top',
  failure: {
    background: '#00bfff',
    textColor: '#fff',
  },
});

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts');
  const [filter, setFilter] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      return Notiflix.Notify.failure(`${name} is alredy in contacts`);
    }

    setContacts([contact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normolizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normolizedFilter),
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filterContacts = getVisibleContacts();

  return (
    <>
      <Container>
        <h1 className={s.text}>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />

        <div>
          <h3 className={s.contacts}>Contacts</h3>
          <Filter value={filter} onChange={changeFilter} />

          <ContactsList
            contacts={filterContacts}
            onDeleteContact={deleteContact}
          />
        </div>
      </Container>
    </>
  );
}
