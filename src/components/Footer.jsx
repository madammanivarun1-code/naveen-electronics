import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, STORE_INFO } from '../data/categories';
import { 
  Zap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Truck, 
  FileCheck2, 
  MessageCircle, 
  Award
} from 'lucide-react';

export default function Footer() {
  const { navigateTo } = useStore();

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-8 border-t border-navy-800">
      {/* 1. Value Proposition Banner */}
      <div className="max-w-7xl mx-auto px-4 pb-12 mb-12 border-b border-navy-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-navy-900/60 border border-navy-800">
          <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Polycab & Goldmedal Wires</h4>
            <p className="text-xs text-slate-400 mt-1">100% genuine pure electrolytic copper cables and FR/FRLS coils.</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-navy-900/60 border border-navy-800">
          <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 flex-shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Local Gadwal Same-Day Delivery</h4>
            <p className="text-xs text-slate-400 mt-1">Direct delivery across Raghavendra Colony, Jogulamba Gadwal town, and sites.</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-navy-900/60 border border-navy-800">
          <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Electrician & Contractor Rates</h4>
            <p className="text-xs text-slate-400 mt-1">Special bulk pricing for new home wiring, villas, and building projects.</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-navy-900/60 border border-navy-800">
          <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 flex-shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">WhatsApp: {STORE_INFO.phone}</h4>
            <p className="text-xs text-slate-400 mt-1">Send your material list on WhatsApp for instant quote and stock confirmation.</p>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
        {/* Brand & Address Column (2 spans) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-navy-900 flex items-center justify-center text-electric border border-navy-700">
              <Zap className="w-5 h-5 fill-electric" />
            </div>
            <span className="text-xl font-black text-white">
              NAVEEN<span className="text-amber-400">-ELECTRONICS</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed pr-4">
            Your trusted local electrical retail and wholesale counter in Raghavendra Colony, Jogulamba Gadwal. Supplying genuine Polycab & Goldmedal copper wires, modular switches, fans, LED lighting, MCB distribution boards, and complete house wiring supplies.
          </p>

          <div className="space-y-2.5 text-xs text-slate-300 pt-2">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{STORE_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Owner Contact: <strong className="text-white">{STORE_INFO.phone}</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>WhatsApp Orders: <strong className="text-emerald-400">{STORE_INFO.phone}</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{STORE_INFO.operatingHours}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <FileCheck2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>GSTIN: <span className="text-white font-mono">{STORE_INFO.gstin}</span> (Tax Invoice Available)</span>
            </div>
          </div>
        </div>

        {/* Product Categories Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product Categories</h4>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.slice(0, 7).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => navigateTo('shop', { category: cat.id })}
                  className="hover:text-amber-400 transition-colors text-left text-slate-400 hover:translate-x-1 duration-150 inline-block"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care & Policies */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Shop Information</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => navigateTo('about')} className="text-slate-400 hover:text-white transition-colors">
                About Naveen Electronics
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="text-slate-400 hover:text-white transition-colors">
                Raghavendra Colony Shop Location
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('rfq')} className="text-slate-400 hover:text-white transition-colors">
                Request a Bulk Quote (BOM)
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('shipping')} className="text-slate-400 hover:text-white transition-colors">
                Jogulamba Gadwal Local Delivery
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('faq')} className="text-slate-400 hover:text-white transition-colors">
                Frequently Asked Questions
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('admin')} className="text-slate-400 hover:text-amber-400 transition-colors font-medium">
                Admin Product Catalog
              </button>
            </li>
          </ul>
        </div>

        {/* Safety & Compliance Box */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Safety Warning</span>
          </h4>
          <div className="bg-navy-900/80 p-3.5 rounded-xl border border-amber-500/20 text-[11px] text-slate-300 space-y-2">
            <p className="leading-relaxed">
              <strong className="text-white">Professional Installation Required:</strong> Always consult an experienced, licensed electrician for sizing house wire gauge and installing MCB breakers.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Ensure mains supply is switched off before any servicing.
            </p>
          </div>

          <div className="pt-2">
            <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Accepted Payment Modes</div>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-300">
              <span className="bg-navy-900 px-2 py-0.5 rounded border border-navy-800">PhonePe / GPay (9440800487)</span>
              <span className="bg-navy-900 px-2 py-0.5 rounded border border-navy-800">Cash at Shop</span>
              <span className="bg-navy-900 px-2 py-0.5 rounded border border-navy-800">UPI / QR</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Indicative Price Disclaimer & Copyright */}
      <div className="max-w-7xl mx-auto px-4 pt-6 space-y-4 text-xs text-slate-400">
        <div className="p-3 bg-navy-900/40 rounded-xl border border-navy-800/80 text-[11px] leading-relaxed text-slate-400">
          <strong className="text-slate-300">Important Price Notice:</strong> {STORE_INFO.indicativePriceNotice} All brand certifications and warranties are as provided by Polycab, Goldmedal, Philips, Legrand, Crompton, and respective manufacturers.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div>
            © {new Date().getFullYear()} {STORE_INFO.name}. Raghavendra Colony, Jogulamba Gadwal, Telangana.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">Call Owner: {STORE_INFO.phone}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
