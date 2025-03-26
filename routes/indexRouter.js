const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const indexRouter = Router();

// indexRouter.get("/", newUserController.getUsernames);

indexRouter.get("/", (req, res) =>{
    res.render('index', {})
});

module.exports = indexRouter;