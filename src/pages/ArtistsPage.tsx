import {Music4} from 'lucide-react';
import useApi from "../hooks/useApi.ts";
import AfroviceApi from "../lib/afrovice-api.ts";
import ArtistCard from "../components/ArtistCard.tsx";

export default function ArtistsPage() {
    const [artists, loading] = useApi(AfroviceApi.getArtists(), []);

    return (
        <div className="min-h-screen bg-[#1a0f2e] pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Artistas
                    </h1>
                    <p className="text-xl text-gray-300">
                        Conoce a los DJs y artistas que hacen posible cada evento
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? <p className='text-center text-white'>Loading...</p> : null}
                    {artists.map((artist, index) => (
                        <ArtistCard artist={artist} key={index}/>
                    ))}
                </div>

                <div
                    className="mt-16 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-8 md:p-12 border border-violet-500/30 text-center">
                    <Music4 className="w-16 h-16 text-violet-400 mx-auto mb-4"/>
                    <h2 className="text-3xl font-bold text-white mb-4">¿Eres Artista?</h2>
                    <p className="text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
                        Únete a nuestra plataforma y lleva tu música a miles de personas en
                        toda Colombia
                    </p>
                    <button
                        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-violet-500/50">
                        Contáctanos
                    </button>
                </div>
            </div>
        </div>
    );
}
