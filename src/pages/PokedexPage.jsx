import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PAGE_SIZE = 20;

export default function PokedexPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`)
      .then((res) => {
        setPokemonList(res.data.results);
        setCount(res.data.count);
        setLoading(false);
      });
  }, [page]);

  return (
    <div>
      <h1>Pokédex</h1>
      {loading ? <p>Loading...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pokemonList.map((p) => (
            <li key={p.name}>
              <Link to={`/pokemon/${p.name}`}>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</Link>
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Previous</button>
        <span style={{ margin: '0 1rem' }}>Page {page + 1} / {Math.ceil(count / PAGE_SIZE)}</span>
        <button onClick={() => setPage((p) => (p + 1 < Math.ceil(count / PAGE_SIZE) ? p + 1 : p))} disabled={page + 1 >= Math.ceil(count / PAGE_SIZE)}>Next</button>
      </div>
    </div>
  );
}
