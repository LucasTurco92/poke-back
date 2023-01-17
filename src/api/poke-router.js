const express = require("express");
const axios = require('axios');
const formatPokemonList = require('./utils/pokemonListFormatter');

const router = express.Router();

router.get("/", async(req, res, next) => {
    try {
        const { data }  = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=251`);
        const pokemons = formatPokemonList(data);

        res.send(pokemons);
    } catch (error) {
        console.error(error);

        res.send([]);
    }
});


router.get("/:id", async(req, res, next) => {
    const  { id }  = req.params || 1;
    try {
        const { data }  = await axios.get(`http://pokeapi.co/api/v2/pokemon/${id}`);
        const { name,sprites } = data;
        
        const pokemon = {
            name,
            sprite:sprites.front_default
        };

        res.send(pokemon);
    } catch (error) {
        console.error(error);

        res.send({});
    }
});


module.exports = router;