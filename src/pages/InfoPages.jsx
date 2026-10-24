import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_INFO, CATEGORIES } from '../data/categories';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  HelpCircle, 
  ChevronDown, 
  Send, 
  AlertTriangle,
  FileCheck2,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';

export function AboutPage() {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-black text-amber-600 uppercase tracking-wider">Locally Rooted & Trusted</span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900">
          About NAVEEN-ELECTRONICS
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Serving Raghavendra Colony, Jogulamba Gadwal, and surrounding regions in Telangana with genuine electrical supplies, focused exclusively on <strong>Polycab and Goldmedal</strong> copper wiring.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-warm-200 p-8 space-y-6 shadow-sm">
        <h2 className="text-xl font-black text-navy-900">Your Trusted Electrical Counter in Jogulamba Gadwal</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Located on the Raghavendra Colony Main Road in Jogulamba Gadwal, <strong>NAVEEN-ELECTRONICS</strong> has been the reliable neighborhood destination for electricians, contractors, and homeowners building or renovating their houses.
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">
          We believe in 100% quality and safety. For home wiring, we maintain strict brand standards: we stock <strong>Goldmedal and Polycab exclusively</strong> for house wires and cables, ensuring every customer gets genuine electrolytic copper, superior flame-retardant insulation, and safety that lasts for generations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-warm-200 text-center">
          <div className="p-4 bg-warm-50 rounded-2xl">
            <div className="text-2xl font-black text-navy-900">100%</div>
            <div className="text-xs text-slate-500 mt-1">Polycab & Goldmedal Wires</div>
          </div>
          <div className="p-4 bg-warm-50 rounded-2xl">
            <div className="text-2xl font-black text-navy-900">Raghavendra Colony</div>
            <div className="text-xs text-slate-500 mt-1">Jogulamba Gadwal Hub</div>
          </div>
          <div className="p-4 bg-warm-50 rounded-2xl">
            <div className="text-2xl font-black text-navy-900">9440800487</div>
            <div className="text-xs text-slate-500 mt-1">Owner Direct Line</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const { showToast } = useStore();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent to Naveen Electronics!', 'success');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-black text-amber-600 uppercase tracking-wider">Contact & Location</span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900">
          Visit Our Shop or Call Us
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Walk into our Raghavendra Colony shop or call owner directly at <strong className="text-navy-900">{STORE_INFO.phone}</strong> for today's live prices and stock.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 bg-navy-950 text-white rounded-3xl p-8 space-y-6 shadow-xl">
          <h2 className="text-xl font-black">NAVEEN-ELECTRONICS</h2>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Shop Address:</strong>
                <span>{STORE_INFO.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <strong className="text-white block">Owner Phone & Call:</strong>
                <span className="text-white font-bold">{STORE_INFO.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <strong className="text-white block">WhatsApp Number:</strong>
                <span className="text-emerald-400 font-bold">{STORE_INFO.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <strong className="text-white block">Working Hours:</strong>
                <span>{STORE_INFO.operatingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileCheck2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <strong className="text-white block">GSTIN Registration:</strong>
                <span className="font-mono text-electric">{STORE_INFO.gstin}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-navy-800 space-y-2">
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Naveen%20Electronics,%20I%20want%20to%20enquire%20about%20products`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-center rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {STORE_INFO.phone}</span>
            </a>

            <a
              href={`tel:${STORE_INFO.phone}`}
              className="w-full py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-bold text-center rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-navy-700"
            >
              <Phone className="w-4 h-4 text-electric" />
              <span>Call Owner: {STORE_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-warm-200 p-8 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-navy-900">Send an Inquiry or Material Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Suresh Kumar"
                  className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9440800487"
                  className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Message / Materials Needed *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Ask about Polycab / Goldmedal wire coils, modular switches, fans, or delivery in Jogulamba Gadwal..."
                className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-medium"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-navy-900 hover:bg-navy-800 text-electric font-black text-xs rounded-xl shadow transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send to Naveen Electronics</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Which brands of wire and cable do you supply?',
      a: 'At Naveen Electronics, we exclusively supply Goldmedal and Polycab for home and commercial electrical wiring. These brands are ISI certified and engineered with 100% pure electrolytic copper for fire safety and minimal power loss.'
    },
    {
      q: 'Why are prices marked as "estimates"? How do I confirm the final price?',
      a: 'Prices for copper wires and metal conduits fluctuate with daily metal market indexes. Our online catalog displays estimated benchmark prices. To confirm the final live rate, simply click the WhatsApp button or call owner directly at 9440800487.'
    },
    {
      q: 'Do you deliver in Jogulamba Gadwal and Raghavendra Colony?',
      a: 'Yes, we provide same-day local delivery across Raghavendra Colony, Jogulamba Gadwal town, and surrounding mandals for building materials and conduit pipes.'
    },
    {
      q: 'Can I bring my house wiring list / Bill of Materials (BOM) for an estimate?',
      a: 'Yes! You can walk into our Raghavendra Colony shop or send a photo of your electrical material list to our WhatsApp at 9440800487 for a package estimate with contractor discounts.'
    },
    {
      q: 'Do you provide GST tax invoices for building work?',
      a: 'Yes, we provide official GST invoices with itemized rates and HSN codes for all electrical items.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-black text-amber-600 uppercase tracking-wider">Help & Answers</span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Common questions about wiring brands, pricing estimates, and store details in Jogulamba Gadwal.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-warm-200 overflow-hidden transition-all shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left p-5 flex items-center justify-between gap-4 font-extrabold text-navy-900 text-xs sm:text-sm"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180 text-amber-600' : ''}`} />
            </button>

            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-warm-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-black text-navy-900">Local Delivery & Store Pickup</h1>
      <div className="bg-white rounded-3xl border border-warm-200 p-8 space-y-4 text-xs text-slate-600 leading-relaxed shadow-sm">
        <h2 className="text-sm font-bold text-navy-900">1. Raghavendra Colony & Jogulamba Gadwal Delivery</h2>
        <p>We provide prompt local delivery across Raghavendra Colony and Jogulamba Gadwal town. Orders over ₹1,999 qualify for Free Local Delivery.</p>

        <h2 className="text-sm font-bold text-navy-900 pt-2">2. Heavy Conduit Pipes and Inverters</h2>
        <p>Rigid 3-metre PVC conduit pipes, inverter batteries, and distribution boards can be delivered directly to your construction site or picked up at our Raghavendra Colony shop.</p>
      </div>
    </div>
  );
}

export function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-black text-navy-900">Returns & Warranty Replacement</h1>
      <div className="bg-white rounded-3xl border border-warm-200 p-8 space-y-4 text-xs text-slate-600 leading-relaxed shadow-sm">
        <h2 className="text-sm font-bold text-navy-900">1. Factory-Sealed Polycab & Goldmedal Coils</h2>
        <p>Unused, unopened 90m factory-sealed wire coils with original seals intact can be returned or exchanged within 7 days.</p>

        <h2 className="text-sm font-bold text-navy-900 pt-2">2. Manufacturer Warranty Support</h2>
        <p>All modular switches, MCBs, fans, and LED fixtures carry manufacturer warranties. Naveen Electronics assists with immediate over-the-counter testing and replacement for verified defects.</p>
      </div>
    </div>
  );
}

export function LegalPage({ title }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-black text-navy-900">{title}</h1>
      <div className="bg-white rounded-3xl border border-warm-200 p-8 space-y-4 text-xs text-slate-600 leading-relaxed shadow-sm">
        <p>NAVEEN-ELECTRONICS operates from Raghavendra Colony, Jogulamba Gadwal, Telangana under Indian commercial and trade laws. All customer data and transaction records are maintained confidentially.</p>
        <p>Online catalog rates are estimates and subject to trade revisions. All disputes are subject to the jurisdiction of the competent courts in Jogulamba Gadwal, Telangana.</p>
      </div>
    </div>
  );
}
