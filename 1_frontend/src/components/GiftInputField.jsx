import React, { useState, useEffect, useRef, forwardRef } from 'react'
import axios from 'axios'
import { StyledInput } from './styles/Input.style'
import { StyledInputField} from "./styles/InputField.style"

const GiftInputField = ({giftObject, selectedIndex, index, setKids, kids}) => {

    const [kidGift, setKidGift] = useState(giftObject)
    const limiter = useRef(false)    

    const handleGiftChange = (e) => {
        e.preventDefault()
       setKidGift({...kidGift, gift:e.target.value}) 
       limiter.current = true 
    }
 
    useEffect(() => {
        if(limiter.current){           
            let updatedKids = [...kids]
            updatedKids[selectedIndex].gifts[index].gift = kidGift.gift
            setKids(updatedKids)         }
    }, [kidGift])

    useEffect(() => {        
        if(limiter.current){         
            limiter.current = false 
            const timeout = setTimeout(()=> {
                axios.put('http://localhost:5000/api/kid/'+ kids[selectedIndex]._id, {
                    name:kids[selectedIndex].name,
                    surname:kids[selectedIndex].surname,    
                    gifts:kids[selectedIndex].gifts,
                    giftUpdate:""
                })
                .then(response=>{
                })
                .catch(err=>{
                })              
            }, 3000);       
            return ()=> clearTimeout(timeout)
        }       
    }, [kids])

    return (
        <StyledInputField justifyContent={"left"} paddingLeft={"0.55rem"}>
            <StyledInput
             type="text" 
             value ={kidGift.gift}
             name="gift"
             onChange={(e)=>handleGiftChange(e)}
             key={Math.random}
             />
        </StyledInputField>
    )
}

export default forwardRef(GiftInputField)

