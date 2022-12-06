import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Box } from './reusableComponents';
import ContactsInput from './ContactsInput';
import ContactsList from './ContactsList';
import Filter from './Filter';
import storage from '../Services';

export class App extends Component {
  state = { contacts: [], filter: '' };

  componentDidMount() {
    const savedContacts = storage.get('contacts');
    this.setState({ contacts: [...savedContacts] });
  }

  componentDidUpdate(prevProps, prevState) {
    const currentContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    if (prevContacts !== currentContacts) {
      storage.update('contacts', [...currentContacts]);
    }
  }

  onFormSubmit = ({ name, number }) => {
    const isInContacts = this.state.contacts.some(contact => {
      const existName = contact.name.toLowerCase();
      const newName = name.toLowerCase();
      return existName === newName;
    });
    if (isInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    this.setState(prevState => {
      const currentContacts = prevState.contacts;
      return { contacts: [...currentContacts, newContact] };
    });
  };

  onContactDelete = contactId => {
    this.setState(prevState => {
      const currentContacts = prevState.contacts;
      return {
        contacts: currentContacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  onFilterChange = query => {
    this.setState({ filter: query.toLowerCase() });
  };

  render() {
    const { onFormSubmit, onContactDelete, onFilterChange } = this;
    const { filter: filterValue, contacts } = this.state;
    const filteredContacts = contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filterValue) || number.includes(filterValue)
    );
    return (
      <Box border="1px solid black" width="300px" mt="15px" ml="15px" p="4px">
        <h1>Phonebook</h1>
        <ContactsInput onFormSubmit={onFormSubmit} />
        {!!contacts.length && (
          <>
            <Filter onFilterChange={onFilterChange} value={filterValue} />
            <ContactsList
              contacts={filteredContacts}
              onContactDelete={onContactDelete}
            />
          </>
        )}
      </Box>
    );
  }
}
