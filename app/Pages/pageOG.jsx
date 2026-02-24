"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PokePage() {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonFullData, setPokemonFullData] = useState([]);
  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

  const fetchPokemons = async (limit = 20, offset = 0) => {
    try {
      const listResponse = await fetch(
        `${BASE_URL}?offset=${offset}&limit=${limit}`,
      );
      const listData = await listResponse.json();
      setPokemonData(listData);

      // Fetch full objects in parallel using each summary.url
      const detailPromises = (listData.results || []).map((summary) =>
        fetch(summary.url).then((response) => response.json()),
      );
      const fullObjects = await Promise.all(detailPromises);
      setPokemonFullData(fullObjects);
      console.log("Full Pokemon objects:", fullObjects);
    } catch (error) {
      console.error("Error fetching pokemons in PokePage", error);
    }
  };

  const pokeIds = pokemonData.results?.map((pokemon) => {
    const urlParts = pokemon.url.split("/").filter(Boolean);
    return urlParts[urlParts.length - 1];
  });

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-5xl mx-auto bg-blue-800 text-white rounded-lg px-10 py-4 shadow-sm text-center mb-8">
        <h1 className="text-4xl font-bold">Pokemons</h1>
      </div>
      <h1 className="text-2xl font-semibold text-center text-black mb-8">
        List of Pokemons
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonFullData.length > 0 ? (
          pokemonFullData.map((pokemon) => (
            <li key={pokemon.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto mt-2 w-50 h-50 pixelated"
              />
              <h2 className="text-lg text-center font-bold text-black">
                {pokemon.name}
              </h2>
              <div className="text-center text-black">Id: {pokemon.id}</div>
            </li>
          ))
        ) : (
          <li className="col-span-full text-center">Cargando pokemons...</li>
        )}
      </ul>
    </div>
  );
}
