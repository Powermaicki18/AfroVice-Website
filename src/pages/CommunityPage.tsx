import { Users, Heart, MessageCircle, Share2 } from 'lucide-react';

export default function CommunityPage() {
  const posts = [
    {
      author: 'María González',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      content: '¡Increíble noche en el evento de Afro! La energía estaba en otro nivel 🔥',
      likes: 245,
      comments: 32,
      time: 'Hace 2 horas',
    },
    {
      author: 'Carlos Ramírez',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      content: 'El DJ estuvo increíble anoche. Ya quiero que sea el próximo evento 🎵',
      likes: 189,
      comments: 28,
      time: 'Hace 5 horas',
    },
    {
      author: 'Andrea Silva',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      content: 'Primera vez en un evento de dancehall y quedé enamorada. ¡Volveré seguro!',
      likes: 312,
      comments: 45,
      time: 'Hace 1 día',
    },
  ];

  const stats = [
    { label: 'Miembros', value: '25,000+', icon: Users },
    { label: 'Eventos Realizados', value: '500+', icon: Heart },
    { label: 'Ciudades', value: '15+', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Comunidad
          </h1>
          <p className="text-xl text-gray-300">
            Conéctate con otros amantes de la música urbana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/50">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">
                ¿Qué está pasando?
              </h2>
              <textarea
                placeholder="Comparte tu experiencia..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-violet-500/50">
                  Publicar
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">
                          {post.author}
                        </h3>
                        <span className="text-sm text-gray-400">
                          {post.time}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{post.content}</p>
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Próximos Eventos
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-violet-600 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                    <div className="text-xs">NOV</div>
                    <div className="text-lg font-bold">15</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      Noche de Ritmos Urbanos
                    </h3>
                    <p className="text-xs text-gray-400">Bogotá</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-fuchsia-600 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                    <div className="text-xs">NOV</div>
                    <div className="text-lg font-bold">20</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      Dancehall Vibes
                    </h3>
                    <p className="text-xs text-gray-400">Medellín</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 border border-violet-500/30">
              <h2 className="text-xl font-bold text-white mb-3">
                Únete a Nosotros
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                Sé parte de la comunidad más vibrante de música urbana en Colombia
              </p>
              <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-violet-500/50">
                Unirme Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
