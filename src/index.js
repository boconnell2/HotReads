/*********Dom Elements*********/
// Navigation Elements
const addBook = document.querySelector(".new-book")
const search = document.querySelector(".search-bar")

// Home Page Elements
const homePage = document.querySelector("#home-page")
const homePageHeaderButton = document.querySelector(".header-title")
const bookDisplayHome = document.querySelector("#container")
const userDisplayHome = document.querySelector(".user-home")
const homeHeader = homePage.querySelector('#home-header')
const userHeader = homePage.querySelector('#home-users-header')


// My Library Elements
const myLibraryButton = document.querySelector(".profile-menu")
const libraryPage = document.querySelector("#library-page")
const libraryHeading = libraryPage.querySelector("h2")
const bookShelfHeading = libraryPage.querySelector("#book-shelf-heading")
const userBookshelf = document.querySelector("#bookshelf-children")
const borrowedHeading = document.querySelector("#borrowings")
const userBorrowings = document.querySelector("#borrowings-children")

// Book Show Modal
const modal = document.querySelector(".book-show-modal")
const modalCloseButton = modal.querySelector(".close-button");
const bookInfoContainer = document.querySelector(".book-info")
const bookShowCopies = document.querySelector(".copies")

// Current User Hardcodes
let currentUser = 'eileen'
let currentUserId = '30'
let currentUserIdInt = 30


/************************ Clear Page Function ***********************/
function clearHomePage() {
    homeHeader.textContent = ''
    bookDisplayHome.innerHTML = ''
    userHeader.textContent = ''
    userDisplayHome.innerHTML = ''
}

function clearLibrary() {
    libraryHeading.textContent = " "
    bookShelfHeading.textContent = " "
    userBookshelf.innerHTML = " "
    borrowedHeading.textContent = " "
    userBorrowings.innerHTML = " "
}

/**********************Render Functions*****************************/

function renderHomePage() {
    homeHeader.textContent = "Hot reads in your neighborhood 🔥🔥 "
    userHeader.textContent = "Users Near You"
}

function renderLibrary() {
    libraryHeading.textContent = 'Library 📚'
    bookShelfHeading.textContent = 'Bookshelf 📕'
    borrowedHeading.textContent = "Books You've Borrowed 🤝"
}



function renderBook(bookObj){
    
    bookDisplayHome.innerHTML += `
    <div class="book-card" id=${bookObj.id}> 
     <div class="book-img">
        <img class="book-photo" src="${bookObj.img}">
     </div>
     <div class="book-content">
        <h4 class="book-title">${bookObj.title}</h4>
        <h6 class="book-author"> ${bookObj.author}</h6>
        <p class="book-year"> Rating: ${bookObj.rating}/5.0 </p>
         <div class="book-see book-pink">See The Book</div>

     </div>
    </div>
    `

}
function renderUser(userObj){
    userDisplayHome.innerHTML += `
    <div class="user" id="${userObj.id}">
        <img class="user-img" src="${userObj.img}">
        <h4 class="name"> ${userObj.name.split(" ")[0]} </h4>
    </div>
    `
}

function renderBookshelfBook(copyObj) {
    userBookshelf.innerHTML += `
    <div class="myLibraryBook" id="${copyObj.id}">
        <img class="book-image" src="${copyObj.book.img}">
        <div class="book-show-info">
        <h3 class="title"> ${copyObj.book.title} </h3>
        <h4 class="author">By: ${copyObj.book.author} </h4>
        </div>
        <button class="delete">Remove</button>
    </div>
    `
}

function renderNoBooks() {
    userBookshelf.innerHTML += `
        <h2> Visit the homepage to add your books to your bookshelf! </h2>
    `
}

function renderNoBorrowings() {
    userBorrowings.innerHTML += `
        <h2> Visit the homepage to borrow some books! </h2>
    `
}

function renderBorrowedBook(copyObj) {
    userBorrowings.innerHTML += `
    <div class="myLibraryBook" id="${copyObj.id}">
        <img class="book-image" src="${copyObj.book.img}">
        <div class="book-show-info"
            <h3 class="title"> ${copyObj.book.title} </h3>
            <h4 class="author"> By: ${copyObj.book.author} </h4>
            <h4 class="owner"> Owner: ${copyObj.user.name} </h4>
            <h4 class="due-date"> Due Date: ${copyObj.due_date} </h4>
        </div>
        <button class="return"> Return </button>
    </div>
    `
}

