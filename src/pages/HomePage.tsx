import { useEffect, useState } from 'react';
import { supabase, Event } from '../lib/supabase';
import { Calendar, MapPin, Users } from 'lucide-react';

type HomePageProps = {
  onNavigate: (page: string) => void;
};

export default function HomePage({ onNavigate }: HomePageProps) {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('afro');
  const [cityEvents, setCityEvents] = useState<{ city: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedEvents();
    loadCityStats();
  }, []);

  const loadFeaturedEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('featured', true)
      .order('event_date', { ascending: true })
      .limit(3);

    if (data && !error) {
      setFeaturedEvents(data);
    }
    setLoading(false);
  };

  const loadCityStats = async () => {
    const { data } = await supabase
      .from('events')
      .select('city');

    if (data) {
      const cityCounts = data.reduce((acc, event) => {
        acc[event.city] = (acc[event.city] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setCityEvents(
        Object.entries(cityCounts).map(([city, count]) => ({ city, count }))
      );
    }
  };

  const genres = [
    { id: 'afro', label: 'Afro' },
    { id: 'dancehall', label: 'Dancehall' },
    { id: 'reggaeton', label: 'Reggaetón' },
  ];

  const genreEvents = featuredEvents.filter(event => event.genre === selectedGenre);

  return (
    <div className="min-h-screen bg-[#1a0f2e]">
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1a0f2e]" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Vive la Noche Colombiana
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl">
            Descubre los mejores eventos de música afro, dancehall y reggaetón en
            todo el país.
          </p>
          <button
            onClick={() => onNavigate('eventos')}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-violet-500/50"
          >
            Explorar Eventos
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Próximos Eventos</h2>
        </div>

        <div className="flex gap-3 mb-8">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedGenre === genre.id
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-white text-center py-12">Cargando eventos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {genreEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20"
                onClick={() => onNavigate('eventos')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${event.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.event_date).toLocaleDateString('es-CO', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    {event.venue}, {event.city}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Users className="w-4 h-4" />
                    {event.capacity - event.tickets_sold} cupos disponibles
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Eventos por Ciudad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cityEvents.map(({ city, count }) => (
              <div
                key={city}
                className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => onNavigate('eventos')}
              >
                <img
                  src={
                    city === 'Bogotá'
                      ? 'https://images.pexels.com/photos/208723/pexels-photo-208723.jpeg?auto=compress&cs=tinysrgb&w=800'
                      : city === 'Medellín'
                      ? 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800'
                      : 'https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=800'
                  }
                  alt={city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Eventos en {city}
                  </h3>
                  <p className="text-gray-200">{count} eventos próximos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
