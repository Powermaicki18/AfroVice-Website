import { useEffect, useState } from 'react';
import { supabase, GalleryImage } from '../lib/supabase';
import { X } from 'lucide-react';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setImages(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Galería de Eventos
          </h1>
          <p className="text-xl text-gray-300">
            Revive los mejores momentos de nuestros eventos
          </p>
        </div>

        {loading ? (
          <div className="text-white text-center py-12">Cargando galería...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.image_url}
                  alt={image.caption || 'Foto de evento'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="max-w-5xl w-full">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.caption || 'Foto de evento'}
                className="w-full h-auto rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              {selectedImage.caption && (
                <p className="text-white text-center mt-4 text-lg">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
