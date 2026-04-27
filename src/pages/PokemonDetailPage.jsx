import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PokemonDetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setPokemon(res.data);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (!pokemon) return <p>Pokémon not found.</p>;

  return (
    <div>
      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><b>Types:</b> {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><b>Height:</b> {pokemon.height / 10} m</p>
      <p><b>Weight:</b> {pokemon.weight / 10} kg</p>
      <p><b>Abilities:</b> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map(s => (
          <li key={s.stat.name}><b>{s.stat.name}:</b> {s.base_stat}</li>
        ))}
      </ul>
      <Link to="/">Back to Pokédex</Link>
    </div>
  );
}
