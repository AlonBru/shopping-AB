const express = require('express');
const app = express();

app.use(express.json());
const products = [
    {
        id:'a',
        name:'Inigo Montoya',
        you:'killed my father',
        prepare:'to die',

    }
]

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
    console.log(req.body)
    products.push(barry);
    res.send(barry);
})
app.put('/products/:id',(req,res)=>{
    const barry = req.body; 
    for(let x of products){
        if(x.id===req.params.id){
            x=barry;
            res.send(`updated ${x.id} with ${JSON.stringify(barry)}`);
        }
    }
    
})
app.delete('/products/:id',(req,res)=>{ 
    for(let x of products){
        if(x.id===req.params.id){
            delete x;
            res.send(`deleted ${x.id}`);
        }
    }
    
})

app.listen(3000);