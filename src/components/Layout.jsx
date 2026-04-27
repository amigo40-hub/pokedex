import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Pokédex</Link>
        <Link to="/about">About</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
