import express  from "express";
import {requestBuilder} from './utils/requestBuilder.js';
import {formatPokemonList}  from './utils/pokemonListFormatter.js';
import {getPokemonEntries}  from './utils/pokemonEntries.js';
import {getPokemonTypes}  from './utils/getPokemonTypes.js';
import {cacheHandler}  from './utils/cache-handler.js';
const { setValue,getValue } = cacheHandler();
const router = express.Router();


router.get("/", (req, res, next) => {

    const getAllPokemons= async() =>{
        try {
            const cached = getValue('allPokemons');
    
            if(cached){
                res.send(cached);
    
            }else{
                const data = await requestBuilder('get',`https://pokeapi.co/api/v2/pokemon/?limit=251`);
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
                    await requestBuilder('get',`http://pokeapi.co/api/v2/pokemon/${id}`),
                    await requestBuilder('get',`https://pokeapi.co/api/v2/pokemon-species/${id}`)
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
    
                return(pokemon);
            }     
        } catch (error) {
            console.log(error)
        }
    }

   getOnePokemonById()
    .then( pokemon => res.send(pokemon))
    .catch(error=>{
        
        res.send({})
    })
});

export  {router};