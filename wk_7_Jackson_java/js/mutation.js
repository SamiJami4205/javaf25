var elList, addLink, newText, counter, listItems;

elList = document.getElementById('list');
addLink = document.querySelector.Selector('a');
counter = document.getElementById('counter');

function addItem(e) {
    e.preventDefault();
    newEl = document.createElement('li');
    newText = document.querySelector('a');
    newEl.appendChild(newText);
    elList.appendChild(newEl);
}
function updateCount() {
    listItems = listItems.getElementByTagName('li').length;
    counter.innerHTML = listItems;
}

addLink.addEventListener('click', addItem, false);
elList.addEventListener('DOMNodeInserted', updateCount, false);