/*********Dom Elements*********/
const bookDisplayHome = document.querySelector("#container")
const userDisplayHome = document.querySelector(".user-home")
const userBookshelf = document.querySelector("#bookshelf-children")
const userBorrowings = document.querySelector("#borrowings-children")
const bookShowContainer = document.querySelector("#book-show")
const bookShowCopies = document.querySelector(".copies")
let currentUser = 'bert.hilll'
let currentUserId = '2'

/*********Render Functions*********/
function renderBook(bookObj){
    bookDisplayHome.innerHTML += `
    <div class="book-card"> 
     <h2>${bookObj.title}</h2>
     <h3> ${bookObj.author}</h3>
     <p> ${bookObj.year} </p>
    </div>
    `
}

function renderUser(userObj){
    userDisplayHome.innerHTML += `
    <div class="user">
        <img class="user-img" src="${userObj.img}>
        <div class="user-name> ${userObj.username} </div>
    </div>
    `
    
}

function renderBookshelfBook(book, copy) {
    userBookshelf.innerHTML += `
    <div class="myLibraryBook">
        <h3 class="title"> ${book.title} </h3>
        <h4 class="author"> ${book.author} </h4>
        <h5 class="status"> ${copy.active} </h5>
    </div>
    `
}

function renderBorrowedBook(book, copy) {
    userBorrowings.innerHTML += `
    <div class="myLibraryBook">
        <h3 class="title"> ${book.title} </h3>
        <h4 class="author"> ${book.author} </h4>
    </div>
    `
}

function renderBookShow(bookObj) {
    bookShowContainer.innerHTML += `
    <div class="book-info">
        <h2> ${bookObj.title} </h2>
        <h3> ${bookObj.author} </h3>
        <h4> ${bookObj.genre} </h4>
        <h4> ${bookObj.year} </h4>
        <h4> ${bookObj.rating} </h4>
    </div>
    `
    bookObj.book_copies.forEach(copy => {
        console.log(copy)
        bookShowCopies.innerHTML += `
            <li> ${copy.condition} </li>
            <li> ${copy.user} </li>
            
        `
    })

}

/*********Fetch Requests*********/
function getBooks() {
    fetch('http://localhost:3000/api/v1/books')
    .then(res => res.json())
    .then(bookArray => {
        bookArray.forEach((book) => {
            renderBook(book)
        })
    })
}

function getUsers() {
    fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
    .then(UsersArray => {
        UsersArray.forEach((User) => {
            renderUser(User)
        })
    })
}

function getBookShelf() {
    client.get(`/users/${currentUserId}`)
        .then(userObj => {
            let i = 0
            userObj.books.forEach((book) => {
                renderBookshelfBook(book, userObj.book_copies[i])
                i++
            })
        })
}

function getBorrowedBooks() {
    client.get(`/users/${currentUserId}`)
        .then(userObj => {
            if (userObj.book_copies.length === 0) {
                
            }
            let i = 0
            userObj.book_copies.forEach((copy) => {
                renderBorrowedBook(userObj.books[i], copy)
                i++
            })
        })
}

function getBookInfo(id){
    fetch(`http://localhost:3000/api/v1/books/${id}`)
    .then(rsp => rsp.json())
    .then(bookObj => {
        
            renderBookShow(book)
        }
        
    )
}

/*********Event Listeners*********/


/*********Initialize*********/
getBooks()
getUsers()
getBookShelf()

getBookInfo(1)