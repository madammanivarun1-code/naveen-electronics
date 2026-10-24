import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_INFO } from '../data/categories';
import { X, Send, Clock } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const { cart, selectedProduct } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickMessages = [
    { title: 'Polycab & Goldmedal Wire Quote', text: 'Hi Naveen Electronics, please send the latest rate for Polycab & Goldmedal wire coils (1.5mm & 2.5mm) in Jogulamba Gadwal.' },
    { title: 'Check Shop Stock in Raghavendra Colony', text: 'Hi Naveen Electronics, do you have stock available right now at Raghavendra Colony shop?' },
    { title: 'Send House Wiring List (BOM)', text: 'Hi Naveen Electronics, I am sharing my electrical material list for a house wiring estimate in Jogulamba Gadwal.' },
    { title: 'Check Product Price & Availability', text: `Hi Naveen Electronics, please confirm today's price for: ${selectedProduct ? selectedProduct.name : 'switches and wires'}.` }
  ];

  const handleSendWhatsApp = (textToSend) => {
    const finalMsg = textToSend || customMsg || "Hello Naveen Electronics, I would like to enquire about electrical products.";
    let enrichedMsg = finalMsg;

    if (cart.length > 0) {
      enrichedMsg += `\n\n(Cart Summary: ${cart.length} item(s) totalling approx ₹${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toLocaleString('en-IN')})`;
    }

    const encoded = encodeURIComponent(enrichedMsg);
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {!isOpen && (
          <div className="hidden md:flex items-center gap-2 bg-white text-navy-900 py-1.5 px-3 rounded-full shadow-lg border border-warm-200 text-xs font-bold animate-bounce select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>WhatsApp: {STORE_INFO.phone}</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="WhatsApp Naveen Electronics"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border-2 border-white relative group"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              {/* WhatsApp icon */}
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-electric border-2 border-white"></span>
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Chat Popover Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-warm-200 z-50 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-base">
                  ⚡
                </div>
                <div>
                  <h3 className="font-extrabold text-sm leading-tight">NAVEEN-ELECTRONICS</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-100 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-electric animate-pulse"></span>
                    <span>Direct: {STORE_INFO.phone} • Raghavendra Colony, Gadwal</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-emerald-100 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[11px] text-emerald-50 mt-2 bg-emerald-700/60 p-2 rounded-lg leading-relaxed">
              Serving homeowners, electricians, and contractors in Jogulamba Gadwal. Chat directly with the owner for today's live Polycab & Goldmedal rates.
            </p>
          </div>

          {/* Quick Option Prompts */}
          <div className="p-4 bg-warm-50 space-y-2 border-b border-warm-200 max-h-56 overflow-y-auto">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Quick WhatsApp Messages:
            </div>
            {quickMessages.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendWhatsApp(item.text)}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 hover:border-emerald-300 rounded-xl border border-warm-200 text-xs transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-navy-900 group-hover:text-emerald-800">{item.title}</div>
                  <div className="text-[10px] text-slate-500 line-clamp-1">{item.text}</div>
                </div>
                <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>

          {/* Custom Message Field */}
          <div className="p-3 bg-white flex items-center gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendWhatsApp()}
              placeholder="Type your message or materials needed..."
              className="flex-1 bg-warm-100 text-xs rounded-xl px-3 py-2.5 border border-warm-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSendWhatsApp()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-sm"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 py-2 bg-warm-100 text-[10px] text-slate-500 text-center border-t border-warm-200 flex items-center justify-center gap-2">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Open 8:00 AM - 9:30 PM • Direct reply to {STORE_INFO.phone}</span>
          </div>
        </div>
      )}
    </>
  );
}
