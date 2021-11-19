import React, { useState, useEffect, useRef } from 'react'
import { StyledInput } from './styles/Input.style'
import { StyledInputField} from "./styles/InputField.style"
import axios from 'axios'

const InputField = ({name, surname, _id, setSelectedIndex, setKids, selectedIndex, kids, gifts}) => {

    const [kid, setKid] = useState({name, surname, gifts})

    const runOnce = useRef(false)
    const handleKid = (e) => {   
        runOnce.current = true
        let kidArray = [...kids]     
        if(e.target.name === "name"){
            kidArray[selectedIndex].name = e.target.value
            setKids(kidArray)
            setKid({...kid, name:e.target.value})
        } else if (e.target.name === "surname") {
            kidArray[selectedIndex].surname = e.target.value
            setKid({...kid, surname:e.target.value}) 
            setKids(kidArray)
        }
    }

    const handleClick = (e) => {      
        setSelectedIndex(kids.findIndex(kid=>kid._id ===_id))       
    }

    useEffect(()=>{
        if(runOnce.current){
            runOnce.current = false
            const timeout = setTimeout(()=> {
                axios.put('http://localhost:5000/api/kid/'+ _id, {
                    name:kid.name,
                    surname:kid.surname,    
                    gifts:kid.gifts
                })
                .then(response=>{
                })
                .catch(err=>{
                })
            }, 1000);  
            return ()=> clearTimeout(timeout)
        }       
    }, [kid])

    return (
        <StyledInputField justifyContent={"space-around"} data-set={_id} onClick={(e)=>handleClick(e)}>
            <StyledInput type="text" value={kid.name} name="name" onChange={(e)=>handleKid(e)} autoComplete="cc-csc"/>
            <StyledInput type="text" value={kid.surname} name="surname" onChange={(e)=>handleKid(e)} autoComplete="cc-csc"/>
        </StyledInputField>
    )
}

export default InputField