function renderBookShow(bookObj) {
    bookInfoContainer.id = bookObj.id
    bookInfoContainer.innerHTML = `
        <div class="show-img"> 
        <img class="show-pic" src="${bookObj.img}">
        </div>
        <div class="book-details"
            <h3> Title: ${bookObj.title} </h2>
            <h4> By: ${bookObj.author} </h3>
            <h5> Genre: ${bookObj.genre} </h4>
            <h5> Year: ${bookObj.year} </h4>
            <h5> Rating: ${bookObj.rating}/5.0 </h4>
        </div>
        `
    let myBook = bookObj.book_copies.find(copy => copy.user_id == currentUserIdInt)
    if (!myBook) {
        bookInfoContainer.innerHTML += `
            <button class="add">Add to Library</button>
        `
    }

    bookShowCopies.innerHTML = ''
    let myCopy = bookObj.book_copies.find(copy => copy.borrower_id == currentUserIdInt)
    if (myCopy) {
        bookShowCopies.innerHTML = `
            <p class="showCardCallout"> You are currently borrowing this book. 
            Btw it is due  ${myCopy.due_date} ⏲️</p>
        `
    } else if (myBook) {
        bookShowCopies.innerHTML = `
        <p class="showCardCallout"> You own a copy of this book already! 👍</p>
    ` 
    } else if (bookObj.book_copies.length === 0) {
        bookShowCopies.innerHTML = `
            <p class="showCardCallout"> There are no copies available in your neighborhood 😭 </p>
        `
    } else {
        bookShowCopies.innerHTML = ''
        bookObj.book_copies.forEach((copy) => {
            const copyLi = document.createElement("li")
            const owner = document.createElement("p")
            const rentButton = document.createElement("button")
            copyLi.textContent = copy.user.name
            copyLi.dataset.id = copy.id
            owner.textContent = copy.condition
            rentButton.textContent = "RENT"
            rentButton.classList.add('rent-btn')

            copyLi.append(owner, rentButton)
            bookShowCopies.append(copyLi)
        })
    }

}

function renderUserShow(userObj) {
    if (userObj.length === 0) {
        bookInfoContainer.innerHTML = ''
        bookShowCopies.innerHTML = `
            <p> ${userObj.name} doesn't have any books available to borrow at this time </p>
        `
    }
    else {
        bookInfoContainer.innerHTML = `
            <div class="show-img"> 
            <img class="show-pic" src="${userObj.img}">
            </div>
            <div class="book-details"
                <h3> Name: ${userObj.name} </h2>
                <h4> Bio: ${userObj.bio} </h3>
            </div>
        `
        bookShowCopies.innerHTML = ''
        userObj.book_copies.forEach((copy) => {
            const copyLi = document.createElement("li")
            const bookTitle = document.createElement("p")
            const rentButton = document.createElement("button")
            copyLi.textContent = copy.user.name
            copyLi.dataset.id = copy.id
            bookTitle.textContent = copy.book.title
            rentButton.textContent = "RENT"
            rentButton.classList.add('rent-btn')

            copyLi.append(bookTitle, rentButton)
            bookShowCopies.append(copyLi)
        })
    }
}

