import styled from 'styled-components';

const Button = styled.button`
    background-color: #dfdfdf;
    border: none;
    outline: none;
    border-radius: 0.1rem;
    padding: 0.50rem 1rem;
    cursor: pointer;
    text-transform: uppercase;
    margin-top: 0.5rem;

    &:hover {
        background: #ccc;
    }
`
export default Button;