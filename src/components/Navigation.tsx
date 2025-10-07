import { Search, Bell, User, Music } from 'lucide-react';

type NavigationProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'artistas', label: 'Artistas' },
    { id: 'comunidad', label: 'Comunidad' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'galeria', label: 'Galería' },
    { id: 'contacto', label: 'Contacto' },
    { id: 'compras', label: 'Compras' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a0f2e]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('inicio')}
              className="flex items-center gap-2 text-white hover:text-violet-400 transition-colors"
            >
              <Music className="w-6 h-6" />
              <span className="text-xl font-bold">Ritmo</span>
            </button>

            <div className="hidden md:flex items-center gap-6">
              {navItems.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                className="bg-transparent border-none outline-none text-white text-sm placeholder-gray-400 w-40"
              />
            </div>

            <button className="text-gray-300 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            <button className="text-gray-300 hover:text-white transition-colors">
              <User className="w-8 h-8 rounded-full bg-violet-600 p-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-white/10">
        <div className="flex overflow-x-auto px-4 py-2 gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-medium whitespace-nowrap transition-colors ${
                currentPage === item.id
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
