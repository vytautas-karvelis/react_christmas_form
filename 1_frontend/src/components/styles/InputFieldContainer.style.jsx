import styled from 'styled-components'

export const InputFieldContainer = styled.div`
    padding:0.6rem 0;
    border: 1px solid black;
    margin-bottom: 0.5rem;
    height:120px;
    overflow: auto;
    text-align: center;

    ${props => props.isName && `
        @media (max-width: 400px) {    
    
        
        & div:nth-child(2n) {
        background-color: #eaeae1;
        border-radius: 4px;
        }

        & div:nth-child(odd) {
        background-color: #f5f5f0;
        border-radius: 4px;
        }
    }
    `}
  
`
 
