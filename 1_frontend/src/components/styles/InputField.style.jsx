import styled from 'styled-components'

export const StyledInputField = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${props => props.justifyContent};
    padding-left: ${props => props.paddingLeft} ;

    @media (max-width: 400px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 0;
        padding:0.5rem 0.2rem;

        & input:nth-child(2){
            margin-top:0.2rem;
        }
      }
`