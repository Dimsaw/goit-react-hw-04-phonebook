import React, { useState } from 'react';

import ContactsList from './componets/ContactsList';
import ContactForm from './componets/ContactForm';
import Filter from './componets/Filter';
import Container from './componets/Container';
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
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',

  // };

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const nextContacts = this.state.contacts;
  //   const prevContacts = prevState.contacts;

  //   if (nextContacts !== prevContacts) {
  //     console.log('add');
  //     localStorage.setItem('contacts', JSON.stringify(nextContacts));
  //   }
  // }

  const formSubmitHandler = ({ name, number }) => {
    const newContact = {
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

    setContacts([newContact, ...setContacts]);
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
    setContacts(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  const emptyContacts = contacts.length;

  // render() {
  //   const { filter } = this.state;
  //   const visibleContact = this.getVisibleContacts();
  //   const emptyContacts = this.state.contacts.length;

  return (
    <>
      <Container>
        <h1 className={s.text}>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />

        <div>
          <h3 className={s.contacts}>Contacts</h3>
          <Filter value={filter} onChange={changeFilter} />
          {emptyContacts > 0 ? (
            <ContactsList
              contacts={getVisibleContacts}
              onDeleteContact={deleteContact}
            />
          ) : (
            <h4>Phonebook is empty</h4>
          )}
        </div>
      </Container>
    </>
  );
}
