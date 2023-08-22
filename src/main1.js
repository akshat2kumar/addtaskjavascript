const inputText = document.getElementById('inputText');
const addItemButton = document.getElementById('addItem');
const itemList = document.getElementById('itemList');
const completedList = document.getElementById('completedList');
const clear = document.getElementById('clearall');
let array = JSON.parse(localStorage.getItem('data')) || [];

array.forEach((itemData, index) => {
    createListItem(itemData.text, index, itemData.color);
    if (itemData.color === 'blue') {
        addCompletedItem(itemData.text);
    }
    
});
console.log(array)
function addItem() {
    const text = inputText.value.trim();

    if (text !== '') {
        createListItem(text, array.length);
        array.push({ text, color: 'none' });
        localStorage.setItem('data', JSON.stringify(array));
        inputText.value = '';
    }
}

function clearall() {
    array = [];
    localStorage.setItem('data', JSON.stringify(array));
    itemList.innerHTML = '';
    completedList.innerHTML = '';
}

clear.addEventListener('click', clearall);

function createListItem(text, index, color = 'none') {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="itemList">${text}</span>
      <i onclick="edit(this, ${index})" class="bi bi-pencil-square"></i>
      <button class="deleteItem">Delete</button>
      <i id="thumb-${index}" class="bi bi-hand-thumbs-up-fill"></i>
    `;
    itemList.appendChild(li);
    addDeleteButtonListener(li);
    addThumbClickListener(index, color);
}

function addThumbClickListener(index, color) {
    const thumbIcon = document.getElementById(`thumb-${index}`);
    thumbIcon.style.color = color;

    thumbIcon.addEventListener('click', () => {
        if (color === 'none') {
            thumbIcon.style.color = 'blue';
            array[index].color = 'blue';
            localStorage.setItem('data', JSON.stringify(array));
            addCompletedItem(array[index].text);
        } else if (color === 'blue') {
            thumbIcon.style.color = 'none';
            array[index].color = 'none';
            localStorage.setItem('data', JSON.stringify(array));
            removeCompletedItem(array[index].text);
        }
    });
    
}

function addCompletedItem(text) {
    const completedItem = document.createElement('li');
    completedItem.textContent = text;
    completedList.appendChild(completedItem);
}

function removeCompletedItem(text) {
    const completedItems = completedList.querySelectorAll('li');
    completedItems.forEach(item => {
        if (item.textContent.includes(text)) {
            completedList.removeChild(item);
        }
    });
    // Additionally, update your array to remove the completed item
    array = array.filter(item => item.text !== text);
 
}

function addDeleteButtonListener(item) {
    const deleteButton = item.querySelector('.deleteItem');
    deleteButton.addEventListener('click', () => {
        const itemText = item.querySelector('span').textContent;
        const index = array.findIndex(item => item.text === itemText);
        if (index !== -1) {
            array.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(array));
            removeCompletedItem(itemText);
        }
        itemList.removeChild(item);
    });
}

function edit(element, index) {
    inputText.style.backgroundColor = 'yellow';
    console.log(array[index].text)
    document.getElementById("inputText").value=array[index].text
    addItemButton.removeEventListener('click', addItem);
    addItemButton.removeEventListener('click', edit);
    
    addItemButton.addEventListener('click', function handleEdit() {
        console.log(index);
        console.log('Original item:', array[index]);
        array[index].text = inputText.value.trim();
        localStorage.setItem('data', JSON.stringify(array));
        console.log('Updated item:', array[index]);
        
        const listItem = element.closest('li');
        const listItemText = listItem.querySelector('span');
        listItemText.textContent = array[index].text;
        
        inputText.style.backgroundColor = '';
        inputText.value = '';
        
        addItemButton.removeEventListener('click', handleEdit);
        addItemButton.removeEventListener('click', addItem);
        addItemButton.addEventListener('click', addItem);
    });
}

addItemButton.addEventListener('click', addItem);
