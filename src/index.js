/*********Dom Elements*********/
const display = document.querySelector("#container")
let currentUser = 

/*********Render Functions*********/
function renderBook(bookObj){
    display.innerHTML += `
     <h2>${bookObj.title}</h2>
     <h3> ${bookObj.author}</h3>
     <p> ${bookObj.year} </p>

    `
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

/*********Event Listeners*********/


/*********Initialize*********/
getBooks()
