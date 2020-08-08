const express = require('express');
const app = express();

app.use(express.json());
const products = []

app.get('/products',(req,res)=>{
    res.send(products);
})

app.get('/products/:id',(req,res)=>{
    for(let x of products){
        if(x.id === req.params.id) 
            res.send(x);
        }
        res.send('no such item!')
})
app.post('/products',(req,res)=>{
    const barry = req.body
    if (barry=={})res.send('empty!');
    console.log(req.body)
    products.push(barry);
    res.send(barry);
})
app.put('/products/:id',(req,res)=>{
    const barry = req.body; 
    for(let x in products){
        if(products[x].id===req.params.id){
            products.splice(x,1,barry);
            res.send(`updated ${req.params.id} with ${JSON.stringify(barry)}`);
        }
    }
    res.send('no such item!')
})
app.delete('/products/:id',(req,res)=>{ 
    for(let x in products){
        if(products[x].id===req.params.id){
            products.splice(x,1);
            res.send(`deleted ${req.params.id}`);
        }
    }
    res.send('no such item!')
    
})

app.listen(3000);