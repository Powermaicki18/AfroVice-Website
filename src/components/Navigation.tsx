import { User } from 'lucide-react';
import logo from './logo.png';
import {NavLink} from "react-router-dom";

type NavigationProps = {
  currentPage: string;
};

export default function Navigation({ currentPage }: NavigationProps) {
  const navItems = [
    { id: '/', label: 'Inicio' },
    { id: '/eventos', label: 'Eventos' },
    { id: '/artistas', label: 'Artistas' },
    { id: '/comunidad', label: 'Comunidad' },
    { id: '/nosotros', label: 'Nosotros' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a0f2e]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <NavLink to='/'>
              <button
                className="flex items-center gap-2 text-white hover:text-violet-400 transition-colors"
              >
                <img className="w-16" src={logo} alt="logo"/>
              </button>
            </NavLink>

            <div className="hidden md:flex items-center gap-6">
              {navItems.slice(0, 4).map((item) => (
                <NavLink to={item.id} key={item.id}>
                  <button
                    className={`text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <User className="w-8 h-8 rounded-full bg-violet-600 p-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-white/10">
        <div className="flex overflow-x-auto px-4 py-2 gap-4">
          {navItems.map((item) => (
            <NavLink to={item.id} key={item.id}>
              <button
                className={`text-sm font-medium whitespace-nowrap transition-colors ${
                  currentPage === item.id
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
