import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, ROOMS, STORE_INFO } from '../data/categories';
import Hero3DCanvas from '../components/Hero3DCanvas';
import Room3DExplorer from '../components/Room3DExplorer';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  FileText, 
  ChevronRight, 
  AlertTriangle, 
  ShoppingCart, 
  Check,
  MessageCircle,
  Phone,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const { 
    products, 
    navigateTo, 
    viewProductDetail, 
    addToCart, 
    selectedCity,
    open3DViewer 
  } = useStore();

  const [activeRoomId, setActiveRoomId] = useState('living-room');
  const activeRoom = ROOMS.find(r => r.id === activeRoomId) || ROOMS[0];

  const popularProducts = products.filter(p => p.popular).slice(0, 8);
  const roomProducts = products.filter(p => activeRoom.categoryIds.includes(p.category)).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-16 md:py-24 px-4 border-b border-navy-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800/80 border border-navy-700 text-xs font-semibold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-electric animate-ping"></span>
              <span>Raghavendra Colony, Jogulamba Gadwal</span>
              <span className="text-navy-600">•</span>
              <span className="text-white">Direct: {STORE_INFO.phone}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              NAVEEN<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">-ELECTRONICS</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Complete electrical solutions for homes and buildings in Jogulamba Gadwal. Genuine <strong>Polycab & Goldmedal copper wires</strong>, modular switches, fans, lights, and circuit protection at honest local trade rates.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-electric" />
                <span>Polycab & Goldmedal Only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-electric" />
                <span>Raghavendra Colony Store</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-electric" />
                <span>Same-Day Local Delivery</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3.5 bg-electric hover:bg-amber-400 text-navy-950 font-black rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm"
              >
                <span>Browse Electrical Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Naveen%20Electronics,%20I%20need%20an%20electrical%20materials%20estimate%20for%20my%20home%20in%20Jogulamba%20Gadwal`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2 text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Owner ({STORE_INFO.phone})</span>
              </a>
            </div>
          </div>

          {/* Right Column: Real-Time 3D Showcase & Live Rates Ticker */}
          <div className="lg:col-span-5 space-y-4">
            <Hero3DCanvas onOpenViewer={(type) => open3DViewer(type)} />

            {/* Quick Benchmark Rates Ticker */}
            <div className="bg-navy-900/90 rounded-2xl p-3 border border-navy-700/80 shadow-md backdrop-blur-md flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-electric animate-pulse"></span>
                <span className="text-slate-300 font-bold">Polycab 1.5mm²:</span>
                <span className="font-mono font-black text-electric">₹30/m</span>
              </div>
              <span className="text-navy-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-300 font-bold">Goldmedal 2.5mm²:</span>
                <span className="font-mono font-black text-amber-300">₹59/m</span>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="text-[10px] font-black text-amber-400 hover:underline"
              >
                All Rates →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Safety Warning Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-amber-50 via-warm-100 to-amber-50 p-6 rounded-3xl border border-amber-300/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center text-navy-950 flex-shrink-0 shadow-md">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-navy-900">
                Safety & Qualified Installation Advisory
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
                Electrical work involves lethal voltage and fire hazards. Never attempt wiring or breaker work without a qualified, licensed electrician. Ensure full compliance with the Indian Electricity Rules and BIS standards.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('faq')}
            className="px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl whitespace-nowrap transition-colors flex-shrink-0"
          >
            Read Safety Tips →
          </button>
        </div>
      </section>

      {/* 3. Category Shortcuts */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-warm-200 pb-4">
          <div>
            <span className="text-xs font-black text-amber-600 uppercase tracking-wider">Explore By Category</span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900">
              Browse Electrical Products
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-navy-900 hover:text-amber-600 flex items-center gap-1 transition-colors"
          >
            <span>View All Items</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', { category: cat.id })}
              className="group bg-white rounded-2xl border border-warm-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all p-5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-100 group-hover:bg-amber-400 text-navy-900 flex items-center justify-center transition-colors">
                    <Zap className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-warm-100 text-slate-700 px-2.5 py-1 rounded-full group-hover:bg-navy-900 group-hover:text-electric transition-colors">
                    {cat.badge}
                  </span>
                </div>

                <h3 className="text-base font-black text-navy-900 group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cat.subcategories.slice(0, 3).map((sub, sIdx) => (
                    <span key={sIdx} className="text-[10px] bg-warm-50 text-slate-600 px-2 py-0.5 rounded border border-warm-200">
                      {sub}
                    </span>
                  ))}
                  {cat.subcategories.length > 3 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{cat.subcategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-warm-100 flex items-center justify-between text-xs font-bold text-navy-900">
                <span className="text-slate-500">View Products</span>
                <span className="text-amber-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "Shop By Room" Showcase */}
      <section className="bg-warm-100/70 py-16 border-y border-warm-200">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-amber-600 uppercase tracking-wider">House Planning</span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900">
              Shop by Room: Wiring & Fittings Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Planning your house wiring in Jogulamba Gadwal? Pick a room to view the recommended Polycab / Goldmedal wires, fans, lights, and sockets.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeRoomId === room.id
                    ? 'bg-navy-900 text-electric shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-warm-200 border border-warm-200'
                }`}
              >
                <span>{room.name}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-200 shadow-md space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-warm-200 pb-6">
              <div>
                <h3 className="text-xl font-black text-navy-900">{activeRoom.name} Setup</h3>
                <p className="text-xs text-slate-500 mt-1">{activeRoom.subtitle}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeRoom.keyNeeds.map((need, idx) => (
                  <span key={idx} className="text-[11px] font-bold bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-amber-600" />
                    <span>{need}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive 3D Room Visualizer */}
            <Room3DExplorer
              activeRoom={activeRoom}
              onSelectProduct={viewProductDetail}
              onOpen3D={open3DViewer}
            />

            {/* Room Products Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {roomProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-warm-50/60 rounded-2xl border border-warm-200 hover:border-amber-400 p-4 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div 
                      onClick={() => viewProductDetail(product)}
                      className="relative aspect-video rounded-xl overflow-hidden bg-white cursor-pointer"
                    >
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute top-2 left-2 bg-navy-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {product.brand}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          open3DViewer(product);
                        }}
                        className="absolute bottom-2 right-2 bg-navy-950/85 hover:bg-electric hover:text-navy-950 text-electric text-[10px] font-black px-2 py-0.5 rounded-lg border border-navy-700/80 backdrop-blur-sm flex items-center gap-1 transition-all shadow"
                        title="Inspect in 3D"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>3D</span>
                      </button>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold text-amber-600 uppercase">{product.subcategory}</div>
                      <h4 
                        onClick={() => viewProductDetail(product)}
                        className="text-xs font-black text-navy-900 hover:text-amber-600 cursor-pointer line-clamp-2 mt-0.5"
                      >
                        {product.name}
                      </h4>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-warm-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-extrabold text-navy-900">
                        ₹{product.indicativePrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-500">per {product.unit} (est.)</div>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-2 bg-navy-900 hover:bg-amber-400 hover:text-navy-950 text-electric rounded-xl transition-colors shadow-sm"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Room Callout */}
            <div className="p-4 bg-navy-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-electric text-navy-950 flex items-center justify-center font-black">
                  BOM
                </div>
                <div>
                  <h4 className="text-sm font-bold">Wiring a new house in Raghavendra Colony or Gadwal?</h4>
                  <p className="text-xs text-slate-300">Share your material list directly with Naveen on WhatsApp for package pricing.</p>
                </div>
              </div>

              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Naveen,%20I%20need%20a%20wiring%20quote%20for%20a%20house%20in%20Jogulamba%20Gadwal`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-electric hover:bg-amber-400 text-navy-950 text-xs font-black rounded-xl transition-colors whitespace-nowrap"
              >
                WhatsApp List ({STORE_INFO.phone}) →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Popular Products */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-warm-200 pb-4">
          <div>
            <span className="text-xs font-black text-amber-600 uppercase tracking-wider">Top Sellers</span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900">
              Popular Products in Gadwal
            </h2>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-navy-900 hover:text-amber-600 flex items-center gap-1 transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-warm-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all p-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div 
                  onClick={() => viewProductDetail(product)}
                  className="relative aspect-square rounded-xl overflow-hidden bg-warm-100 cursor-pointer"
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  
                  <span className="absolute top-2 left-2 bg-navy-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {product.brand}
                  </span>

                  <span className="absolute bottom-2 left-2 bg-white/90 text-navy-900 text-[10px] font-black px-2 py-0.5 rounded shadow">
                    ⭐ {product.rating}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      open3DViewer(product);
                    }}
                    className="absolute bottom-2 right-2 bg-navy-950/85 hover:bg-electric hover:text-navy-950 text-electric text-[10px] font-black px-2 py-0.5 rounded-lg border border-navy-700/80 backdrop-blur-sm flex items-center gap-1 transition-all shadow"
                    title="Inspect in 3D"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>3D</span>
                  </button>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.subcategory}</div>
                  <h3 
                    onClick={() => viewProductDetail(product)}
                    className="text-xs sm:text-sm font-black text-navy-900 hover:text-amber-600 cursor-pointer line-clamp-2 mt-0.5"
                  >
                    {product.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">SKU: {product.sku}</div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-warm-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-base sm:text-lg font-black text-navy-900">
                      ₹{product.indicativePrice.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Estimate / per {product.unit}
                    </div>
                  </div>

                  {product.mrp && (
                    <div className="text-right">
                      <span className="text-xs text-slate-400 line-through">MRP ₹{product.mrp}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => viewProductDetail(product)}
                    className="py-2 px-3 text-xs font-bold text-navy-900 bg-warm-100 hover:bg-warm-200 rounded-xl transition-colors text-center"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="py-2 px-3 text-xs font-black text-navy-950 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors text-center flex items-center justify-center gap-1 shadow-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Contact Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-navy-900 to-navy-950 text-white p-8 rounded-3xl border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Locally Owned & Operated</span>
            <h3 className="text-2xl font-black">Visit Naveen Electronics in Raghavendra Colony</h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Serving Jogulamba Gadwal district with genuine Polycab & Goldmedal copper wires, fans, and modular switches. Walk into our shop or call owner directly at <strong className="text-electric">{STORE_INFO.phone}</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="px-5 py-3 bg-white hover:bg-slate-100 text-navy-950 text-xs font-black rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-navy-900" />
              <span>Call: {STORE_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Naveen%20Electronics`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition-colors flex items-center gap-1.5 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Message</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
