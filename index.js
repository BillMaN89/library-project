//library initialization
const myLibrary = [];

//DOM manipulation
const library = document.querySelector("#library-container");
const message =  document.querySelector(".message-container");
message.setAttribute("style","font-size: 30px;")


//Book constructor
function Book(title, author, pages, have_read = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.have_read = have_read;
}

//Message Log dispplay
function displayMessage(text,color){
    message.textContent = text;
    message.style.color = color;
    setTimeout(() => {
        message.textContent = "";
    }, 3000);
}


function addBookToLibrary(title,author,pages,have_read = false) {
    //validate inputs
    if (!title || typeof title !== 'string'){
        displayMessage("Please enter a valid book title!", "red");
        console.log("Invalid title");
        return;
    }
    if (!author || typeof author !== 'string'){
        displayMessage("Please enter a valid author name!", "red");
        console.log("Invalid author");
        return;
    }
    if (!pages || typeof pages !=='number' || pages <= 0){
        displayMessage("Please enter a valid number of pages!", "red");

        console.log("Invalid pages");
        return;
    }

    //book creation
    const book = new Book(title,author,pages,have_read);
    myLibrary.push(book);

    //log
    displayMessage("Book was added to the Library", "green");
    console.log(`Book added successfully: Title = ${title}, Author = ${author}, Pages = ${pages}, Read = ${have_read}`);
}

//Book Display in Library Container
function displayLibrary(){
    //empty array check
    if (myLibrary.length === 0){
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No books in the library yet!";
        library.appendChild(emptyMessage);
        return;
    }
    myLibrary.forEach((Book, index) => {
        //book card creation
        const card = document.createElement("div");
        //filling in card details
        const bookItem = document.createElement("p");
        bookItem.textContent = `Title : ${Book.title} 
                                Author : ${Book.author}
                                Pages : ${Book.pages}
                                Read it? : ${Book.have_read}`;
        const bton = document.createElement("button");
        bton.textContent = "Delete";
        card.appendChild(bookItem);
        card.appendChild(bton);
        library.appendChild(card);

        bton.addEventListener("click", () =>{
            library.removeChild(card);
            myLibrary.splice(index, 1); // Remove book from array
            displayLibrary(); // Refresh the display
        })
    })
    

}


//example book entry
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 250, true);
displayLibrary();