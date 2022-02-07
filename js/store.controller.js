'use strict';





function onInit() {
    renderBooks();
}


function renderBooks() {
    const books = getBooksForDisplay();
    const elTable = document.querySelector('.books-table');

    var strHTML = '<tr><th>id</th><th>Title</th><th>Price</th><th>Rating</th><th>Action</th></tr>';

    books.forEach(book =>
        strHTML +=
        `<tr id="${book.id}"><td>${book.id}</td>
        <td>${book.title}</td>
        <td>$${book.price}</td>
        <td>⭐${book.rating}</td>
        <td><button onclick="onReadBook('${book.id}')" class="btn read-btn">Read</button>
        <button onclick="onUpdateMenu('${book.id}')" class="btn update-btn">Update</button>
        <button onclick="onRemoveBook('${book.id}')" class="btn remove-btn">Delete</button>
        </td>
        </tr>`
    );
    elTable.innerHTML = strHTML;
}

function onAddMenu() {
    const elMenu = document.querySelector('.menu');
    const strHTML = `<h4>Add new book</h4><input type="text" placeholder="Book name" name="name">
    <input type="number" placeholder="Price" name="price">
    <div>
        <button class="btn" name="addNew" onclick="onBookAdd()">Add</button>
        <button class="btn" name="exit" onclick="openAndCloseMenu()">Exit</button>
    </div>`;
    openAndCloseMenu();
    elMenu.innerHTML = strHTML;
}

function onBookAdd() {
    const bookName = document.querySelector('input[name="name"]');
    const bookPrice = document.querySelector('input[name="price"]');
    const newBook = createBook(bookName.value, bookPrice.value);

    if (!newBook.title || !newBook.price) return;
    addNewBook(newBook);
    openAndCloseMenu();
    renderBooks();
}

function onRemoveBook(id) {
    const targetRow = document.getElementById(`${id}`);
    targetRow.classList.add('remove-book')
    targetRow.innerHTML = 'Removed';

    setTimeout(() => {
        removeBook(id);
        renderBooks();
    }, 1000);
}

function openAndCloseMenu(effect) {
    const elMenu = document.querySelector('.menu');
    if (effect) elMenu.classList.toggle(effect);
    elMenu.classList.toggle('hide');
}

function onUpdateMenu(id) {
    const elMenu = document.querySelector('.menu');
    const book = getBook(id);

    var options = createRatingOptions();

    const strHTML = `<h4>Update Menu</h4>
    <form onsubmit="onSubmitChange(this,'${book.id}');return false"><h3>Book:${book.title}</h3>
    <span>Current Price:${book.price}</span>
    <input type = "number" name= "price-update" class ="small" min="1" placeholder = "New Price"/>
    <span> Current Rating: ${book.rating} </span>
    ${options}
    <button>Submit</button>
    </form>
    <button onclick="openAndCloseMenu('update-book-menu')">Exit</button>`

    elMenu.innerHTML = strHTML;
    openAndCloseMenu('update-book-menu');
}


function onSubmitChange(event, id) {
    const updatedRating = +event[1].value
    const updatedPrice = +event[0].value

    updateBook(id, updatedPrice, updatedRating);
    renderBooks();
    openAndCloseMenu('update-book-menu')
}


function createRatingOptions() {
    var options = '<select>';
    for (var i = 0; i < 11; i++) {
        options += `<option>${i}</option>`;
    }
    options += '</select>'
    return options;
}

function onReadBook(id) {
    const elMenu = document.querySelector('.menu');
    const book = getBook(id);
    const strHTML = `<h3>${book.title}</h3><h4>Book Description</h3><p>${book.description}</p>
    <form onsubmit="onUserRatingUpdate(this,'${book.id}');return false">
    <input type="number" min="1" max="10" placeholder="Rate here⭐"/>
    <button>Add Rating</button>
    </form>
    <button onclick="openAndCloseMenu('read-book-menu')">Exit</button>`;

    elMenu.innerHTML = strHTML;
    openAndCloseMenu('read-book-menu');
}


function onUserRatingUpdate(ev, id) {
    const newRating = ev[0].value;

    updateRating(id, newRating);
    openAndCloseMenu('read-book-menu')
    renderBooks();

}


function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value
    const isDesc = document.querySelector('.sort-desc').checked
    const sortBy = {}

    sortBy[prop] = (isDesc) ? -1 : 1;

    setBookSort(sortBy)
    renderBooks();
}

function onNextPage() {
    const elPageCounter = document.querySelector('.page-counter');

    setNextPage();
    renderBooks();
    elPageCounter.innerText = gPageIdx;
}

function onPrevPage() {
    const elPageCounter = document.querySelector('.page-counter');

    setPrevPage();
    renderBooks();
    elPageCounter.innerText = gPageIdx;
}