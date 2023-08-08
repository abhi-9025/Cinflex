const { addToLikedMovies, getLikedMovies } = require("../controllers/useController");

const router=require("express").Router();
router.post("/add",addToLikedMovies);
router.get("/liked/:email",getLikedMovies)

module.exports=router