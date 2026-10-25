import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutList, 
  RotateCcw, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Check, 
  Star, 
  ChevronRight, 
  X, 
  Info,
  Zap,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';

export default function ShopPage() {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    searchQuery,
    setSearchQuery,
    addToCart,
    viewProductDetail,
    open3DViewer,
    toggleWishlist,
    wishlist
  } = useStore();

  // Local filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands and units from products
  const availableBrands = useMemo(() => {
    const brandsSet = new Set(products.map(p => p.brand));
    return Array.from(brandsSet).sort();
  }, [products]);

  const availableUnits = useMemo(() => {
    const unitsSet = new Set(products.map(p => p.unit));
    return Array.from(unitsSet).sort();
  }, [products]);

  // Active Category Object
  const currentCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  // Toggle brand selection
  const handleToggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Toggle unit selection
  const handleToggleUnit = (unit) => {
    setSelectedUnits(prev =>
      prev.includes(unit) ? prev.filter(u => u !== unit) : [...prev, unit]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedBrands([]);
    setSelectedUnits([]);
    setInStockOnly(false);
    setMaxPrice(15000);
    setSearchQuery('');
    setSortBy('popular');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // 2. Category
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // 3. Subcategory
      if (selectedSubcategory && product.subcategory !== selectedSubcategory) {
        return false;
      }

      // 4. Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // 5. Unit
      if (selectedUnits.length > 0 && !selectedUnits.includes(product.unit)) {
        return false;
      }

      // 6. In Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // 7. Max Price
      if (product.indicativePrice > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.indicativePrice - b.indicativePrice;
      if (sortBy === 'price-high') return b.indicativePrice - a.indicativePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // default: popular first
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [
    products, 
    searchQuery, 
    selectedCategory, 
    selectedSubcategory, 
    selectedBrands, 
    selectedUnits, 
    inStockOnly, 
    maxPrice, 
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Breadcrumbs & Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="hover:text-navy-900 cursor-pointer" onClick={handleResetFilters}>Catalog</span>
          <ChevronRight className="w-3.5 h-3.5" />
          {currentCategoryObj ? (
            <span className="text-navy-900 font-bold">{currentCategoryObj.name}</span>
          ) : (
            <span className="text-navy-900 font-bold">All Products</span>
          )}
          {selectedSubcategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-600 font-bold">{selectedSubcategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-900">
              {currentCategoryObj ? currentCategoryObj.name : 'NAVEEN-ELECTRONICS Catalog'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Showing {filteredProducts.length} electrical products • Raghavendra Colony, Jogulamba Gadwal
            </p>
          </div>

          {/* Quick Notice */}
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2 max-w-md">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="text-[11px] leading-tight">
              Estimated Prices: Confirm today's live rate with owner (9440800487) before purchase.
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Layout (Filters Sidebar + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-warm-200 shadow-sm sticky top-28">
          <div className="flex items-center justify-between border-b border-warm-200 pb-4">
            <div className="flex items-center gap-2 text-sm font-black text-navy-900 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-amber-500" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-500 hover:text-navy-900 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Categories
            </label>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              <button
                onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                  selectedCategory === null ? 'bg-navy-900 text-electric' : 'text-slate-600 hover:bg-warm-100'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] opacity-70">({products.length})</span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setSelectedSubcategory(null); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id ? 'bg-navy-900 text-electric' : 'text-slate-600 hover:bg-warm-100'
                  }`}
                >
                  <span className="line-clamp-1">{cat.name}</span>
                  <span className="text-[10px] opacity-70">
                    ({products.filter(p => p.category === cat.id).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories (if a category is active) */}
          {currentCategoryObj && (
            <div className="space-y-2 border-t border-warm-200 pt-4">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                Subcategories
              </label>
              <div className="space-y-1">
                {currentCategoryObj.subcategories.map((sub, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSubcategory(selectedSubcategory === sub ? null : sub)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedSubcategory === sub 
                        ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300' 
                        : 'text-slate-600 hover:bg-warm-100'
                    }`}
                  >
                    <span>{sub}</span>
                    {selectedSubcategory === sub && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brand Filter */}
          <div className="space-y-2 border-t border-warm-200 pt-4">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Brands
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {availableBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-xs text-slate-700 hover:text-navy-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleToggleBrand(brand)}
                    className="rounded border-warm-300 text-navy-900 focus:ring-electric"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Max Price Range Slider */}
          <div className="space-y-2 border-t border-warm-200 pt-4">
            <div className="flex items-center justify-between text-xs font-black text-slate-700">
              <span className="uppercase tracking-wider">Max Price</span>
              <span className="font-mono text-navy-900">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={50}
              max={15000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-navy-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹50</span>
              <span>₹15,000+</span>
            </div>
          </div>

          {/* Unit Filter */}
          <div className="space-y-2 border-t border-warm-200 pt-4">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Units
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableUnits.map((unit) => (
                <button
                  key={unit}
                  onClick={() => handleToggleUnit(unit)}
                  className={`px-2 py-1 text-[11px] rounded-lg border font-medium transition-colors ${
                    selectedUnits.includes(unit)
                      ? 'bg-navy-900 text-electric border-navy-900'
                      : 'bg-warm-50 text-slate-600 border-warm-200 hover:bg-warm-100'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="border-t border-warm-200 pt-4">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-warm-300 text-navy-900 focus:ring-electric"
              />
              <span>In Stock Only (Rajajinagar Hub)</span>
            </label>
          </div>
        </aside>

        {/* Main Products Area (3 Columns on Desktop) */}
        <main className="lg:col-span-3 space-y-6">
          {/* Controls Bar (Sort, Search, View Mode, Mobile Filter Toggle) */}
          <div className="bg-white p-4 rounded-2xl border border-warm-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden w-full sm:w-auto px-4 py-2 bg-warm-100 hover:bg-warm-200 text-navy-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4 text-amber-500" />
              <span>Filters & Categories</span>
            </button>

            {/* Active Filters Badges */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-navy-900 text-electric text-[11px] font-bold rounded-lg">
                  <span>{currentCategoryObj?.name}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory(null)} />
                </span>
              )}

              {selectedSubcategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-900 text-[11px] font-bold rounded-lg">
                  <span>{selectedSubcategory}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSubcategory(null)} />
                </span>
              )}

              {selectedBrands.map(b => (
                <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 bg-warm-100 text-navy-900 text-[11px] font-bold rounded-lg">
                  <span>{b}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleToggleBrand(b)} />
                </span>
              ))}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-warm-100 text-navy-900 text-[11px] font-bold rounded-lg">
                  <span>"{searchQuery}"</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}

              {(selectedCategory || selectedSubcategory || selectedBrands.length > 0 || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-red-500 hover:underline font-bold ml-1"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Right: Sort & View Toggle */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {/* Sort selector */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-warm-100 text-navy-900 font-bold rounded-xl px-2.5 py-1.5 border border-warm-200 focus:outline-none text-xs"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A to Z</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="hidden sm:flex items-center bg-warm-100 rounded-xl p-1 border border-warm-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-400 hover:text-navy-900'
                  }`}
                  title="Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-400 hover:text-navy-900'
                  }`}
                  title="List View"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filter Modal/Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden p-5 bg-white rounded-2xl border border-warm-200 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-black text-sm text-navy-900">Filters & Options</span>
                <button onClick={() => setMobileFilterOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value || null);
                    setSelectedSubcategory(null);
                  }}
                  className="w-full bg-warm-100 text-xs font-semibold p-2 rounded-xl border border-warm-200"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Brands */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Brand</label>
                <div className="flex flex-wrap gap-1.5">
                  {availableBrands.map(b => (
                    <button
                      key={b}
                      onClick={() => handleToggleBrand(b)}
                      className={`px-2 py-1 text-[11px] rounded-lg border ${
                        selectedBrands.includes(b) ? 'bg-navy-900 text-electric' : 'bg-warm-50 text-slate-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => { handleResetFilters(); setMobileFilterOpen(false); }}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 bg-warm-100 rounded-xl"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2 text-xs font-black text-navy-950 bg-electric rounded-xl"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
            </div>
          )}

          {/* Product Listing */}
          {filteredProducts.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl border border-warm-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all p-4 group flex ${
                    viewMode === 'grid' ? 'flex-col justify-between' : 'flex-col sm:flex-row gap-5 items-center justify-between'
                  }`}
                >
                  {/* Image & Header */}
                  <div className={`space-y-3 ${viewMode === 'list' ? 'flex items-center gap-4 flex-1' : ''}`}>
                    <div 
                      onClick={() => viewProductDetail(product)}
                      className={`relative rounded-xl overflow-hidden bg-warm-100 cursor-pointer ${
                        viewMode === 'grid' ? 'aspect-square w-full' : 'w-24 h-24 flex-shrink-0'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-2 left-2 bg-navy-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {product.brand}
                      </span>
                      {product.inStock ? (
                        <span className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          In Stock
                        </span>
                      ) : (
                        <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Pre-Order
                        </span>
                      )}
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

                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                        {product.subcategory}
                      </div>

                      <h3
                        onClick={() => viewProductDetail(product)}
                        className="text-xs sm:text-sm font-black text-navy-900 hover:text-amber-600 cursor-pointer line-clamp-2 mt-0.5"
                      >
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 hidden sm:block">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                        <span className="bg-amber-400/20 text-navy-950 font-bold px-1.5 py-0.5 rounded">
                          ⭐ {product.rating}
                        </span>
                        <span>({product.reviewsCount})</span>
                        <span>•</span>
                        <span className="font-mono">{product.sku}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Actions */}
                  <div className={`pt-3 border-t border-warm-100 space-y-3 ${
                    viewMode === 'grid' ? 'w-full' : 'sm:w-48 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0'
                  }`}>
                    <div className="flex sm:flex-col sm:items-start justify-between items-baseline">
                      <div>
                        <div className="text-base sm:text-lg font-black text-navy-900">
                          ₹{product.indicativePrice.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Estimate / per {product.unit}
                        </div>
                      </div>

                      {product.mrp && (
                        <div className="text-right sm:text-left mt-0.5">
                          <span className="text-xs text-slate-400 line-through">MRP ₹{product.mrp}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => viewProductDetail(product)}
                        className="py-2 text-xs font-bold text-navy-900 bg-warm-100 hover:bg-warm-200 rounded-xl transition-colors text-center"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="py-2 text-xs font-black text-navy-950 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors text-center flex items-center justify-center gap-1 shadow-sm"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-warm-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-warm-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-navy-900">No products match your filter</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We could not find any products matching your current filters. Try relaxing the search keywords or resetting filters.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-navy-900 text-electric text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
