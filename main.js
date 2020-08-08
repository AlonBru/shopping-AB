//call input ol and button from document
const input = document.querySelector('#input_item');
const addButton = document.querySelector('#add_button');
const searchButton = document.querySelector('#search_button');
const ol = document.querySelector('#itemList');
const searchResultDiv = document.querySelector("#searchResult");
let deleted = []

async function addItem() { //ADD ITEM WITH POST METHOD
  try {
    const newProduct = {
      id: input.value
    };
    let regex = /^\d*$/;
    if (regex.test(newProduct.id)) return;
    const response = await axios.post('http://localhost:3000/products', newProduct);
    const item = document.createElement('li');
    item.className = 'item';
    const itemText = document.createElement('label');
    itemText.className = 'itemText'
    itemText.textContent = newProduct.id;
    const deleteButton = document.createElement('button');
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "delete"
    item.appendChild(itemText);
    item.appendChild(deleteButton);
    ol.appendChild(item);
    input.value = '';
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
addButton.addEventListener("click", addItem);

async function loaded() { //LOAD ITEM FROM SERVER ON LOADING WITH GET METHOD
  try {
    const response = await axios.get('http://localhost:3000/products');
    for (let x of response.data) {
      console.log(x);
      const item = document.createElement('li');
      item.className = 'item';
      const itemText = document.createElement('label');
      itemText.className = 'itemText'
      itemText.textContent = x.id;
      const deleteButton = document.createElement('button');
      deleteButton.className = "deleteButton";
      deleteButton.textContent = "delete"
      item.appendChild(itemText);
      item.appendChild(deleteButton);
      ol.appendChild(item);
    }
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
window.addEventListener("load", loaded)

async function deleteItem(e) { //DELETE ITEM WITH DELETE METHOD
  try {
    const allItems = e.target;
    if (allItems.className === 'deleteButton') {
      const toDelete = e.target.closest('li').textContent.slice(0, -6);
      console.log(toDelete);
      const response = await axios.delete(`http://localhost:3000/products/${toDelete}`);
      ol.removeChild(allItems.closest('li'));
    }
  } catch (error) {
    console.error(error);
  }
}
ol.addEventListener("click", deleteItem);

async function search() { //SEARCH ITEM WITH GET/ID METHOD
  try {
    const searchProduct = input.value;
    let regex = /^\d*$/;
    if (regex.test(searchProduct)) return;
    const response = await axios.get(`http://localhost:3000/products/${searchProduct}`);
    console.log(response);
    const divHaeder = document.createElement('p');
    divHaeder.id = 'divHaeder';
    divHaeder.textContent = 'result of the search';
    const clearButton = document.createElement('button');
    clearButton.id = 'clearButton';
    clearButton.textContent = 'clear';
    const seaerched = document.createElement('p');
    seaerched.id = 'seaerched';
    if (response.data.id) {
      seaerched.textContent = response.data.id;
    } else {
      seaerched.textContent = response.data
    };
    searchResultDiv.appendChild(divHaeder);
    searchResultDiv.appendChild(seaerched);
    searchResultDiv.appendChild(clearButton);
    input.value = '';

    function removeSearch() {
      searchResultDiv.removeChild(divHaeder);
      searchResultDiv.removeChild(seaerched);
      searchResultDiv.removeChild(clearButton);
    }
    clearButton.addEventListener("click", removeSearch);
  } catch (error) {
    console.error(error);
  }
}
searchButton.addEventListener("click", search)

function creatCehangeBar(e) { //CREATE CHANGE BAR ON ITEM CLICK
  const changeInput = document.createElement('input');
  changeInput.className = 'changeInput';
  const changeButton = document.createElement('button');
  changeButton.className = 'changeButton';
  changeButton.textContent = 'change';
  if (e.target.className === 'itemText' && !e.target.closest("label").childNodes[1]) {
    e.target.closest('label').appendChild(changeInput);
    e.target.closest('label').appendChild(changeButton);
  } else if (e.target.className === 'itemText' && e.target.closest("label").childNodes[1]) {
    console.log(e.target);
    while (e.target.closest("label").childNodes[1]) {
      e.target.closest("label").removeChild(e.target.closest("label").childNodes[1]);
    }
  }

  async function change(e) { //CHANGE ITEM WITH PUT METHOD
    try {
      const toChange = e.target.closest('li').textContent.slice(0, -12);
      const changeTo = {
        id: changeInput.value
      };
      let regex = /^\d*$/;
      if (regex.test(changeTo.id)) return;
      const response = await axios.put(`http://localhost:3000/products/${toChange}`, changeTo);
      console.log(response);
      removeAllChildNodes(ol)
      loaded()
    } catch (error) {
      console.error(error);
    }
  }
  changeButton.addEventListener("click", change);
}
ol.addEventListener("click", creatCehangeBar);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}