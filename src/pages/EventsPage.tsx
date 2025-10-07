import { useEffect, useState } from 'react';
import { supabase, Event } from '../lib/supabase';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

type EventsPageProps = {
  onNavigate: (page: string, eventId?: string) => void;
};

export default function EventsPage({ onNavigate }: EventsPageProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedGenre, selectedCity]);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });

    if (data && !error) {
      setEvents(data);
    }
    setLoading(false);
  };

  const filterEvents = () => {
    let filtered = [...events];

    if (selectedGenre !== 'all') {
      filtered = filtered.filter((event) => event.genre === selectedGenre);
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter((event) => event.city === selectedCity);
    }

    setFilteredEvents(filtered);
  };

  const genres = [
    { id: 'all', label: 'Todos' },
    { id: 'afro', label: 'Afro' },
    { id: 'dancehall', label: 'Dancehall' },
    { id: 'reggaeton', label: 'Reggaetón' },
  ];

  const cities = [
    { id: 'all', label: 'Todas las ciudades' },
    { id: 'Bogotá', label: 'Bogotá' },
    { id: 'Medellín', label: 'Medellín' },
    { id: 'Cali', label: 'Cali' },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Todos los Eventos
          </h1>
          <p className="text-xl text-gray-300">
            Encuentra el evento perfecto para ti
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Género Musical
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => setSelectedGenre(genre.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedGenre === genre.id
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {genre.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ciudad
              </label>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCity === city.id
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {city.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-white text-center py-12">Cargando eventos...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">
              No hay eventos disponibles con los filtros seleccionados
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20"
                onClick={() => onNavigate('compras', event.id)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-violet-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {event.genre}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${event.price.toLocaleString()}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      {new Date(event.event_date).toLocaleDateString('es-CO', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Clock className="w-4 h-4 text-violet-400" />
                      {new Date(event.event_date).toLocaleTimeString('es-CO', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <MapPin className="w-4 h-4 text-violet-400" />
                      {event.venue}, {event.city}
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Users className="w-4 h-4 text-violet-400" />
                      {event.capacity - event.tickets_sold} cupos disponibles de{' '}
                      {event.capacity}
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-3 rounded-full font-semibold transition-all transform group-hover:scale-105 shadow-lg shadow-violet-500/50">
                    Comprar Entradas
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
