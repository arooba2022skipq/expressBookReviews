const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];



const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  return (validusers.length)? true: false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
  
    if (authenticatedUser(username,password)){
      if (!username && !password)
          return res.status(404).json({message: "Error Not found"});
      let accessToken = jwt.sign({
          data:password}, 'access',{expiresIn:60*60}
      );
      req.session.authorization = {
          accessToken, username
      };
      return res.status(200).json({message: "Successful"});
    } else 
        return res.status(403).json({message: "Invalid username and password"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
