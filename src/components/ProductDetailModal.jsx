import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_INFO } from '../data/categories';
import { 
  X, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Truck, 
  AlertTriangle, 
  Check, 
  Info, 
  Star,
  Layers,
  MessageCircle,
  Sparkles
} from 'lucide-react';

export default function ProductDetailModal() {
  const { 
    selectedProduct, 
    productModalOpen, 
    setProductModalOpen, 
    addToCart, 
    toggleWishlist, 
    wishlist, 
    products, 
    viewProductDetail,
    open3DViewer 
  } = useStore();

  if (!productModalOpen || !selectedProduct) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(selectedProduct.unit);
  const [pincode, setPincode] = useState('509125');
  const [pincodeStatus, setPincodeStatus] = useState({
    checked: true,
    message: 'Jogulamba Gadwal Local Delivery & Counter Pickup',
    eta: 'Available today at Raghavendra Colony shop or local delivery'
  });

  const isWireOrCable = selectedProduct.category === 'wires-cables' && selectedProduct.coilPrice;
  const unitPrice = (selectedUnit === selectedProduct.coilLength && selectedProduct.coilPrice)
    ? selectedProduct.coilPrice
    : selectedProduct.indicativePrice;

  const getDiscountPercent = (qty) => {
    if (qty >= 50) return 10;
    if (qty >= 10) return 5;
    return 0;
  };

  const discountPercent = getDiscountPercent(quantity);
  const discountedUnitPrice = discountPercent > 0 
    ? Math.round(unitPrice * (1 - discountPercent / 100)) 
    : unitPrice;
  const totalPrice = discountedUnitPrice * quantity;

  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeStatus({ checked: false, message: 'Please enter a valid 6-digit Indian PIN code' });
      return;
    }

    if (pincode === '509125' || pincode.startsWith('509')) {
      setPincodeStatus({
        checked: true,
        message: 'Jogulamba Gadwal & Mahabubnagar District',
        eta: 'Same-day pickup at Raghavendra Colony or local delivery'
      });
    } else if (pincode.startsWith('518') || pincode.startsWith('500')) {
      setPincodeStatus({
        checked: true,
        message: 'Kurnool / Hyderabad Region',
        eta: 'Fast regional delivery within 24 to 48 hours'
      });
    } else {
      setPincodeStatus({
        checked: true,
        message: 'All India Delivery',
        eta: 'Dispatched via insured courier in 2 - 4 business days'
      });
    }
  };

  const handleWhatsAppProduct = () => {
    const text = `Hi Naveen Electronics (Jogulamba Gadwal),\n\nI want to confirm the current price and availability for:\n*Product:* ${selectedProduct.name}\n*Brand:* ${selectedProduct.brand}\n*SKU:* ${selectedProduct.sku}\n*Estimated Rate:* ₹${unitPrice} per ${selectedUnit}\n*Quantity:* ${quantity}\n\nPlease confirm availability at your Raghavendra Colony store.`;
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-warm-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-warm-200 bg-warm-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className="text-navy-900 font-extrabold">{STORE_INFO.name}</span>
            <span>/</span>
            <span className="text-slate-700">{selectedProduct.brand}</span>
            <span>/</span>
            <span className="text-slate-400 font-mono text-[11px]">{selectedProduct.sku}</span>
          </div>

          <button
            onClick={() => setProductModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-warm-200 text-slate-500 hover:text-navy-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Product Image & Badges */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-warm-100 border border-warm-200 group">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute top-3 left-3 bg-navy-900/90 text-white text-xs font-black px-2.5 py-1 rounded-lg backdrop-blur-sm border border-navy-700">
                  {selectedProduct.brand}
                </div>

                <div className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                  selectedProduct.inStock 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {selectedProduct.inStock ? 'Available at Gadwal Shop' : 'Order On Request'}
                </div>
              </div>

              {/* Interactive 3D Inspection Button */}
              <button
                type="button"
                onClick={() => {
                  setProductModalOpen(false);
                  open3DViewer(selectedProduct);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-navy-950 via-navy-900 to-slate-800 hover:from-navy-900 hover:to-slate-700 text-electric rounded-xl text-xs font-black shadow-md border border-navy-700 flex items-center justify-center gap-2 transition-all group"
              >
                <Sparkles className="w-4 h-4 text-electric group-hover:rotate-12 transition-transform" />
                <span>Interactive 3D View (Rotate 360° & Test)</span>
              </button>

              {/* Estimate Note */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="font-bold">Estimated Price:</strong> Copper rates adjust periodically. Please confirm today's live rate with Naveen Electronics before purchasing. Last updated: <span className="font-mono font-bold">{selectedProduct.lastPriceUpdate}</span>.
                </div>
              </div>
            </div>

            {/* Right: Info, Price, Units, Quantities */}
            <div className="space-y-5">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-navy-900 leading-snug">
                  {selectedProduct.name}
                </h1>
                
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1 bg-amber-400 text-navy-950 font-black px-2 py-0.5 rounded">
                    <Star className="w-3.5 h-3.5 fill-navy-950" />
                    <span>{selectedProduct.rating}</span>
                  </div>
                  <span className="text-slate-500">({selectedProduct.reviewsCount} customer reviews)</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 100% Genuine ISI Marked
                  </span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-warm-100 rounded-2xl border border-warm-200 space-y-2">
                <div className="flex items-baseline gap-3">
                  <div className="text-3xl font-black text-navy-900">
                    ₹{discountedUnitPrice.toLocaleString('en-IN')}
                  </div>
                  {selectedProduct.mrp && (
                    <div className="text-sm text-slate-400 line-through">
                      MRP ₹{selectedProduct.mrp}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-600">
                    per <span className="text-navy-900 font-extrabold uppercase">{selectedUnit}</span> (Estimated)
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block border border-emerald-200">
                    🎉 Bulk Quantity Discount: {discountPercent}% Applied!
                  </div>
                )}

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                  <span>GST Invoice Available</span>
                  <span className="font-mono text-slate-700">SKU: {selectedProduct.sku}</span>
                </div>
              </div>

              {/* Unit Switcher */}
              {isWireOrCable && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Select Purchase Unit:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedUnit(selectedProduct.unit)}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                        selectedUnit === selectedProduct.unit
                          ? 'border-navy-900 bg-navy-900 text-white shadow-md'
                          : 'border-warm-200 bg-white text-navy-900 hover:bg-warm-100'
                      }`}
                    >
                      <div>Cut Length (Per Metre)</div>
                      <div className="text-amber-400 font-black">₹{selectedProduct.indicativePrice}/m</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedUnit(selectedProduct.coilLength)}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                        selectedUnit === selectedProduct.coilLength
                          ? 'border-navy-900 bg-navy-900 text-white shadow-md'
                          : 'border-warm-200 bg-white text-navy-900 hover:bg-warm-100'
                      }`}
                    >
                      <div>Factory Sealed ({selectedProduct.coilLength})</div>
                      <div className="text-amber-400 font-black">₹{selectedProduct.coilPrice}</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Buttons */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-warm-100 rounded-xl border border-warm-200 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-lg bg-white hover:bg-warm-200 text-navy-900 font-bold flex items-center justify-center text-xs"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-extrabold text-navy-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-lg bg-white hover:bg-warm-200 text-navy-900 font-bold flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct, quantity, selectedUnit);
                      setProductModalOpen(false);
                    }}
                    className="flex-1 py-3 px-6 bg-navy-900 hover:bg-navy-800 text-electric font-black rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart (₹{totalPrice.toLocaleString('en-IN')})</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="p-3 rounded-xl border border-warm-200 hover:bg-warm-100 text-slate-600 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
                  <span>10+ units: <strong>5% discount</strong></span>
                  <button 
                    onClick={handleWhatsAppProduct}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Confirm Live Rate on WhatsApp ({STORE_INFO.phone})</span>
                  </button>
                </div>
              </div>

              {/* Delivery / Shop Pickup */}
              <div className="p-3.5 bg-warm-50 rounded-xl border border-warm-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-500" />
                    <span>Check Delivery & Store Pickup</span>
                  </div>
                  <span className="text-slate-400 font-normal">PIN Code</span>
                </div>

                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="509125"
                    className="w-36 bg-white border border-warm-200 rounded-lg px-3 py-1.5 text-xs font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-electric"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Check
                  </button>
                </form>

                {pincodeStatus && (
                  <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1.5 pt-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <strong>{pincodeStatus.message}:</strong> {pincodeStatus.eta}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-warm-200 pb-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <h3 className="font-extrabold text-navy-900 text-sm uppercase tracking-wider">
                Product Details & Electrical Specifications
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-warm-50 rounded-lg flex justify-between border border-warm-200">
                <span className="text-slate-500">Brand</span>
                <span className="font-bold text-navy-900">{selectedProduct.brand}</span>
              </div>
              <div className="p-2.5 bg-warm-50 rounded-lg flex justify-between border border-warm-200">
                <span className="text-slate-500">Warranty</span>
                <span className="font-bold text-navy-900">{selectedProduct.warranty}</span>
              </div>

              {selectedProduct.specs && Object.entries(selectedProduct.specs).map(([key, value]) => (
                <div key={key} className="p-2.5 bg-warm-50 rounded-lg flex justify-between border border-warm-200">
                  <span className="text-slate-500">{key}</span>
                  <span className="font-bold text-navy-900 text-right ml-2">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Notice */}
          <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-xs text-navy-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-amber-900">Safety & Installation Advice</h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Always hire an experienced, licensed electrician for wiring installations and main board breakers. Never connect circuits with main power ON.
              </p>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-extrabold text-navy-900 text-sm">
                Related Items at Naveen Electronics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => viewProductDetail(rel)}
                    className="p-3 rounded-xl border border-warm-200 hover:border-amber-400 bg-white hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <img src={rel.image} alt={rel.name} className="w-12 h-12 object-cover rounded-lg border border-warm-200" />
                      <div>
                        <div className="text-xs font-bold text-navy-900 line-clamp-1">{rel.name}</div>
                        <div className="text-[10px] text-slate-500">{rel.brand}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-warm-100">
                      <span className="font-bold text-navy-900">₹{rel.indicativePrice} <span className="text-[10px] text-slate-500">/ {rel.unit}</span></span>
                      <span className="text-[11px] text-amber-600 font-bold hover:underline">View →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
