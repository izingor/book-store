'use strict';


const STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 15;

var gBooks;
var gSort = { title: '', price: Number };
var gPageIdx = 0;


_createBooks();



function getBooksForDisplay() {
    var books = gBooks.slice();
    const startIdx = gPageIdx * PAGE_SIZE;

    books = books.slice(startIdx, startIdx + PAGE_SIZE);

    return books;
}


function _createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY);
    if (!gBooks || !gBooks.length) {
        gBooks = [];
        for (let i = 0; i < 40; i++) {
            gBooks.push(createBook());
        }
        saveToStorage(STORAGE_KEY, gBooks);
    }
}


function createBook(title = randomBookName(), price = getRandomIntInclusive(2, 15)) {
    const book = {
        id: makeId(),
        title: title,
        price: price,
        description: makeLorem(),
        rating: 0
    };
    return book;
}

function addNewBook(book) {
    gBooks.unshift(book);
    saveToStorage(STORAGE_KEY, gBooks);
}


function removeBook(id) {
    const bookIdx = gBooks.findIndex(book => book.id === id);
    gBooks.splice(bookIdx, 1);
    saveToStorage(STORAGE_KEY, gBooks);
}

function getBook(id) {
    const bookIdx = gBooks.findIndex(book => book.id === id);
    return gBooks[bookIdx];
}


function updateBook(id, price, rating) {
    const book = getBook(id);
    if (rating > 0) book.price = price;
    if (rating > 0) book.rating = rating;
    saveToStorage(STORAGE_KEY, gBooks);
}


function updateRating(id, rating) {
    const book = getBook(id);
    book.rating = rating;
    saveToStorage(STORAGE_KEY, gBooks);
}



function setBookSort(sortBy = {}) {
    if (sortBy.price !== undefined) {
        gBooks.sort((b1, b2) => (b1.price - b2.price) * sortBy.price);
    }
    if (sortBy.title !== undefined) {
        gBooks.sort((b1, b2) => b1.title.localeCompare(b2.title) * sortBy.title);
    }
    console.log(gBooks);
}

function setNextPage() {
    gPageIdx++;

    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function setPrevPage() {
    gPageIdx--;

    if (gPageIdx * PAGE_SIZE < 0) {
        gPageIdx = Math.floor(gBooks.length / PAGE_SIZE);
    }
}