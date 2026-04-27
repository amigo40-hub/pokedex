
import { createHashRouter, RouterProvider } from 'react-router-dom';
import PokedexPage from './pages/PokedexPage';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout';
import PokemonDetailPage from './pages/PokemonDetailPage';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <PokedexPage /> },
      { path: '/pokemon/:name', element: <PokemonDetailPage /> },
      { path: '/about', element: <AboutPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
