import {Artist} from '../lib/afrovice-api';

type ArtistCardProps = {
    artist: Artist;
};

export default function ArtistCard ({ artist }: ArtistCardProps) {
    return(
        <div
            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all group"
        >
            <div className="relative h-80 overflow-hidden">
                <img
                    src={artist.photo}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"/>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                        {artist.name}
                    </h3>
                </div>
            </div>
        </div>
    )
}