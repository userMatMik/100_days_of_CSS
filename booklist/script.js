//1. Book class: represent book - create object book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//Store Class: handles local storade
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//2. UI class: display/remove book on/from  list, display notification/

class UI {
    static displayBooks() {
        const storedBooks = Store.getBooks();
        //test data
        // [
        //     {
        //         title: 'Eloquent JavaScript',
        //         author: 'Marijn Haverbeke',
        //         isbn: '123456'
        //     },
        //     {
        //         title: 'Gomorra',
        //         author: 'Roberto Saviano',
        //         isbn: '987654'
        //     },
        // ];
        const books = storedBooks;

        books.forEach(book => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const bookList = document.querySelector('#book-list');

        const str = `<li>
                        <div>
                            <p class="book__title">${book.title}</p>
                            <p class="book__author">${book.author}</p>
                            <p class="book__isbn">${book.isbn}</p>
                            <div class="book__btn-container">
                                <button class="btn-delete">&#x2715</button>
                            </div>
                        </div>
                    </li>`
        bookList.innerHTML += str;
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static removeBook(target) {
        if (target.classList.contains('btn-delete')) {
            target.parentElement.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, alertClass) {
        // const div = document.createElement('div');
        // div.className = `alert alert__${alertClass}`;
        // div.appendChild(document.createTextNode(message));
        const bookFormEl = document.querySelector('#book-form');
        const str = `<div class="alert alert--${alertClass}">${message}
                        <button id="close-alert" class="btn__close-alert">&#x2715</button>
                    </div>`
        bookFormEl.insertAdjacentHTML('afterend', str);
        
        //close alert after X time;
        //! If I close alert by click, it shows error in console because element is alredy removed

        setTimeout(() => document.querySelector('.alert').remove(), 3000);

        //remove alert - after message is added to DOM i can catch alert close btn and add event listener to it
        const closeAlertBtn = document.querySelector('#close-alert');
        
        closeAlertBtn.addEventListener('click', (event) => {
            this.removeAlert(event.target);
        })
    }
    
    static removeAlert(target) {
        target.parentElement.remove();
    }
}



//3. Events: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//4. Events: Add Book
document.querySelector('#book-form').addEventListener('submit', (event) => {

    //preven default action of submit
    event.preventDefault();
    //Get values from inputs
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //8. add validation to inputs
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill all required fields', 'red');
    } else {
         //new instance of book
    const book = new Book(title, author, isbn);
    console.log(book);

    //5. Add created book to list
        //Add Book to Storage
    UI.addBookToList(book);
    
    Store.addBook(book);

    //show message on success

    UI.showAlert('Book succesfully added to list', 'success')

    }

    //6. Clear fields(inputs)
    UI.clearFields()

})

//7. Events: Remove 
document.querySelector('#book-list').addEventListener('click', (event) => {
    //Remove from UI
    UI.removeBook(event.target);
    //remove book from storage
    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);
    // console.log(event.target.parentElement.previousElementSibling.textContent);
    //Show message
    UI.showAlert('Book was removed from list', 'success')
})


