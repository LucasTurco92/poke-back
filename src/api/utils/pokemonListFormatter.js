const regex = /\/(\d+)\/$/;

const formatPokemonList = (raw) =>{
    const { results } = raw;

    const a = results.map(pokemon=>{
        return{
            name: pokemon?.name,
            number: getNumber(regex,pokemon?.url)
        }
            
    });
    
    return a;
};

const getNumber = (regex, url)=>{ return url.match(regex)[1]}


module.exports = formatPokemonList;