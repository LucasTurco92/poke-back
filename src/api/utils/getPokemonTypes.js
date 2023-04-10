export const getPokemonTypes = (types) => {
  return types.map(data => {
    const { type } = data
    return type?.name
  })
}
