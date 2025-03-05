//DOM manipulation
const library = document.querySelector("#library-container");
const message =  document.querySelector(".message-container");
message.setAttribute("style","font-size: 30px;");
//to toggle form display
const form = document.querySelector(".forma");
const visBtn = document.querySelector("#newBookBtn");

const addBookBtn = document.querySelector("#addBook");
const emptyLibrary = document.querySelector("#emptyLibrary");

class Book {
    constructor(title, author, pages, have_read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.have_read = Boolean(have_read);
    }

    toggleReadStatus() {
        this.have_read = !this.have_read;
    }

    get readStatus() {
        return this.have_read ? "Yes" : "No";
    }
}


class Library {
    constructor() {
        this.books = [];
    }

    addBook(title,author,pages,have_read) {
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
        const book = new Book(title,author,pages,have_read);
        this.books.push(book);
        this.displayLibrary();
        //log
        displayMessage("Book was added to the Library!", "green");
        console.log(`Book added successfully: Title = ${title}, Author = ${author}, Pages = ${pages}, Read = ${have_read}`);
    }

    removeBook(index) {
        const removedBookTittle = this.books[index].title;
        this.books.splice(index, 1);
        this.displayLibrary();
        displayMessage(`Book "${removedBookTittle}" was successfully removed from the Library!`, "green");
    }

    toggleBookStatus(index) {
        this.books[index].toggleReadStatus();
        this.displayLibrary();
    }

    displayLibrary() {
        library.textContent = "";
        //empty library check
        if (this.books.length === 0){
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "No books in the library yet!";
            library.appendChild(emptyMessage);
            return;
        }

        this.books.forEach((book, index) => {
            const card = this.createBookCard(book, index);
            library.appendChild(card);
        })

    }

    createBookCard(book, index){
        //card div creation
        const card = document.createElement("div");

        //book details
        const bookCard = document.createElement("p");
        bookCard.textContent = `Title : ${book.title}
                                    Author : ${book.author}
                                    Pages : ${book.pages}
                                    Have I read it : ${book.readStatus}`;
        //buttons
        const dltBtn = document.createElement("button");
        dltBtn.textContent = "Delete";
        dltBtn.addEventListener("click", () => {
            this.removeBook(index);
        })

        const readBtn = document.createElement("button");
        readBtn.textContent = "Change Read Status";
        readBtn.addEventListener("click", () => {
            this.toggleBookStatus(index);
        })

        //append elements
        card.appendChild(bookCard);
        card.appendChild(dltBtn);
        card.appendChild(readBtn);

        return card;
    }

    handleBookSubmission(event){
        event.preventDefault()//stop submission
        //target form inputs
        const titleInput = document.querySelector("#title").value;
        const authorInput = document.querySelector("#author").value;
        const pageInput = parseInt(document.querySelector("#pages").value);
        const haveRead = document.querySelector("input[name='have_read']:checked")?.value === "Yes";

        this.addBook(titleInput,authorInput,pageInput,haveRead);
        
        //clear input values
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#pages").value = "";
        const checkedRadio = document.querySelector("input[name='have_read']:checked");
        if (checkedRadio){
            checkedRadio.checked = false;
        }
    }

    clearLibrary(){
        this.books = [];
        this.displayLibrary();
    }
}

//Message Log dispplay
function displayMessage(text,color){
    message.textContent = text;
    message.style.color = color;
    setTimeout(() => {
        message.textContent = "";
    }, 3000);
}


//form display
visBtn.addEventListener("click", () => {
    if (form.style.display === "none" || form.style.display === ""){
        form.style.display = "block";
        visBtn.textContent = "Close"
    }else {
        form.style.display = "none";
        visBtn.textContent = "New Book";
    }
});

//library initialization
const myLibrary = new Library();
myLibrary.displayLibrary();


//button listeners
addBookBtn.addEventListener("click", (event) => myLibrary.handleBookSubmission(event));
emptyLibrary.addEventListener("click", () => myLibrary.clearLibrary());
