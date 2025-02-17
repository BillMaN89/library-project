//library initialization
const myLibrary = [];

//DOM manipulation
const library = document.querySelector("#library-container");
const message =  document.querySelector(".message-container");
message.setAttribute("style","font-size: 30px;");
//to toggle form display
const form = document.querySelector(".forma");
const visBtn = document.querySelector("#newBookBtn");

const addBookBtn = document.querySelector("#addBook");
const emptyLibrary = document.querySelector("#emptyLibrary");

displayLibrary();


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


function addBookToLibrary(title,author,pages,have_read) {
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
    //duplicate avoidance
    library.textContent = "";
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
        //read status
        const changeStatus = document.createElement("button");
        changeStatus.textContent = "Change Read Status";
        card.appendChild(bookItem);
        card.appendChild(bton);
        card.appendChild(changeStatus);
        library.appendChild(card);

        bton.addEventListener("click", () =>{
            library.removeChild(card);
            myLibrary.splice(index, 1); // Remove book from array
            displayLibrary(); // Refresh the display
        })

        //change Read Status
        changeStatus.addEventListener("click", () =>{
            if (myLibrary[index].have_read === "Yes"){
                myLibrary[index].have_read = "No";
            } else {
                myLibrary[index].have_read = "Yes";
            }
            displayLibrary();
        })
    })
}

//form display
visBtn.addEventListener("click", () => {
    if (form.style.display === "none"){
        form.style.display = "block";
        visBtn.textContent = "Close"
    }else {
        form.style.display = "none";
        visBtn.textContent = "New Book";
    }
});


function handleBookSubmission(event){
    event.preventDefault();//stop the form from submitting
    //target form inputs
    const titleInput = document.querySelector("#title").value;
    const authorInput = document.querySelector("#author").value;
    const pageInput = parseInt(document.querySelector("#pages").value);
    const haveRead = document.querySelector("input[name='have_read']:checked")?.value || "No";

    addBookToLibrary(titleInput, authorInput, pageInput, haveRead);

    //clear input values
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    const checkedRadio = document.querySelector("input[name='have_read']:checked");
    if (checkedRadio){
        checkedRadio.checked = false;
    }

    displayLibrary();
}

//button listeners
addBookBtn.addEventListener("click", handleBookSubmission);
emptyLibrary.addEventListener("click",() =>{
    myLibrary.splice(0,myLibrary.length);
    displayLibrary();
})


//example book entry
//addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 250, "Yes");
//displayLibrary();