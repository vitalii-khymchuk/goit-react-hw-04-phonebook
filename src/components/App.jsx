import React, { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Box } from './reusableComponents';
import ContactsInput from './ContactsInput';
import ContactsList from './ContactsList';
import Filter from './Filter';
import storage from '../Services';

export function App() {
  const [contacts, setContacts] = useState(() => storage.get('contacts'));
  const [filter, setFilter] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      storage.update('contacts', contacts);
    }
    isFirstRender.current = false;
  }, [contacts]);

  const onFormSubmit = ({ name, number }) => {
    const isInContacts = contacts.some(contact => {
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
    setContacts(contacts => [...contacts, newContact]);
  };

  const onContactDelete = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  const onFilterChange = query => {
    setFilter(query.toLowerCase());
  };

  const filteredContacts = contacts.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(filter) || number.includes(filter)
  );
  return (
    <Box border="1px solid black" width="300px" mt="15px" ml="15px" p="4px">
      <h1>Phonebook</h1>
      <ContactsInput onFormSubmit={onFormSubmit} />
      {!!contacts.length && (
        <>
          <Filter onFilterChange={onFilterChange} value={filter} />
          <ContactsList
            contacts={filteredContacts}
            onContactDelete={onContactDelete}
          />
        </>
      )}
    </Box>
  );
}
