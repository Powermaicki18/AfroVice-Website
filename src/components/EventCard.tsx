import {Link} from "react-router-dom";
import { Event } from '../lib/afrovice-api';

type EventCardProps = {
    event: Event;
};

export default function EventCard({ event }: EventCardProps) {
    return (
        <Link to={`/compras/${event.id}`}>
            <div className="group bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20">
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={event.logo}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${event.price.toLocaleString()}
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                        {event.name}
                    </h3>

                    <button className="w-full mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-3 rounded-full font-semibold transition-all transform group-hover:scale-105 shadow-lg shadow-violet-500/50">
                        Comprar Entradas
                    </button>
                </div>
            </div>
        </Link>
    );
}