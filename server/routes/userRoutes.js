const { addToLikedMovies } = require("../controllers/useController");

const router=require("express").Router();
router.post("/add",addToLikedMovies);

module.exports=router