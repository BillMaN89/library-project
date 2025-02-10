function Book(title, author, pages, have_read = false){
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.have_read = have_read;
            this.info = function() {
                return `Title : ${title} , by : ${author}, ${pages} pages long,
                 Have I read it : ${have_read} `
            }
        }
