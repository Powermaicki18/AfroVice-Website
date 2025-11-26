import { useState } from 'react';
import AfroviceApi from "../lib/afrovice-api";
import { Calendar, Clock, ShoppingCart, CheckCircle } from 'lucide-react';
import {useParams} from "react-router-dom";
import useApi from "../hooks/useApi.ts";
import moment from "moment";

export default function PurchasePage() {
  const { presentationId = '' } = useParams();
  const [ presentation ] = useApi(AfroviceApi.getPresentation(+presentationId), null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!presentation) return;

    if (quantity < 1) {
      setError('Debes seleccionar al menos una entrada');
      return;
    }

    setLoading(true);
    setError('');

    AfroviceApi.createTicket({
        user_id: 1,
        presentation_id: presentation.id,
        quantity
    }).then(ticket => {
        if (!ticket) {
            setError('Hubo un error al procesar tu compra. Por favor intenta de nuevo.');
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    });
  };

  const totalAmount = (presentation?.event.price ?? 0) * quantity;

  if (success) {
    return (
      <div className="min-h-screen bg-[#1a0f2e] pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 rounded-2xl p-8 md:p-12 border border-green-500/50 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              ¡Compra Exitosa!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Tu compra ha sido procesada exitosamente.
            </p>
            <div className="bg-white/5 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-white mb-4">
                Detalles de la Compra
              </h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Evento:</span>
                  <span className="font-semibold">{presentation?.event.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cantidad:</span>
                  <span className="font-semibold">{quantity} entrada(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-semibold text-xl text-violet-400">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Presenta tu correo de confirmación en la entrada del evento
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!presentation) {
    return (
      <div className="min-h-screen bg-[#1a0f2e] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Selecciona una presentación
            </h2>
            <p className="text-gray-400">
              Por favor selecciona una presentación para continuar con tu compra
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0f2e] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Comprar Entradas
          </h1>
          <p className="text-xl text-gray-300">
            Completa tu compra y asegura tu lugar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 mb-8">
              <img
                src={presentation?.flyer}
                alt={presentation?.event.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {presentation?.event.name}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-violet-400" />
                    {moment(presentation?.date_start).format('DD MMM / YYYY')}
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-violet-400" />
                      {moment(presentation?.date_start).format('HH:mm a')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6" />
                Información de Compra
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cantidad de Entradas
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between text-gray-300 mb-2">
                    <span>Precio por entrada:</span>
                    <span>${presentation?.event.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total:</span>
                    <span className="text-violet-400">
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-violet-500/50 text-lg"
                >
                  {loading
                    ? 'Procesando...'
                    : 'Confirmar Compra'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Al confirmar tu compra, aceptas nuestros términos y condiciones
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
