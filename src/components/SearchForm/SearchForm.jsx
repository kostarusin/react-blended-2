import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';
import { useState } from 'react';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handlChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!query) {
      alert('Insert serch word');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        onChange={handlChange}
        value={query}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
      />
    </SearchFormStyled>
  );
};
