// const axios= require('axios')
//call input ol and button from document
const input = document.querySelector('#input_item');
const addButton = document.querySelector('#add_button');
const loadButton = document.querySelector('#load_button');
const ol = document.querySelector('#itemList');
let deleted = []
// const data = axios.post('/products');

async function addItem() {
    try {
        const newProduct = {id:input.value};
        const response = await axios.post('http://localhost:3000/products',newProduct);
        const item = document.createElement('li');
        item.textContent = newProduct.id;
        const deleteButton = document.createElement('button');
        deleteButton.id="deleteButton";
        deleteButton.textContent = "delete"
        item.appendChild(deleteButton);
        ol.appendChild(item);
        console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  addButton.addEventListener("click",addItem);

  async function loaded(){
    try {
        const newProduct = {id:input.value};
        const response = await axios.get('http://localhost:3000/products');
        for(let x of response.data){
        const item = document.createElement('li');
        item.textContent = x.id;
        const deleteButton = document.createElement('button');
        deleteButton.id="deleteButton";
        deleteButton.textContent = "delete"
        item.appendChild(deleteButton);
        ol.appendChild(item);
        }
        console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  loadButton.addEventListener("click",loaded)

  async function deleteItem(){
    try {
        const response = await axios.delete('http://localhost:3000/products/:id');
        const allItems= ol.childNodes;
        const allDeleteButton=allItems.childNodes;
        if(e.target === allItems.childNodes){
            ol.removeChild(e.target)
        }else{return};
        console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
 ol.addEventListener("click",deleteItem)