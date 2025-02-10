const myLibrary = [];

function Book(title, author, pages, have_read = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.have_read = have_read;
}

const message =  document.querySelector(".message-container");
message.setAttribute("style","color: red; font-size: 30px;")



function addBookToLibrary(title,author,pages,have_read = false) {
    //validate inputs
    if (!title || typeof title !== 'string'){
        message.textContent = "Please enter a valid book title!"
        console.log("Invalid title");
        return;
    }
    if (!author || typeof author !== 'string'){
        message.textContent = "Please enter a valid author name!"
        console.log("Invalid author");
        return;
    }
    if (!pages || typeof pages !=='number' || pages <= 0){
        message.textContent = "Please enter a valid number of pages!"
        console.log("Invalid pages");
        return;
    }
    //book creation
    const book = new Book(title,author,pages,have_read);
    myLibrary.push(book);
    //log
    console.log(`Book added successfully: Title = ${title}, Author = ${author}, Pages = ${pages}, Read = ${have_read}`);
}