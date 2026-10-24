import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_INFO } from '../data/categories';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  Calculator, 
  Building2, 
  Sparkles, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Upload, 
  Layers,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export default function RequestQuotePage() {
  const { showToast, navigateTo } = useStore();

  const [projectType, setProjectType] = useState('3bhk-villa');
  const [timeline, setTimeline] = useState('immediate');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Jogulamba Gadwal',
    pincode: '509125',
    tradeRole: 'contractor', // 'homeowner' | 'contractor' | 'electrician' | 'interior'
    notes: '',
  });

  // Checklist of typical items needed (Goldmedal and Polycab only for wires)
  const [selectedItems, setSelectedItems] = useState([
    'Polycab 1.5 sq mm Copper House Wire Coils',
    'Goldmedal 2.5 sq mm FRLS Power Wire Coils',
    'Modular Switch Plates & Concealed Metal Boxes',
    '8-Way / 12-Way Double Door MCB Distribution Board',
    '30mA RCCB Shock Protection & C-Curve MCBs',
    '20mm Heavy Gauge PVC Conduit Pipes & Junction Boxes',
    'LED Slim Panel Downlights & 20W Battens'
  ]);

  const [bomText, setBomText] = useState('');
  const [submittedQuote, setSubmittedQuote] = useState(null);

  const typicalMaterials = [
    'Polycab 1.5 sq mm Copper House Wire Coils',
    'Goldmedal 2.5 sq mm FRLS Power Wire Coils',
    'Polycab 4.0 sq mm AC & Geyser Circuit Wire Coils',
    'Goldmedal 6.0 sq mm Sub-Main Copper Wire Coils',
    'Modular Switch Plates & Concealed Metal Boxes',
    'Modular 6A & 16A Switches and Sockets',
    '8-Way / 12-Way Double Door MCB Distribution Board',
    '30mA RCCB Shock Protection & C-Curve MCBs',
    '20mm Heavy Gauge PVC Conduit Pipes & Junction Boxes',
    '20mm Flexible Corrugated Pipes & Solvent Cement',
    'LED Slim Panel Downlights & 20W Battens',
    '1200mm High Speed / BLDC Ceiling Fans',
    '4kVA Automatic Voltage Stabilizer for AC',
    'Pure Sine Wave Inverter & 150Ah Tubular Battery'
  ];

  const handleToggleItem = (item) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Estimated range calculator based on project type
  const getEstimatedBudget = () => {
    switch (projectType) {
      case '2bhk-flat':
        return { low: 35000, high: 55000, tradeDiscount: '8% - 10%' };
      case '3bhk-villa':
        return { low: 65000, high: 110000, tradeDiscount: '10% - 12%' };
      case 'independent-house':
        return { low: 120000, high: 220000, tradeDiscount: '12% - 15%' };
      case 'commercial':
        return { low: 180000, high: 450000, tradeDiscount: '12% - 18%' };
      case 'renovation':
        return { low: 20000, high: 45000, tradeDiscount: '5% - 8%' };
      default:
        return { low: 50000, high: 90000, tradeDiscount: '10%' };
    }
  };

  const budgetEstimate = getEstimatedBudget();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number so our sales engineers can contact you.');
      return;
    }

    const rfqSummary = {
      id: `RFQ-GDW-${Math.floor(1000 + Math.random() * 9000)}`,
      projectType,
      timeline,
      ...formData,
      selectedItems,
      bomText,
      estimate: budgetEstimate,
      submittedAt: new Date().toLocaleString('en-IN')
    };

    setSubmittedQuote(rfqSummary);
    showToast('Quote request submitted! We will reply on WhatsApp within 30 minutes.', 'success');
  };

  const handleSendToWhatsApp = () => {
    const quote = submittedQuote;
    const text = `*NAVEEN-ELECTRONICS Quote Request (${quote.id})*\n\n*Name:* ${quote.name} (${quote.tradeRole})\n*Phone:* ${quote.phone}\n*Location:* ${quote.city} - ${quote.pincode}\n*Project:* ${quote.projectType}\n\n*Required Materials (Polycab & Goldmedal):*\n${quote.selectedItems.map(i => `• ${i}`).join('\n')}\n\n${quote.bomText ? `*Custom Notes:*\n${quote.bomText}\n\n` : ''}Please send current rates for Raghavendra Colony store delivery.`;
    
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* 1. Header Hero */}
      <div className="bg-gradient-to-br from-navy-950 to-navy-900 text-white rounded-3xl p-8 sm:p-10 border border-navy-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-300/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>NAVEEN-ELECTRONICS • Raghavendra Colony, Gadwal</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          Request a Bulk Electrical Estimate
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Wiring a home or commercial building in Jogulamba Gadwal? Upload your materials list for genuine Polycab & Goldmedal wires, modular switches, and MCB boards at direct trade rates.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-navy-800 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electric" />
            <span>Direct Brand Wholesale</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electric" />
            <span>18% GST Input Invoice</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electric" />
            <span>30-Minute Turnaround</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electric" />
            <span>Jogulamba Gadwal Local Delivery</span>
          </div>
        </div>
      </div>

      {submittedQuote ? (
        /* Submission Success Screen */
        <div className="bg-white rounded-3xl border border-warm-200 shadow-lg p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Quote Logged: {submittedQuote.id}</span>
            <h2 className="text-2xl font-black text-navy-900">Quotation Request Received!</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our trade desk engineers are reviewing your material list. We will send an itemized quote sheet with current copper index discounts.
            </p>
          </div>

          {/* Preliminary Estimate Box */}
          <div className="p-5 bg-warm-50 rounded-2xl border border-warm-200 max-w-lg mx-auto text-left space-y-3">
            <div className="flex items-center justify-between border-b border-warm-200 pb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Estimated Project Bracket</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Eligible for {submittedQuote.estimate.tradeDiscount} Trade Concession
              </span>
            </div>
            <div className="text-2xl font-black text-navy-900 font-mono">
              ₹{submittedQuote.estimate.low.toLocaleString('en-IN')} - ₹{submittedQuote.estimate.high.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 leading-relaxed">
              *Preliminary estimate based on standard 3BHK/Villa material specifications. Final quote will verify exact coil counts, switch modules, and brand selection.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleSendToWhatsApp}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Forward Quote to WhatsApp Trade Counter</span>
            </button>

            <button
              onClick={() => setSubmittedQuote(null)}
              className="px-5 py-3 bg-warm-100 hover:bg-warm-200 text-navy-900 text-xs font-bold rounded-xl transition-colors"
            >
              Submit Another Quote
            </button>
          </div>
        </div>
      ) : (
        /* Form Section */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Details & Items Selection (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-warm-200 shadow-sm p-6 sm:p-8 space-y-8">
            {/* Step 1: Project Type */}
            <div className="space-y-3">
              <label className="text-xs font-black text-navy-900 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-500" />
                <span>1. Select Project Type</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: '2bhk-flat', label: '2BHK Apartment' },
                  { id: '3bhk-villa', label: '3BHK Villa / Flat' },
                  { id: 'independent-house', label: 'Independent Multi-Floor House' },
                  { id: 'commercial', label: 'Commercial Office / Retail' },
                  { id: 'renovation', label: 'Electrical Renovation' },
                  { id: 'maintenance', label: 'Ongoing Maintenance Contract' }
                ].map((type) => (
                  <button
                    type="button"
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      projectType === type.id
                        ? 'border-navy-900 bg-navy-900 text-electric shadow-sm'
                        : 'border-warm-200 bg-warm-50 text-slate-700 hover:bg-warm-100'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Bill of Materials Checklist */}
            <div className="space-y-3 border-t border-warm-200 pt-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-navy-900 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>2. Pick Required Materials</span>
                </label>
                <span className="text-[11px] text-slate-400">Select all that apply</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {typicalMaterials.map((item) => (
                  <label
                    key={item}
                    className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-colors ${
                      selectedItems.includes(item)
                        ? 'border-amber-400 bg-amber-50/60 font-bold text-navy-900'
                        : 'border-warm-200 bg-white text-slate-600 hover:bg-warm-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={() => handleToggleItem(item)}
                      className="rounded border-warm-300 text-navy-900 focus:ring-electric"
                    />
                    <span className="line-clamp-1">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Custom BOM / Architect Drawing Details */}
            <div className="space-y-2 border-t border-warm-200 pt-6 text-xs">
              <label className="font-black text-navy-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>3. Paste Your BOM List or Quantity Details</span>
              </label>
              <textarea
                rows={4}
                value={bomText}
                onChange={(e) => setBomText(e.target.value)}
                placeholder="Paste your quantities or specific brands (e.g. 5 coils Polycab 1.5mm Red, 3 coils 2.5mm, 40 Anchor Roma switches, 8-way Havells DB...)"
                className="w-full bg-warm-50 border border-warm-200 rounded-xl p-3 text-navy-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>

            {/* Step 4: Contact & Site Location */}
            <div className="space-y-4 border-t border-warm-200 pt-6 text-xs">
              <label className="font-black text-navy-900 uppercase tracking-wider block">
                4. Your Contact & Site Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rajesh Gowda"
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">WhatsApp / Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9845012345"
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">You Are A:</label>
                  <select
                    name="tradeRole"
                    value={formData.tradeRole}
                    onChange={handleInputChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-medium"
                  >
                    <option value="contractor">Electrical Contractor (Licensed A/B)</option>
                    <option value="electrician">Independent Electrician</option>
                    <option value="homeowner">Homeowner Constructing / Renovating</option>
                    <option value="interior">Interior Designer / Architect</option>
                    <option value="builder">Builder / Developer</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Delivery PIN Code (Jogulamba Gadwal / Telangana)</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="509125"
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-2.5 font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-navy-900 hover:bg-navy-800 text-electric font-black text-sm rounded-2xl shadow-xl transition-transform active:scale-98 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit for Official Contractor Quotation</span>
            </button>
          </div>

          {/* Right Summary Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-warm-200 shadow-sm p-6 space-y-5 sticky top-28">
              <div className="flex items-center gap-2 border-b border-warm-200 pb-3">
                <Calculator className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-sm text-navy-900 uppercase tracking-wider">
                  Indicative Project Sizing
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500">Selected Scope:</span>
                  <div className="font-extrabold text-navy-900 text-sm capitalize">
                    {projectType.replace('-', ' ')}
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Estimated Material Bracket</span>
                  <div className="text-xl font-black text-navy-900 font-mono">
                    ₹{budgetEstimate.low.toLocaleString('en-IN')} - ₹{budgetEstimate.high.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-emerald-800 font-bold">
                    Eligible for {budgetEstimate.tradeDiscount} wholesale margin
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-slate-500 font-bold">Selected BOM Components:</span>
                  <div className="text-navy-900 font-bold">{selectedItems.length} categories chosen</div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-3">
                <div className="flex items-center gap-2 font-black text-emerald-900">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Prefer WhatsApp Direct?</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Send a photo of your electrical drawing or handwritten list directly to our trade desk.
                </p>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Naveen%20Electronics,%20I%20have%20an%20electrical%20drawing/BOM%20for%20a%20new%20house%20quote%20in%20Jogulamba%20Gadwal`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center rounded-xl text-xs block transition-colors shadow-sm"
                >
                  Send via WhatsApp (+91 {STORE_INFO.phone})
                </a>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
