/*********Dom Elements*********/

// Home Page Elements
const homePage = document.querySelector("#home-page")
const homePageHeaderButton = document.querySelector(".header-title")
const bookDisplayHome = document.querySelector("#container")
const userDisplayHome = document.querySelector(".user-home")
const 

const userBookshelf = document.querySelector("#bookshelf-children")
const userBorrowings = document.querySelector("#borrowings-children")
const bookInfoContainer = document.querySelector(".book-info")
const bookShowCopies = document.querySelector(".copies")
const myLibraryButton = document.querySelector(".profile-menu")
const libraryPage = document.querySelector("#library-page")
let currentUser = 'bert.hilll'
let currentUserId = '2'
let currentUserIdInt = 2

/*********Render Functions*********/
function renderBook(bookObj){
    
    bookDisplayHome.innerHTML += `
    <div class="book-card" id=${bookObj.id}> 
     <h4>${bookObj.title}</h4>
     <h6> ${bookObj.author}</h6>
     <p> ${bookObj.year} </p>
    </div>
    `

}
/********** Clear Page Function ***********/
function clearHomePage() {
    h3.textContent = ''
    bookDisplayHome.innerHTML = ''
    ...
}

function renderHomePage() {
    

    libraryPage.innerHTML = ""
    homePage.innerHTML += `
    <h3 id="home-header"> Hot reads in your neighborhood 🔥🔥</h2>
        <div id="container"> </div>
    <h3>Users Near You</h3>
        <div class="user-home"> </div>
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

function renderBookshelfBook(copyObj) {
    userBookshelf.innerHTML += `
    <div class="myLibraryBook">
        <h3 class="title"> ${copyObj.book.title} </h3>
        <h4 class="author"> ${copyObj.book.author} </h4>
        <h5 class="status"> ${copyObj.active} </h5>
    </div>
    `
}

function renderNoBorrowings() {
    userBorrowings.innerHTML += `
        <h2> Visit the homepage to borrow some books! </h2>
    `
}

function renderBorrowedBook(copyObj) {
    userBorrowings.innerHTML += `
    <div class="myLibraryBook">
        <h3 class="title"> ${copyObj.book.title} </h3>
        <h4 class="author"> ${copyObj.book.author} </h4>
    </div>
    `
}

function renderBookShow(bookObj) {
    console.log(bookInfoContainer)
    bookInfoContainer.innerHTML += `
    
        <h2> ${bookObj.title} </h2>
        <h3> ${bookObj.author} </h3>
        <h4> ${bookObj.genre} </h4>
        <h4> ${bookObj.year} </h4>
        <h4> ${bookObj.rating} </h4>
    
    `
    bookObj.book_copies.forEach((copy) => {
        const copyLi = document.createElement("li")
        const owner = document.createElement("p")
        const rentButton = document.createElement("button")
        copyLi.textContent = copy.user.name
        copyLi.dataset.id = copy.user_id
        owner.textContent = copy.condition
        rentButton.textContent = "RENT"

        copyLi.append(owner, rentButton)
        bookShowCopies.append(copyLi)
    })

}

/*********Fetch Requests*********/
function getBooks() {
    libraryPage.innerHTML = " "
    fetch('http://localhost:3000/api/v1/books')
    .then(res => res.json())
    .then(bookArray => {
        let i = 0
        renderHomePage()
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
            userObj.book_copies.forEach((copyObj) => {
                renderBookshelfBook(copyObj)
            })
        })
}

function getBorrowedBooks() {
    client.get(`/book_copies/`)
        .then(copyArray => {
            let myBorrowedBooks = copyArray.filter(obj => {
                return obj.borrower_id === currentUserIdInt
            })
            if (myBorrowedBooks.length === 0) {
                renderNoBorrowings()
            } else {
                myBorrowedBooks.forEach((book) => {
                    renderBorrowedBook(book)
                })
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

myLibraryButton.addEventListener("click", event => {
    homePage.innerHTML = " "
    libraryPage.innerHTML = " "
    getBookShelf()
    getBorrowedBooks()
})

homePageHeaderButton.addEventListener("click", event => {
    libraryPage.innerHTML = " "
    homePage.innerHTML = " "
    getBooks()
    getUsers()
})

bookDisplayHome.addEventListener('click', event => {
    event.preventDefault()
    if (event.target.matches('div.book-card')) {
        let id = parseInt(event.target.id)
        getBookInfo(id)
    } else if (event.target.closest('div.book-card')) {
        let id = parseInt(event.target.closest('div.book-card').id)
        getBookInfo(id)
    }
})

/*********Initialize*********/
getBooks()
getUsers()
// getBookInfo(3)