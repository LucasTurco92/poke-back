const getPokemontypes = (types) => {

    return types.map(data =>{
        const { type } = data;
        return type.name;
    });
};

module.exports = getPokemontypes;