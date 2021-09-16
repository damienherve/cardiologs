import styled from 'styled-components/native';

export const SearchInput = styled.TextInput`
  height: 50px;
  background-color: #eee;
  border-radius: 10px;
  border-width: 2px;
  border-color: darkgray;
  padding: 10px;
`;

SearchInput.defaultProps = {
  placeholder: 'Search by patient name or arrythmia type',
};