/*********Fetch Requests*********/
function getBooks() {
    fetch('http://localhost:3000/api/v1/books')
    .then(res => res.json())
    .then(bookArray => {
        let i = 0
        clearLibrary()
        renderHomePage()
        bookArray.forEach((book) => {
            if (i < 5) {
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

function getUser(id) {
    fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(res => res.json())
    .then(user => {
        renderUserShow(user)
    })
}

function getBookShelf() {
    client.get(`/users/${currentUserId}`)
        .then(userObj => {
            clearHomePage()
            renderLibrary()
            if (userObj.book_copies.length === 0) {
                renderNoBooks()
            } else {
                userObj.book_copies.forEach((copyObj) => {
                    renderBookshelfBook(copyObj)
                })
            }
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

function removeBookCopy(div) {
    console.log(div.id)
    fetch(`http://localhost:3000/api/v1/book_copies/${div.id}`, {
        method: 'DELETE',     
        headers: {
            "Content-Type": "application/json"
        } 
    })
    .then(console.log("deleted"))
}

function updateBookCopy(updatedCopy){
    console.log(updatedCopy)
    client.patch(`/book_copies/${updatedCopy.id}`, updatedCopy)

    .then(copyFromDb => {
       console.log(copyFromDb)
    })
}

function createNewCopy(copyObj) {
    console.log(copyObj)
    client.post('/book_copies', copyObj)
    .then(newCopy => {
        console.log(newCopy)
    })
}

function getAllBooks(search){
    fetch('http://localhost:3000/api/v1/books')
    .then(res => res.json())
    .then(bookArray => {
       let foundBook =  bookArray.find(book => book.title == search)
       if (foundBook){
       renderBookShow(foundBook)
       }
       else{
        bookInfoContainer.innerHTML = `
        <p class="showCardCallout">Sorry No Copies Available for "${search}</p>`
        bookShowCopies.innerHTML = ''
       }
    })
}
/********************Event Listeners*********************/

myLibraryButton.addEventListener("click", event => {
    homePage.id = "home"
    clearLibrary()
    launchMyLibrary()
})

homePageHeaderButton.addEventListener("click", event => {
    homePage.id = "home-page"
    clearHomePage()
    launchHomepage()
})

bookDisplayHome.addEventListener('click', event => {
    event.preventDefault()
    if (event.target.matches('div.book-card')) {
        let id = parseInt(event.target.id)
        onModal()
        getBookInfo(id)
    } else if (event.target.closest('div.book-card')) {
        let id = parseInt(event.target.closest('div.book-card').id)
        onModal()
        getBookInfo(id)
    }
})

userBookshelf.addEventListener("click", event => {
    event.preventDefault()
    if (event.target.matches(".delete")){
        const bookDiv = event.target.closest(".myLibraryBook")
        console.log("Book Deleted")
        bookDiv.remove()
        removeBookCopy(bookDiv)
    }
})

userBorrowings.addEventListener("click", event => {
    event.preventDefault()
    if (event.target.matches(".return")){
        const bookDiv = event.target.closest(".myLibraryBook")
        console.log("returned")
        let returnedBook = {
            id: bookDiv.id,
            borrower_id: null, 
            active: false
        }
        
       updateBookCopy(returnedBook)
        bookDiv.remove()
    }
})

bookInfoContainer.addEventListener("click", event => {
    event.preventDefault()
    if (event.target.matches(".add")){
        let newBookCopy = {
            user_id: currentUserId,
            book_id: bookInfoContainer.id,
            condition: "okay...",
            active: false,
            borrower_id: null,
            start_date: null,
            due_date: null
        }
        console.log(newBookCopy)
        event.target.remove()
        createNewCopy(newBookCopy)
    }
})

bookShowCopies.addEventListener("click", event => {
    event.preventDefault()
    if(event.target.matches(".rent-btn")){
        console.log('we in here')
       let rentCopy = {
        id: event.target.closest("li").dataset.id,
        borrower_id: currentUserId,
        active: true,
        start_date: "2021-01-08",
        due_date: "2021-01-22"
       } 
       updateBookCopy(rentCopy)
       bookShowCopies.innerHTML = `
            <p class="showCardCallout"> Nice choice! 💯💯</p>
       `
    }

})

modalCloseButton.addEventListener("click", offModal);
window.addEventListener("click", windowOnClick)

search.addEventListener("keyup", event => {
    if (event.keyCode === 13){
        console.log(event.target.value)
        let searchTitle = event.target.value
        getAllBooks(searchTitle)
        onModal()
    }
})

userDisplayHome.addEventListener('click', event => {
    console.log(event.target)
    if (event.target.matches('.user-img')) {
        event.preventDefault()
        let parent = event.target.closest('div')
        let id = parseInt(parent.id)
        onModal()
        getUser(id)
    }
})

/*********Other Functions*********/
function launchHomepage() {
    getBooks()
    getUsers()
    modal.style.display = 'none'
}

function launchMyLibrary() {
    getBookShelf()
    getBorrowedBooks()
}

function onModal() {
    modal.style.display = 'block'
}

function offModal() {
    modal.style.display = 'none'
}

function windowOnClick(event) {
    if (event.target === modal) {
        offModal()
    }
}

/*********Initialize*********/
launchHomepage()