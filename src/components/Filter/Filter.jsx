import PropTypes from 'prop-types';
import { Box } from 'components/reusableComponents';
import { Title } from 'components/reusableComponents';

export default function Filter({ onFilterChange, value }) {
  function onChange(e) {
    const query = e.currentTarget.value;
    onFilterChange(query);
  }
  return (
    <Box>
      <Title>Type to search</Title>
      <input value={value} name="filter" onChange={onChange} type="text" />
    </Box>
  );
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
