// const axios= require('axios')
//call input ol and button from document
const input = document.querySelector('#input_item');
const addButton = document.querySelector('#add_button');
const searchButton = document.querySelector('#load_button');
const ol = document.querySelector('#itemList');
let deleted = []
// const data = axios.post('/products');

async function addItem() {
    try {
        const newProduct = input.value;
        let regex = /^\d*$/;
        if(regex.test(newProduct)) throw('id canot be number or empty');
        const response = await axios.post('http://localhost:3000/products',newProduct);
        const item = document.createElement('li');
        item.textContent = newProduct;
        item.id='item';
        const deleteButton = document.createElement('button');
        deleteButton.className="deleteButton";
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
        const response = await axios.get('http://localhost:3000/products');
        for(let x of response.data){
        const item = document.createElement('li');
        item.textContent = x.id;
        item.id = 'item';
        const deleteButton = document.createElement('button');
        deleteButton.className="deleteButton";
        deleteButton.textContent = "delete"
        item.appendChild(deleteButton);
        ol.appendChild(item);
        }
        console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  window.addEventListener("load",loaded)

  //NEED TO FIX
  async function deleteItem(e){
    try {
        const allItems = e.target;
        console.log(allItems);
        if(allItems.className === 'deleteButton'){
        const toDelete = e.target.closest('li').textContent.slice(0,-6);
        console.log(toDelete);
        const response = await axios.delete(`http://localhost:3000/products/${toDelete}`);
        ol.removeChild(allItems.closest('li'));}  
    } catch (error) {
      console.error(error);
    }
  }
 ol.addEventListener("click",deleteItem);

//  async function change(){
//    try{
//     const changeProduct = {id:toChange.value};
//     const response = await axios.put('http://localhost:3000/products/:id',changeProduct); 
//    }catch (error) {
//     console.error(error);
//   }
//  }

//  toChangeButton.addEventListener("click",change);

//  async function search(){
//   try{
//    const searchProduct = input.value;
//    const response = await axios.get(`http://localhost:3000/products/${searchProduct}`)
//     console.error(error);
//  } catch (error) {
//   console.error(error);
//   }
// }
// searchButton.addEventListener("click",search)

