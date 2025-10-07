import { Music, Users, Heart, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Music,
      title: 'Pasión por la Música',
      description:
        'Celebramos la riqueza cultural de la música afro, dancehall y reggaetón en Colombia.',
    },
    {
      icon: Users,
      title: 'Comunidad',
      description:
        'Conectamos a artistas, organizadores y fanáticos en experiencias inolvidables.',
    },
    {
      icon: Heart,
      title: 'Cultura Colombiana',
      description:
        'Promovemos el talento local y la diversidad cultural de nuestro país.',
    },
    {
      icon: Sparkles,
      title: 'Experiencias Únicas',
      description:
        'Creamos eventos memorables que celebran la vida y la música.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sobre Nosotros
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Ritmo nació de la pasión por conectar a las personas a través de la
                música urbana colombiana. Desde nuestros inicios, hemos trabajado
                para crear una plataforma que celebre la vibrante escena musical de
                afro, dancehall y reggaetón en todo el país.
              </p>
              <p>
                Creemos que la música es más que entretenimiento; es cultura,
                identidad y comunidad. Por eso, nos dedicamos a promover eventos que
                no solo ofrezcan grandes experiencias, sino que también apoyen a
                artistas locales y fortalezcan la escena musical colombiana.
              </p>
              <p>
                Hoy, somos la plataforma líder en Colombia para descubrir y disfrutar
                de los mejores eventos de música urbana en ciudades como Bogotá,
                Medellín y Cali.
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="DJ en acción"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-600/30 to-transparent rounded-2xl"></div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-violet-500/50">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-8 md:p-12 border border-violet-500/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Nuestra Misión</h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              Crear experiencias musicales inolvidables que conecten a las personas,
              celebren la cultura colombiana y promuevan el talento local,
              construyendo una comunidad vibrante alrededor de la música afro,
              dancehall y reggaetón.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
