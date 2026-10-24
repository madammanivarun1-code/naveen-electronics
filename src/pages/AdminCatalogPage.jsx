import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { PRODUCT_IMAGE_MAP } from '../data/productImages';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Download, 
  Upload, 
  Search, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  AlertCircle,
  Eye,
  X
} from 'lucide-react';

export default function AdminCatalogPage() {
  const {
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    resetProductsToDefault,
    updateAllPricesDate,
    viewProductDetail,
    showToast
  } = useStore();

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [batchDate, setBatchDate] = useState(new Date().toISOString().split('T')[0]);

  // Form state for Add/Edit
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    brand: 'Polycab',
    category: 'wires-cables',
    subcategory: 'Copper House Wire',
    sku: '',
    indicativePrice: 100,
    mrp: 140,
    unit: 'piece',
    coilPrice: '',
    coilLength: '',
    stock: 500,
    inStock: true,
    rating: 4.8,
    reviewsCount: 25,
    warranty: '2 Years Manufacturer Warranty',
    lastPriceUpdate: new Date().toISOString().split('T')[0],
    taxPercent: 18,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: '',
    specs: {}
  });

  // Filter products for admin table
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === 'all' || p.category === filterCat;
    return matchesSearch && matchesCat;
  });

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setProductForm({ ...product });
  };

  const handleOpenAdd = () => {
    const defaultNew = {
      id: `prod-${Date.now()}`,
      name: '',
      brand: 'Havells',
      category: 'switches-sockets',
      subcategory: 'Modular Switches',
      sku: `VC-${Math.floor(1000 + Math.random() * 9000)}`,
      indicativePrice: 100,
      mrp: 130,
      unit: 'piece',
      coilPrice: '',
      coilLength: '',
      stock: 100,
      inStock: true,
      rating: 4.9,
      reviewsCount: 10,
      warranty: '2 Years Replacement',
      lastPriceUpdate: new Date().toISOString().split('T')[0],
      taxPercent: 18,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      description: 'High quality electrical grade fitting with ISI certification.',
      specs: { 'Voltage Rating': '240V AC', 'Material': 'Polycarbonate' }
    };
    setProductForm(defaultNew);
    setIsAddModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'indicativePrice' || name === 'mrp' || name === 'stock') ? Number(value) : value
    }));
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.sku) {
      alert('Product name and SKU are required');
      return;
    }

    if (editingProduct) {
      updateProduct(productForm);
      setEditingProduct(null);
    } else {
      addProduct(productForm);
      setIsAddModalOpen(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `naveen_electronics_catalog_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Catalog exported as JSON', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Header & Actions Bar */}
      <div className="bg-white rounded-3xl border border-warm-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>NAVEEN-ELECTRONICS • Raghavendra Colony, Gadwal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-900">
              Product Catalog & Price Manager
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Update selling prices, MRP, stock availability, and verified dates. All wires and cables use Goldmedal and Polycab only.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-electric text-xs font-black rounded-xl shadow transition-transform active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-4 py-2.5 bg-warm-100 hover:bg-warm-200 text-navy-900 text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
              title="Export Catalog JSON"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={resetProductsToDefault}
              className="px-4 py-2.5 bg-warm-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
              title="Reset to default 40+ products"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Catalog</span>
            </button>
          </div>
        </div>

        {/* Batch Price Date Updater */}
        <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              <strong>Batch Update Indicative Price Timestamp:</strong> Stamp all products with current verified date.
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="date"
              value={batchDate}
              onChange={(e) => setBatchDate(e.target.value)}
              className="bg-white border border-warm-200 rounded-xl px-3 py-1.5 text-xs font-mono font-bold"
            />
            <button
              onClick={() => updateAllPricesDate(batchDate)}
              className="px-3 py-1.5 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 transition-colors whitespace-nowrap"
            >
              Stamp All Prices
            </button>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-warm-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, brand, SKU..."
            className="w-full bg-warm-50 border border-warm-200 rounded-xl pl-9 pr-3 py-2 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-electric"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="bg-warm-50 text-navy-900 font-bold rounded-xl px-3 py-2 border border-warm-200 text-xs"
          >
            <option value="all">All Categories ({products.length})</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Catalog Products Table */}
      <div className="bg-white rounded-3xl border border-warm-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-warm-100 text-slate-700 font-bold border-b border-warm-200">
                <th className="py-3 px-4">Item & Image</th>
                <th className="py-3 px-4">Brand & SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Indicative Price</th>
                <th className="py-3 px-4 text-center">Unit</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4 text-center">Price Verified</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-warm-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-warm-200" />
                      <div>
                        <div className="font-extrabold text-navy-900 line-clamp-1">{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{p.warranty}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-navy-900">{p.brand}</div>
                    <div className="font-mono text-[11px] text-slate-500">{p.sku}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-[10px] bg-warm-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {p.subcategory}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-black text-navy-900">
                    ₹{p.indicativePrice.toLocaleString('en-IN')}
                    {p.mrp && <div className="text-[10px] text-slate-400 font-normal line-through">₹{p.mrp}</div>}
                  </td>

                  <td className="py-3 px-4 text-center uppercase font-bold text-slate-600 text-[10px]">
                    {p.unit}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => updateProduct({ ...p, inStock: !p.inStock })}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {p.inStock ? `${p.stock} in stock` : 'Out of stock'}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-500">
                    {p.lastPriceUpdate}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => viewProductDetail(p)}
                        className="p-1.5 text-slate-500 hover:text-navy-900 hover:bg-warm-100 rounded-lg"
                        title="Preview Product"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Edit / Add Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-warm-200 overflow-hidden my-6 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-warm-200 bg-warm-100">
              <h2 className="font-black text-sm text-navy-900 uppercase tracking-wider">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Electrical Product'}
              </h2>
              <button
                onClick={() => { setEditingProduct(null); setIsAddModalOpen(false); }}
                className="p-1.5 text-slate-400 hover:text-navy-900 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-slate-700">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={productForm.name}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Brand Name</label>
                  <input
                    type="text"
                    name="brand"
                    value={productForm.brand}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Model / SKU Code *</label>
                  <input
                    type="text"
                    name="sku"
                    required
                    value={productForm.sku}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-bold"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Subcategory</label>
                  <input
                    type="text"
                    name="subcategory"
                    value={productForm.subcategory}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Indicative Selling Price (₹) *</label>
                  <input
                    type="number"
                    name="indicativePrice"
                    required
                    value={productForm.indicativePrice}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-bold font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">MRP (₹)</label>
                  <input
                    type="number"
                    name="mrp"
                    value={productForm.mrp}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-bold font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Unit (e.g. piece, metre, pack, kit)</label>
                  <input
                    type="text"
                    name="unit"
                    value={productForm.unit}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Stock Count</label>
                  <input
                    type="number"
                    name="stock"
                    value={productForm.stock}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Warranty</label>
                  <input
                    type="text"
                    name="warranty"
                    value={productForm.warranty}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Last Price Update Date</label>
                  <input
                    type="date"
                    name="lastPriceUpdate"
                    value={productForm.lastPriceUpdate}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-bold font-mono"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-slate-700">Product Packshot Graphic</label>
                    <span className="text-[10px] text-slate-400">Custom URL or click verified packshot preset</span>
                  </div>
                  <input
                    type="text"
                    name="image"
                    value={productForm.image}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 text-xs font-mono"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setProductForm(prev => ({ ...prev, image: PRODUCT_IMAGE_MAP['wc-02'] }))}
                      className="px-2 py-1 bg-warm-100 hover:bg-amber-200 text-navy-900 rounded-lg text-[10px] font-bold"
                    >
                      Goldmedal Wire
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductForm(prev => ({ ...prev, image: PRODUCT_IMAGE_MAP['wc-01'] }))}
                      className="px-2 py-1 bg-warm-100 hover:bg-emerald-200 text-navy-900 rounded-lg text-[10px] font-bold"
                    >
                      Polycab Wire
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductForm(prev => ({ ...prev, image: PRODUCT_IMAGE_MAP['ss-01'] }))}
                      className="px-2 py-1 bg-warm-100 hover:bg-slate-200 text-navy-900 rounded-lg text-[10px] font-bold"
                    >
                      Modular Switch
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductForm(prev => ({ ...prev, image: PRODUCT_IMAGE_MAP['ss-02'] }))}
                      className="px-2 py-1 bg-warm-100 hover:bg-slate-200 text-navy-900 rounded-lg text-[10px] font-bold"
                    >
                      6A Socket
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductForm(prev => ({ ...prev, image: PRODUCT_IMAGE_MAP['pd-01'] }))}
                      className="px-2 py-1 bg-warm-100 hover:bg-amber-200 text-navy-900 rounded-lg text-[10px] font-bold"
                    >
                      MCB Breaker
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductForm(prev => ({ ...prev, image: PRODUCT_IMAGE_MAP['fv-01'] }))}
                      className="px-2 py-1 bg-warm-100 hover:bg-blue-200 text-navy-900 rounded-lg text-[10px] font-bold"
                    >
                      1200mm Fan
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductForm(prev => ({ ...prev, image: PRODUCT_IMAGE_MAP['lt-01'] }))}
                      className="px-2 py-1 bg-warm-100 hover:bg-yellow-200 text-navy-900 rounded-lg text-[10px] font-bold"
                    >
                      LED Bulb
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-slate-700">Short Description</label>
                  <textarea
                    rows={2}
                    name="description"
                    value={productForm.description}
                    onChange={handleFormChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={productForm.inStock}
                      onChange={handleFormChange}
                      className="rounded border-warm-300 text-navy-900 focus:ring-electric"
                    />
                    <span className="font-bold text-navy-900">Mark item as Available in Stock</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-warm-200">
                <button
                  type="button"
                  onClick={() => { setEditingProduct(null); setIsAddModalOpen(false); }}
                  className="px-4 py-2 bg-warm-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-navy-900 text-electric rounded-xl font-black shadow"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
