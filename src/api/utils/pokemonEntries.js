const getPokemonEntries = (raw) => {
    let uniqueEntries = {};
    const Entries = raw
    .filter(entry => entry.language.name === 'en')
    .reduce((acc, cur) => {
        if (!uniqueEntries[cur.flavor_text]) {
            uniqueEntries[cur.flavor_text] = true;
            acc.push(cur.flavor_text );
        }
        return acc;
    }, []);
    return Entries;
};

module.exports = getPokemonEntries;