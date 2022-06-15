import styled from 'styled-components';

const TextInput = styled.input`
    border: ${(props) => props.error ? '1px solid red' : '1px solid #ddd'};
    outline: none;
    padding: 0 0.5rem;
`

export default TextInput;