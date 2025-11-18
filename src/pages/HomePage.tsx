import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AfroViceAPI, {Event} from "../lib/afrovice-api.ts";
import EventCard from "../components/EventCard.tsx";

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        AfroViceAPI.getEvents().then(response => {
            setEvents(response);
            setLoading(false);
        });
    }, []);

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
            AfroVice
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl">
            Descubre los mejores eventos de música afro, dancehall y reggaetón en
            todo el país.
          </p>
          <Link to="/eventos">
            <button
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-violet-500/50"
            >
              Explorar Eventos
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Próximos Eventos</h2>
        </div>

        {loading ? (
          <div className="text-white text-center py-12">Cargando eventos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {events.slice(0, 3).map((event) => (
                  <EventCard event={event} key={event.id} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
