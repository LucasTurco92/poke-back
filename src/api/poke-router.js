const express = require("express");
const requestHandler = require('./utils/requestBuilder');
const formatPokemonList = require('./utils/pokemonListFormatter');
const getPokemonEntries = require('./utils/pokemonEntries');
const getPokemonTypes = require('./utils/getPokemonTypes');
const cacheHandler = require('./utils/cache-handler');
const { setValue,getValue } = cacheHandler();
const router = express.Router();

router.get("/", (req, res, next) => {

    const getAllPokemons= async() =>{
        try {
            const cached = getValue('allPokemons');
    
            if(cached){
                res.send(cached);
    
            }else{
                const data = await requestHandler('get',`https://pokeapi.co/api/v2/pokemon/?limit=251`);
                const pokemons = formatPokemonList(data);
               
                setValue('allPokemons',pokemons);
                
                res.send(pokemons);
            }
           
        } catch (error) {
            console.error(error);
    
            res.send([]);
        }
    }

    getAllPokemons();
});


router.get("/:id", (req, res, next) => {
    const  { id }  = req.params || 1;

    const getOnePokemonById= async()=> {
        try {
            const cached = getValue(id);
    
            if(cached){
                res.send(cached);
                
            }else{
                const [pokeDetail, pokeDescription] = await Promise.all([
                    await requestHandler('get',`http://pokeapi.co/api/v2/pokemon/${id}`),
                    await requestHandler('get',`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                  ]);
        
                const { flavor_text_entries } = pokeDescription;
                const { name,sprites,types } = pokeDetail;
                
                const pokemon = {
                    name: name[0].toUpperCase() + name.slice(1),
                    sprite:sprites['versions']['generation-v']['black-white']['animated']['front_default'],
                    spriteError:sprites['front_default'],
                    entries:getPokemonEntries(flavor_text_entries),
                    types:getPokemonTypes(types)
                };
                setValue(id,pokemon);
    
                res.send(pokemon);
            }     
        } catch (error) {
            console.error(error);
    
            res.send({});
        }
    }

    getOnePokemonById();
});

module.exports = router;