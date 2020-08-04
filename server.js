const express = require('express');
const app = express();

const products = []

app.get('/products',(req,res)=>{
    res.send(products);
})

app.get('/products/:id',(req,res)=>{
    for(let x of products){
        if(x.id === req.params.id) 
            res.send(x);
        }
})
app.post('/products',(req,res)=>{
    const barry = req.body 
    console.log(barry)
    products.push(barry);
    res.send(barry);
})
app.put('/products/:id',(req,res)=>{
    const barry = {
        id: req.body
        }; 
    products.push(barry);
    res.send(barry);
})

app.listen(3000);