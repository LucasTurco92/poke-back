const express = require("express");
const axios = require('axios');
const formatPokemonList = require('./utils/pokemonListFormatter');
const getPokemonEntries = require('./utils/pokemonEntries');

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
        const [result1, result2] = await Promise.all([
            await axios.get(`http://pokeapi.co/api/v2/pokemon/${id}`),
            await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
          ]);

        const { data:pokeDetail }  = result1;
        const { data:pokeDescription }  = result2;
        const { flavor_text_entries } = pokeDescription;
        const { name,sprites } = pokeDetail;
        
        const pokemon = {
            name: name[0].toUpperCase() + name.slice(1),
            sprite:sprites.front_default,
            entries:getPokemonEntries(flavor_text_entries)
        };

        res.send(pokemon);
    } catch (error) {
        console.error(error);

        res.send({});
    }
});


module.exports = router;