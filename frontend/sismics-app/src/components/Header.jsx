import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.jpeg';   // AJUSTE A EXTENSÃO SE FOR .png

// gera a classe "link" ou "link active"
const linkClass = ({ isActive }) => `link${isActive ? ' active' : ''}`;

export default function Header() {
  return (
    <header>
      {/* LOGO FIXA NA ESQUERDA */}
      <img src={logo} alt="SismoTrack logo" className="logo" />

      {/* NAVEGAÇÃO CENTRALIZADA */}
      <nav>
        <NavLink to="/"           className={linkClass}>PAÍSES</NavLink>
        <NavLink to="/placas"     className={linkClass}>PLACAS</NavLink>
        <NavLink to="/terremotos" className={linkClass}>TERREMOTOS</NavLink>
      </nav>
    </header>
  );
}
