import React, { useEffect, useRef} from 'react'
import axios from 'axios'
import { StyledButton } from './styles/Button.style'
const NewKidButton = ({setKids, kids, inputFieldLoading}) => {
    
    let runOnce = useRef()
    const handleNewKid = ()=> {
        if(!inputFieldLoading.current){
            setKids([...kids, {name:"", surname:"", gifts:[], _id:Math.random()}])
            inputFieldLoading.current = true
            runOnce.current = true   
        }           
    }

    useEffect(() => {
        if(runOnce.current){
            axios.post('http://localhost:5000/api/kid', {
                name:undefined,
                surname:undefined
            })
                .then(response=>{    
                    runOnce.current = false      
                    let updatedKids = [...kids]
                    updatedKids[updatedKids.length-1]._id = response.data._id
                    inputFieldLoading.current = false
                    setKids(updatedKids)                
                })
                .catch(err=>{
                    console.log(err)     
                })             
        }      
    }, [kids])

    return (
        <StyledButton onClick={handleNewKid}>
            Įvesti naują
        </StyledButton>
    )
}

export default NewKidButton
