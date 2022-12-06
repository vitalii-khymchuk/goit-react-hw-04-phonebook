import PropTypes from 'prop-types';
import { Button } from 'components/reusableComponents';
import { Box } from 'components/reusableComponents';
import { Title } from 'components/reusableComponents';
import { ContactItem } from './ContactsList.styled';

export default function ContactsList({ contacts, onContactDelete }) {
  return (
    <Box>
      <Title>Contacts</Title>
      <ol>
        {contacts.map(({ name, number, id }) => (
          <ContactItem key={id}>
            <div>
              <span>{name}: </span>
              {number}
              <Button onClick={() => onContactDelete(id)}>Delete</Button>
            </div>
          </ContactItem>
        ))}
      </ol>
    </Box>
  );
}

ContactsList.propTypes = {
  onContactDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string.isRequired,
    })
  ),
};
