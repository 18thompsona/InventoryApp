const db = require("../db/queries");

async function GetAllItems(req, res){

}

async function GetItem(req, res){

}

async function GetItemsCategory(req, res){

}

async function CreateItemPost(req, res){

}

async function CreateCategoryPost(req, res){

}


// async function getItems(req, res) {

//   const searchQuery = req.query.search || '';
  

//   if(searchQuery){
//     const usernames = await db.getAllUsernamesLike(searchQuery);
//     res.send("Usernames: " + usernames.map(user => user.username).join(", "));
//     // res.send(`Search query: ${searchQuery}`);
//   }
//   else{
//     const usernames = await db.getAllUsernames();
//     console.log("Usernames: ", usernames);
//     res.send("Usernames: " + usernames.map(user => user.username).join(", "));
//   }
// }

// async function getDeleteUsernames(req, res) {
//   const usernames = await db.deleteAllUsernames();
//   console.log("Usernames Deleted");
//   res.redirect("/");
// }

// async function createUsernameGet(req, res) {
//   res.render("form", {});
// }

// async function createUsernamePost(req, res) {
//   const { username } = req.body;
//   await db.insertUsername(username);
//   res.redirect("/");
// }

module.exports = {
  GetAllItems,
  GetItem,
  GetItemsCategory,
  CreateItemPost,
  CreateCategoryPost,
};
