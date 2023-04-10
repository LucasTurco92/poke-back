const regex = /\/(\d+)\/$/;

export const formatPokemonList = (raw) =>{
    const { results } = raw;

    const a = results.map(pokemon=>{
        return{
            name: pokemon?.name,
            number: getNumber(regex,pokemon?.url)
        }
            
    });
    
    return a;
};

const getNumber = (regex, url)=> url.match(regex)[1]
