export const PokemonCard = ({pokemonData}) => {
  return (
    <li>
      <figure>
        <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name}/>
      </figure>
      <br />
      <h2>{pokemonData.name}</h2>
      <div className="type">
        <p>
          {
            pokemonData.types.map((currentType)=> currentType.type.name).join(" - ")
          }
        </p>
      </div>
    </li>
  )
}
