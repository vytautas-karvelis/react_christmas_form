const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Kid = require('./models/Kid')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT; 

mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology:true       
    })
    .then(res=>app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}...`)))
    .catch(err=>res.json({status:err}))

app.use(cors())
app.use(express.json())

app.get('/api/pop', (req, res)=>{
    let kid1 = {
        name:"John",
        surname:"Smith",
        gifts:[{gift:"Gift1"},{gift:"Gift2"}, {gift:"Gift3"}]
    }

    const kid = new Kid(kid1)
    kid.save()
        .then((data) => res.json({ status: 'Success' }))
        .catch((err) =>{
          res.json({ status: err })
        })
})

//get all kids
app.get('/api/kids', (req, res)=>{
    Kid.find({}).then(data=>res.json(data))   
})

//update kid
app.put('/api/kid/:id', (req, res)=>{
    let kidId = req.params.id;

    if("giftUpdate" in req.body){
        req.body.gifts.forEach((gift, index)=>{
            Kid.findByIdAndUpdate(kidId, {$set: {[`gifts.${index}.gift`]:gift.gift}}, {new: true})
            .then((data) => console.log(data))
            .catch((err) => {
                res.json({status:err})
                return
            });         
        })    
        res.send()
    } 
    else if('name' in req.body && 'surname' in req.body){
        Kid.findByIdAndUpdate(kidId, req.body)
        .then((data) => res.json({ status: 'Kid updated' }))
        .catch((err) => res.json({ status: err }));
    }
   else if('newGift' in req.body){        
        Kid.findByIdAndUpdate(kidId, {$push: {gifts: {gift:""}}}, {new: true})
        .then((data) =>{
            res.json(data.gifts[data.gifts.length-1]._id.toString())           
        } )
        .catch((err) => res.json({ status: err }));
    }   
})

//post new kid
app.post('/api/kid', (req, res)=>{
    console.log(req.body)
    const kid = new Kid(req.body)

    kid.save()
        .then((data) => res.json(data))
        .catch((err) =>{       
          res.json({ status: err })
        })
})
