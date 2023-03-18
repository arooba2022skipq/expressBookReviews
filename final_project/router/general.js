const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username, password)=>{
    let validUser = users.find((user)=> {
        return (user.username === username && user.password === password);
    })
    return (validUser) ? true : false; 
}

public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password){
    if (!doesExist(username, password)){
        users.push({"username":username, "password":password});
        return res.status(200).json({message: "Successfully Registered"});
    } else{
        return res.status(404).json({message: "Already Registered"});  
    }
} else{
    return res.status(404).json({message: "Can't register"});
}
});

// Get the book list available in the shop // task1
// public_users.get('/',function (req, res) {
//     //Write your code here
//     res.send(JSON.stringify(books));
//     return res.status(300).json({message: "Display of the list of books succeeded"});
// });

//task10
const bookList= new Promise((resolve, reject)=>{
    resolve(books);
})

public_users.get('/', async function (req, res) {
    bookList.then((x) =>{res.send(x)});
  });


// // Get book details based on ISBN // task 2
// public_users.get('/isbn/:isbn',function (req, res) {
//   let isbn = req.params.isbn;
//   res.send(JSON.stringify(books[isbn]));
//   return res.status(300).json({message: "Succeeded"});
//  });

//task11
const bookListUsingISBN = function(isbn){
    return new Promise((resolve, reject)=>{
        resolve(books[isbn]);
    })
};
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    bookListUsingISBN(isbn).then((book)=>{
      res.send(JSON.stringify(book));
    });
});
  
  
// // Get book details based on author // task3
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   let author = req.params.author;
//   let bookDetails = [];
//   for (let isbn in books){
//       if (books[isbn].author === author){
//           bookDetails.push(books[isbn]);
//       }
//   }
//   res.send(JSON.stringify(bookDetails));
//   return res.status(300).json({message: "Succeeded"});
// });

//task12
const bookListUsingAuthor = function(author){
    return new Promise((resolve, reject)=>{
        let bookarr = []; 
        for (const isbn in books){
          if (books[isbn].author === author)
              bookarr.push(books[isbn]);
        }
        resolve(bookarr);
    })
};
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    bookListUsingAuthor(author).then((bookarr)=>{
        res.send(JSON.stringify(bookarr));
    });
});


// Get all books based on title//task4
// public_users.get('/title/:title',function (req, res) {
//     let title = req.params.title;
//         let bookDetails = [];
//         for (const isbn in books){
//             if (books[isbn].title === title)
//                 bookDetails.push(books[isbn]);
//         }
//         res.send(JSON.stringify(bookDetails));
//         return res.status(300).json({message: "Succeeded"});
// });

//task13
const bookListUsingTitle = function(title){
    return new Promise((resolve, reject)=>{
        let bookarr = []; 
        for (const isbn in books){
          if (books[isbn].title === title)
              bookarr.push(books[isbn]);
        }
        resolve(bookarr);
    })
};
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    bookListUsingTitle(title).then((bookarr)=>{
        res.send(JSON.stringify(bookarr));
    });
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn].reviews));
    return res.status(300).json({message: "Succeeded"});
});

module.exports.general = public_users;
