const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    const message = "<h1>Pokedex<h1/>";
    res.writeHeader(200, {"Content-Type": "text/html"});  
    res.write(message);  
    res.end(); 
});


module.exports = router;