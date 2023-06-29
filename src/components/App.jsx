import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const phoneBookLS = 'KEY_PHONE_BOOK';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount = () => {
    const listFromLS = JSON.parse(localStorage.getItem(phoneBookLS));
    if (listFromLS) {
      this.setState({ contacts: listFromLS });
    }
  };

  componentDidUpdate = prevState => {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(phoneBookLS, JSON.stringify(this.state.contacts));
    }
  };

  addContact = ({ name, number }) => {
    const normoliseName = name.toLowerCase();
    const contactFind = this.state.contacts.find(
      contact =>
        contact.name.toLowerCase() === normoliseName ||
        contact.number === number
    );
    if (contactFind) {
      alert(`${contactFind.name} is alredy contact`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== idContact),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normoliseFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normoliseFilter) ||
        number.toLowerCase().includes(normoliseFilter)
    );
    return (
      <div className={styles.contacts}>
        <h1>Phone book</h1>
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter}></Filter>
        {contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            handleDelete={this.deleteContact}
          ></ContactList>
        )}
      </div>
    );
  }
}

export default App;
