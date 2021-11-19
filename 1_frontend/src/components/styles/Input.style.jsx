import styled from "styled-components";

export const StyledInput = styled.input`
    padding: 0.3rem 0.5rem;    
    margin-top:0.5rem;  
    width: 40%;
    border:0;   
    border-bottom: 1px solid lightgray;
   
    @media (max-width: 400px) {
        flex-direction: column;
        width:80%;
        border:none;
        border-radius:3px;
        margin-top:0;        
      }


`