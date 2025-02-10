const myLibrary = [];

const library = document.querySelector("#library-container");
const message =  document.querySelector(".message-container");
message.setAttribute("style","font-size: 30px;")

function Book(title, author, pages, have_read = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.have_read = have_read;
}


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

