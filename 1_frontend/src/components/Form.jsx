import React, { useState, useEffect, useRef  } from 'react'
import NameInputField from './NameInputField'
import GiftInputField from './GiftInputField'
import NewKidButton from './NewKidButton'
import NewGiftButton from './NewGiftButton'
import { StyledForm } from './styles/Form.style'
import { FormContainer } from './styles/FormContainer.style'
import { InputFieldContainer } from './styles/InputFieldContainer.style'
import axios from 'axios'

const Form = () => {

    const [isLoading, setIisLoading] = useState(true)
    const [kids, setKids] = useState(null)  
    const [selectedIndex, setSelectedIndex] = useState(0)     

    let inputFieldLoading = useRef(false)   

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/kids')
        .then(response=>{           
            setKids(response.data)
            setIisLoading(false)
        })   
    }, [])

    return (
        <StyledForm onSubmit={handleSubmit}>
            <FormContainer marginBottom={'0.4rem'}>
                 <h3>Kalėdinių dovanų forma</h3>
            </FormContainer>
            <FormContainer>
                <InputFieldContainer isName={true} >
                    {isLoading ? (
                      <p>Loading</p>  
                    ) : (
                        kids.map(kid=>{
                            return (
                                <NameInputField
                                kids={kids}
                                setKids={setKids}
                                name={kid.name}
                                surname={kid.surname}
                                _id={kid._id}
                                gifts={kid.gifts}
                                key={kid._id}
                                setSelectedIndex={setSelectedIndex}
                                selectedIndex={selectedIndex}
                              />
                            )
                        })
                    )}
                
                </InputFieldContainer> 
                <NewKidButton
                setKids={setKids}
                kids={kids}
                inputFieldLoading={inputFieldLoading}
                />

                <InputFieldContainer  >
                {(kids && kids.length>0) &&
                    kids[selectedIndex].gifts.map((giftObject, index)=>{
                    return (
                        <GiftInputField
                        setKids={setKids}
                        kids={kids}   
                        selectedIndex={selectedIndex}                   
                        giftObject={giftObject}
                        index={index}
                        key={giftObject._id}                                          
                        />
                    )
                })
            }
            </InputFieldContainer>
            <NewGiftButton
                kids={kids}
                setKids={setKids}             
                selectedIndex={selectedIndex} 
            />
            </FormContainer>
        </StyledForm>        
    )
}

export default Form
