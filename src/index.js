/*********Dom Elements*********/
const bookDisplayHome = document.querySelector("#container")
const userDisplayHome = document.querySelector(".user-home")
const userBookshelf = document.querySelector("#bookshelf-children")
const userBorrowings = document.querySelector("#borrowings-children")
const bookShowContainer = document.querySelector("#book-show")
const bookShowCopies = document.querySelector(".copies")
let currentUser = 'bert.hilll'
let currentUserId = '2'
let currentUserIdInt = 2

/*********Render Functions*********/
function renderBook(bookObj){
    bookDisplayHome.innerHTML += `
    <div class="book-card"> 
     <h4>${bookObj.title}</h4>
    
     <h6> ${bookObj.author}</h6>
     
     <p> ${bookObj.year} </p>
    </div>
    `
}

function renderUser(userObj){
    userDisplayHome.innerHTML += `
    <div class="user">
        <img class="user-img" src="${userObj.img}">
        <h4 class="name"> ${userObj.name.split(" ")[0]} </h4>
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

function renderNoBorrowings() {
    userBorrowings.innerHTML += `
        <h2> Visit the homepage to borrow some books! </h2>
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
    console.log('wass')
    bookObj.book_copies.forEach((copy) => {
        const copyLi = document.createElement("li")
        li.textContent = copy.condition
        bookShowCopies.append(copyLi)
    })

}

/*********Fetch Requests*********/
function getBooks() {
    fetch('http://localhost:3000/api/v1/books')
    .then(res => res.json())
    .then(bookArray => {
        let i = 0
        bookArray.forEach((book) => {
            if (i < 8) {
                renderBook(book)
            }
            i++
        })
    })
}

function getUsers() {
    fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
    .then(UsersArray => {
        let i = 0
        UsersArray.forEach((User) => {
            if (i < 5) {
                renderUser(User)
            }
            i++
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
    client.get(`/book_copies/`)
        .then(copyArray => {
            let myBorrowedBooks = copyArray.filter(obj => {
                return obj.renter_id === currentUserIdInt
            })
            if (myBorrowedBooks.length === 0) {
                renderNoBorrowings()
            } else {
                console.log('gotta fix this')
                // client.get(``)
                // userObj.book_copies.forEach((copy) => {
                //     renderBorrowedBook(userObj.books[i], copy)
                //     i++
                // })
            }
        })
}

function getBookInfo(id){
    fetch(`http://localhost:3000/api/v1/books/${id}`)
    .then(rsp => rsp.json())
    .then(bookObj => {
        
            renderBookShow(bookObj)
        }
        
    )
}

/*********Event Listeners*********/


/*********Initialize*********/
// getBooks()
// getUsers()
getBookShelf()
getBorrowedBooks()
// getBookInfo(3)