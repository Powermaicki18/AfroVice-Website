import { useEffect, useState } from 'react';
import AfroViceAPI, {Event} from "../lib/afrovice-api.ts";
import EventCard from "../components/EventCard.tsx";

export default function EventsPage() {
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
    <div className="min-h-screen bg-[#1a0f2e] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Todos los Eventos
          </h1>
          <p className="text-xl text-gray-300">
            ¡Encuentra el evento perfecto para ti!
          </p>
        </div>

        {loading ? (
          <div className="text-white text-center py-12">Cargando eventos...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">
              No hay eventos disponibles con los filtros seleccionados
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
