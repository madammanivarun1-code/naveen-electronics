import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, STORE_INFO } from '../data/categories';
import { 
  Zap, 
  Search, 
  ShoppingCart, 
  Heart, 
  PhoneCall, 
  ShieldAlert, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  FileText, 
  SlidersHorizontal,
  Home,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';

export default function Header() {
  const {
    activePage,
    cartItemsCount,
    cartSubtotal,
    wishlist,
    searchQuery,
    setSearchQuery,
    navigateTo,
    setSelectedCategory,
    selectedCity,
    setSelectedCity,
    products,
    viewProductDetail
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchRef = useRef(null);
  const categoriesRef = useRef(null);
  const cityRef = useRef(null);

  const regions = [
    'Raghavendra Colony, Jogulamba Gadwal (Local Shop)',
    'Jogulamba Gadwal Town & Surrounding Mandals',
    'Alampur & Ieeja Region',
    'Wanaparthy & Mahabubnagar',
    'Kurnool District',
    'All Telangana Delivery'
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesDropdownOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setCityDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop', { search: searchQuery });
      setSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-warm-200 shadow-sm">
      {/* 1. Top Notice Bar */}
      <div className="bg-navy-950 text-white text-xs py-2 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Estimate price notice */}
          <div className="flex items-center gap-1.5 text-amber-300 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            <ShieldAlert className="w-4 h-4 text-electric flex-shrink-0 animate-pulse" />
            <span>Estimated Prices Only: Confirm current live price with store before purchase.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-xs">
            {/* Location selector */}
            <div className="relative" ref={cityRef}>
              <button 
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1 hover:text-white transition-colors bg-navy-900 px-2.5 py-0.5 rounded border border-navy-800"
              >
                <MapPin className="w-3 h-3 text-electric" />
                <span className="font-semibold">{selectedCity.split('(')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-72 bg-white text-navy-900 rounded-lg shadow-xl border border-warm-200 py-1.5 z-50">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Serving Jogulamba Gadwal Area
                  </div>
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      onClick={() => {
                        setSelectedCity(reg);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-warm-100 flex items-center justify-between ${
                        selectedCity === reg ? 'font-bold text-navy-900 bg-amber-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{reg}</span>
                      {selectedCity === reg && <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Phone / WhatsApp to 9440800487 */}
            <a 
              href={`tel:${STORE_INFO.phone}`} 
              className="flex items-center gap-1.5 hover:text-electric transition-colors font-bold text-amber-300"
            >
              <PhoneCall className="w-3 h-3 text-electric" />
              <span>Call: {STORE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-navy-900 hover:bg-warm-100 rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo - NAVEEN-ELECTRONICS */}
        <div 
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-electric shadow-md group-hover:scale-105 transition-transform border border-navy-700">
            <Zap className="w-6 h-6 fill-electric" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-navy-900">
                NAVEEN<span className="text-amber-500">-ELECTRONICS</span>
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <span>Raghavendra Colony</span>
              <span className="text-slate-300">•</span>
              <span>Jogulamba Gadwal</span>
            </p>
          </div>
        </div>

        {/* Search Bar with live autocomplete */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4 relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search Polycab wire, Goldmedal FRLS, modular switches, fans, MCBs..."
              className="w-full bg-warm-100/80 text-navy-900 placeholder-slate-400 text-sm rounded-xl pl-10 pr-24 py-2.5 border border-warm-200 focus:outline-none focus:ring-2 focus:ring-electric focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-navy-900 hover:bg-navy-800 text-electric text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
            >
              Search
            </button>
          </form>

          {/* Autocomplete Dropdown Preview */}
          {searchFocused && searchQuery.trim().length > 1 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-warm-200 overflow-hidden z-50">
              <div className="p-2 bg-warm-100 text-xs font-semibold text-slate-600 flex justify-between items-center">
                <span>Matching Products ({searchResults.length})</span>
                <span className="text-[10px] text-slate-400">Press Enter for all results</span>
              </div>
              {searchResults.length > 0 ? (
                <div className="divide-y divide-warm-100">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        viewProductDetail(product);
                        setSearchFocused(false);
                      }}
                      className="p-3 hover:bg-amber-50/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-10 h-10 object-cover rounded-lg border border-warm-200" 
                        />
                        <div>
                          <div className="text-xs font-bold text-navy-900 line-clamp-1">{product.name}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2">
                            <span className="font-semibold text-slate-700">{product.brand}</span>
                            <span>•</span>
                            <span className="text-slate-400">{product.subcategory}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-extrabold text-navy-900">
                          ₹{product.indicativePrice.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-500">per {product.unit} (est.)</div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-2.5 bg-warm-100 hover:bg-warm-200 text-xs font-bold text-navy-900 text-center transition-colors block"
                  >
                    View all matching results for "{searchQuery}" →
                  </button>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  No matching products found for "{searchQuery}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons & Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* WhatsApp Direct Action Button */}
          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Naveen%20Electronics,%20I%20want%20to%20enquire%20about%20electrical%20products`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: {STORE_INFO.phone}</span>
          </a>

          {/* Request Quote Button */}
          <button
            onClick={() => navigateTo('rfq')}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-amber-400/20 hover:bg-amber-400/30 text-amber-900 text-xs font-bold rounded-xl border border-amber-300/60 transition-colors"
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Request Quote</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('shop')}
            title="Wishlist"
            className="p-2.5 text-navy-900 hover:bg-warm-100 rounded-xl relative transition-colors"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => navigateTo('cart')}
            className="flex items-center gap-2 px-3 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl shadow-md transition-all group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-electric group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 text-navy-950 text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <div className="text-[10px] text-slate-400 font-medium leading-none">Cart</div>
              <div className="font-bold text-electric">₹{cartSubtotal.toLocaleString('en-IN')}</div>
            </div>
          </button>

          {/* Admin Catalog shortcut */}
          <button
            onClick={() => navigateTo('admin')}
            title="Admin Catalog Manager"
            className="p-2 text-slate-500 hover:text-navy-900 hover:bg-warm-100 rounded-xl transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. Category & Navigation Strip */}
      <div className="hidden md:block bg-warm-100 border-t border-warm-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-semibold">
          {/* Categories mega-menu trigger */}
          <div className="relative" ref={categoriesRef}>
            <button
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              className="flex items-center gap-2 py-2.5 px-3 bg-navy-900 text-white rounded-t-lg font-bold hover:bg-navy-800 transition-colors"
            >
              <Menu className="w-4 h-4 text-electric" />
              <span>Browse All Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-300 transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {categoriesDropdownOpen && (
              <div className="absolute left-0 top-full w-80 bg-white rounded-b-xl shadow-2xl border border-warm-200 py-2 z-50 divide-y divide-warm-100">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      navigateTo('shop', { category: cat.id });
                      setCategoriesDropdownOpen(false);
                    }}
                    className="p-2.5 hover:bg-amber-50/70 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-bold text-navy-900 group-hover:text-amber-600 transition-colors">
                        {cat.name}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {cat.subcategories.slice(0, 3).join(', ')}...
                      </div>
                    </div>
                    <span className="text-[10px] bg-warm-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                      {cat.badge}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Tabs */}
          <nav className="flex items-center gap-1 lg:gap-2 overflow-x-auto py-2 scrollbar-none">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                activePage === 'home' ? 'bg-white text-navy-900 font-bold shadow-sm' : 'text-slate-700 hover:text-navy-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activePage === 'shop' && !categoriesDropdownOpen ? 'bg-white text-navy-900 font-bold shadow-sm' : 'text-slate-700 hover:text-navy-900'
              }`}
            >
              Shop All
            </button>

            {/* Wires & Cables Special Link */}
            <button
              onClick={() => navigateTo('shop', { category: 'wires-cables' })}
              className="px-2.5 py-1 rounded-lg text-amber-900 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors whitespace-nowrap font-bold"
            >
              ⚡ Goldmedal & Polycab Wires
            </button>

            {CATEGORIES.slice(1, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigateTo('shop', { category: cat.id })}
                className="px-2.5 py-1 rounded-lg text-slate-700 hover:text-navy-900 hover:bg-white/80 transition-colors whitespace-nowrap"
              >
                {cat.name.split('&')[0]}
              </button>
            ))}

            <button
              onClick={() => navigateTo('home')}
              className="px-3 py-1 rounded-lg text-amber-700 font-bold hover:bg-amber-100 transition-colors whitespace-nowrap"
            >
              🏠 Shop By Room
            </button>
          </nav>

          {/* Contact and address fast link */}
          <div className="flex items-center gap-3 text-slate-600">
            <button 
              onClick={() => navigateTo('contact')}
              className="hover:text-navy-900 transition-colors font-semibold"
            >
              Raghavendra Colony Store
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-warm-200 px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Polycab, Goldmedal, switches..."
              className="w-full bg-warm-100 text-sm rounded-xl pl-10 pr-20 py-2.5 border border-warm-200 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-navy-900 text-electric text-xs font-bold rounded-lg"
            >
              Search
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => { navigateTo('shop'); setMobileMenuOpen(false); }}
              className="p-2.5 bg-warm-100 rounded-xl text-center text-navy-900"
            >
              🛍️ All Products
            </button>
            <button
              onClick={() => { navigateTo('shop', { category: 'wires-cables' }); setMobileMenuOpen(false); }}
              className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-center text-amber-800"
            >
              ⚡ Polycab & Goldmedal Wires
            </button>
            <button
              onClick={() => { navigateTo('rfq'); setMobileMenuOpen(false); }}
              className="p-2.5 bg-warm-100 rounded-xl text-center text-navy-900"
            >
              📋 Request Quote
            </button>
            <button
              onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
              className="p-2.5 bg-warm-100 rounded-xl text-center text-navy-900"
            >
              📍 Shop Location
            </button>
          </div>

          {/* Shop details */}
          <div className="p-3 bg-navy-950 text-white rounded-xl text-xs space-y-2">
            <div className="font-bold text-electric">NAVEEN-ELECTRONICS</div>
            <p className="text-slate-300 text-[11px]">Raghavendra Colony, Jogulamba Gadwal</p>
            <div className="flex gap-3 text-amber-300 font-bold pt-1">
              <a href={`tel:${STORE_INFO.phone}`}>📞 Call: {STORE_INFO.phone}</a>
              <span>•</span>
              <a href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Naveen%20Electronics`} target="_blank" rel="noreferrer">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
