import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");

  const pokeAPI = "https://pokeapi.co/api/v2/pokemon/?limit=500";

  const fetchAPI = async () => {
    try {
      const response = await fetch(pokeAPI);
      const data = await response.json();
      // detailedPokemonData contains Promises:-
      const detailedPokemonData = data.results.map(async (currentIndex) => {
        const response = await fetch(currentIndex.url);
        const data = await response.json();
        return data;
      });
      //Now Getting Data from Promises in detailedPokemonData
      const promisesData = await Promise.all(detailedPokemonData);
      console.log(promisesData);
      setPokemon(promisesData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  //Search Functionalioty

  const searchData = pokemon.filter((currentPokemon) =>
    currentPokemon.name.toLowerCase().includes(input.toLowerCase())
  );

  if (loading)
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  if (error)
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );

  return (
    <div className="container">
      <section>
        <div className="head">
          <h1>Lets Catch Pokemon</h1>
          <input
            type="text"
            placeholder="Search Pokemon"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </div>
      </section>

      <div className="content-area">
        <ul className="cards">
          {searchData.map((currentPokemon) => {
            return (
              <PokemonCard
                key={currentPokemon.id}
                pokemonData={currentPokemon}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
