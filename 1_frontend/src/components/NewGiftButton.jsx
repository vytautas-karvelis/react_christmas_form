import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { StyledButton } from './styles/Button.style'
import GiftInputField from './GiftInputField'

const NewGiftButton = ({setKids, kids, selectedIndex, giftFieldLoading}) => {
    
    let runOnce = useRef(false)
    const handleNewGift = ()=> {
            let updatedKids = [...kids]
            updatedKids[selectedIndex].gifts.push({gift:"", _id:Math.random()})                   
            setKids(updatedKids)
            runOnce.current = true   
    }

   useEffect(() => {
        if(runOnce.current){  
                axios.put('http://localhost:5000/api/kid/' + kids[selectedIndex]._id, {
                    newGift:"newGift"
                    })
                    .then(response=>{    
                        let updatedKids = [...kids]     
                        updatedKids[selectedIndex].gifts[updatedKids[selectedIndex].gifts.length-1]._id = response.data                 
                        runOnce.current = false
                        setKids(updatedKids)
                    })
                    .catch(err=>{
                    }) 
            }
    }, [kids])

    return (       
            <StyledButton onClick={handleNewGift}>
                Įvesti naują
            </StyledButton> 
    )
       
    
}

export default NewGiftButton