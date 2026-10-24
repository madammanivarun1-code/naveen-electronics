import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_INFO } from '../data/categories';
import { 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  FileText, 
  CheckCircle2, 
  QrCode, 
  CreditCard, 
  Banknote, 
  Building,
  Info,
  ChevronLeft,
  Percent,
  Check,
  Smartphone,
  Lock,
  Copy,
  AlertCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    estimatedTax,
    deliveryCharge,
    cartGrandTotal,
    freeShippingThreshold,
    navigateTo,
    placeOrder
  } = useStore();

  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Address & GST, 3: Payment
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Address Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    pincode: '509125',
    city: 'Jogulamba Gadwal',
    state: 'Telangana',
    isContractor: false,
    companyName: '',
    gstin: '',
    deliveryNotes: '',
    paymentMethod: 'upi' // 'upi' | 'card' | 'netbanking' | 'cod' | 'neft'
  });

  const [formErrors, setFormErrors] = useState({});

  // -----------------------------------------------------------
  // INTERACTIVE PAYMENT STATES
  // -----------------------------------------------------------
  // Card Details State
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    cardType: 'RuPay'
  });

  // UPI State
  const [upiData, setUpiData] = useState({
    vpa: '',
    utr: '',
    selectedApp: 'gpay'
  });

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('sbi');

  // Payment Processing Modal State
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(120);
  const [copiedBankText, setCopiedBankText] = useState('');

  // Auto-detect Card Type & Format Card Number
  const handleCardNumberChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    
    let type = 'RuPay';
    if (/^4/.test(raw)) type = 'Visa';
    else if (/^5[1-5]/.test(raw)) type = 'Mastercard';
    else if (/^6(0|5)/.test(raw)) type = 'RuPay';

    setCardData(prev => ({
      ...prev,
      number: formatted,
      cardType: type
    }));
  };

  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    let formatted = raw;
    if (raw.length >= 2) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2, 4)}`;
    }
    setCardData(prev => ({ ...prev, expiry: formatted }));
  };

  // Coupon handling
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'ELECTRO10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedDiscount(discount);
    } else if (couponCode.toUpperCase() === 'CONTRACTOR5') {
      const discount = Math.round(cartSubtotal * 0.05);
      setAppliedDiscount(discount);
    } else {
      alert('Invalid coupon. Try "ELECTRO10" or "CONTRACTOR5"');
    }
  };

  const finalTotal = Math.max(0, cartGrandTotal - appliedDiscount);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep2 = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid 10-digit mobile number required';
    if (!formData.address.trim()) errors.address = 'Site delivery address is required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) errors.pincode = 'Valid 6-digit PIN code required';
    if (formData.isContractor && formData.gstin && formData.gstin.length !== 15) {
      errors.gstin = 'Valid 15-character GSTIN required (e.g. 36AAAAA0000A1Z5)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (validateStep2()) {
      setCheckoutStep(3);
    }
  };

  // Copy helper for NEFT bank details
  const handleCopyText = (text, label) => {
    navigator.clipboard?.writeText(text);
    setCopiedBankText(label);
    setTimeout(() => setCopiedBankText(''), 2500);
  };

  // Trigger Payment Submission Flow
  const handleInitiatePayment = () => {
    const method = formData.paymentMethod;

    if (method === 'card') {
      if (!cardData.number || cardData.number.replace(/\s/g, '').length < 16) {
        alert('Please enter a valid 16-digit card number.');
        return;
      }
      if (!cardData.expiry || cardData.expiry.length < 5) {
        alert('Please enter card expiry date (MM/YY).');
        return;
      }
      if (!cardData.cvv || cardData.cvv.length < 3) {
        alert('Please enter 3-digit CVV.');
        return;
      }
      // Open 3D Secure OTP verification modal
      setEnteredOtp('');
      setIsOtpModalOpen(true);
      return;
    }

    if (method === 'upi') {
      executePaymentSuccess({
        paymentStatus: 'PAID',
        paymentMethodName: 'UPI Instant Transfer',
        paymentSubtype: upiData.selectedApp.toUpperCase(),
        transactionId: upiData.utr.trim() || `UPI${Date.now().toString().slice(-8)}${Math.floor(1000 + Math.random() * 9000)}`,
        vpa: upiData.vpa || '9440800487@ybl'
      });
      return;
    }

    if (method === 'netbanking') {
      executePaymentSuccess({
        paymentStatus: 'PAID',
        paymentMethodName: 'Net Banking Direct Debit',
        paymentSubtype: selectedBank.toUpperCase(),
        transactionId: `NB${Date.now().toString().slice(-8)}${Math.floor(1000 + Math.random() * 9000)}`,
        bank: selectedBank
      });
      return;
    }

    if (method === 'cod') {
      executePaymentSuccess({
        paymentStatus: 'PENDING_COD',
        paymentMethodName: 'Cash on Site Delivery',
        paymentSubtype: 'COD (Raghavendra Colony / Gadwal)',
        transactionId: `COD-VERIFIED-${Date.now().toString().slice(-6)}`
      });
      return;
    }

    if (method === 'neft') {
      executePaymentSuccess({
        paymentStatus: 'PROFORMA_PENDING_RTGS',
        paymentMethodName: 'Contractor RTGS / NEFT Proforma Transfer',
        paymentSubtype: 'State Bank of India (Gadwal Branch)',
        transactionId: `PROFORMA-NEFT-${Date.now().toString().slice(-6)}`
      });
    }
  };

  // 3D-Secure Card OTP Submission
  const handleVerifyOtpAndPay = (e) => {
    e.preventDefault();
    if (!enteredOtp || enteredOtp.length < 4) {
      alert('Please enter the 6-digit OTP sent to your phone (Use test OTP: 123456).');
      return;
    }
    setIsOtpModalOpen(false);
    executePaymentSuccess({
      paymentStatus: 'PAID',
      paymentMethodName: `${cardData.cardType} Credit/Debit Card`,
      paymentSubtype: `Ending with ${cardData.number.slice(-4)}`,
      transactionId: `TXN${Date.now().toString().slice(-8)}${Math.floor(1000 + Math.random() * 9000)}`,
      authCode: `AUTH${Math.floor(100000 + Math.random() * 900000)}`
    });
  };

  // Simulated Gateway Execution Spinner
  const executePaymentSuccess = (paymentMeta) => {
    setIsProcessingPayment(true);
    setProcessingStatus('Connecting securely to payment gateway (256-bit SSL)...');

    setTimeout(() => {
      setProcessingStatus('Authorizing payment with bank & NPCI...');
    }, 800);

    setTimeout(() => {
      setProcessingStatus('Payment verified successfully! Generating official tax receipt...');
    }, 1600);

    setTimeout(() => {
      setIsProcessingPayment(false);
      placeOrder({
        customer: formData,
        subtotal: cartSubtotal,
        tax: estimatedTax,
        shipping: deliveryCharge,
        discount: appliedDiscount,
        grandTotal: finalTotal,
        paymentMethod: formData.paymentMethod,
        paymentStatus: paymentMeta.paymentStatus,
        paymentMeta: paymentMeta,
        transactionId: paymentMeta.transactionId,
        paymentDate: new Date().toISOString()
      });
    }, 2400);
  };

  // Empty cart screen
  if (cart.length === 0 && checkoutStep === 1) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-warm-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-navy-900">Your electrical cart is empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Browse our genuine Polycab & Goldmedal copper wires, modular switches, fans, and protection components.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-navy-900 text-electric font-black rounded-xl text-xs hover:bg-navy-800 shadow-md inline-flex items-center gap-2"
        >
          <span>Browse Electrical Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* 1. Checkout Step Progress Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <button
            onClick={() => setCheckoutStep(1)}
            className={`flex items-center gap-2 ${checkoutStep >= 1 ? 'text-navy-900 font-black' : ''}`}
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
              checkoutStep >= 1 ? 'bg-navy-900 text-electric shadow-sm' : 'bg-warm-200 text-slate-600'
            }`}>
              1
            </span>
            <span>Cart Items ({cart.length})</span>
          </button>

          <div className={`h-0.5 flex-1 mx-4 transition-colors ${checkoutStep >= 2 ? 'bg-navy-900' : 'bg-warm-200'}`} />

          <button
            onClick={() => checkoutStep > 2 && setCheckoutStep(2)}
            className={`flex items-center gap-2 ${checkoutStep >= 2 ? 'text-navy-900 font-black' : ''}`}
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
              checkoutStep >= 2 ? 'bg-navy-900 text-electric shadow-sm' : 'bg-warm-200 text-slate-600'
            }`}>
              2
            </span>
            <span>Delivery & GST</span>
          </button>

          <div className={`h-0.5 flex-1 mx-4 transition-colors ${checkoutStep >= 3 ? 'bg-navy-900' : 'bg-warm-200'}`} />

          <div className={`flex items-center gap-2 ${checkoutStep >= 3 ? 'text-navy-900 font-black' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
              checkoutStep >= 3 ? 'bg-navy-900 text-electric shadow-sm' : 'bg-warm-200 text-slate-600'
            }`}>
              3
            </span>
            <span>Payment & Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Dynamic Step Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: CART ITEMS */}
          {checkoutStep === 1 && (
            <div className="bg-white rounded-3xl border border-warm-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-warm-200 pb-4">
                <div>
                  <h2 className="text-xl font-black text-navy-900">Electrical Order Items</h2>
                  <p className="text-xs text-slate-500">Confirm wire lengths, quantities, and coil packs before checkout.</p>
                </div>
                <button
                  onClick={clearCart}
                  className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              {/* Items Table */}
              <div className="divide-y divide-warm-100">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-warm-50 border border-warm-200 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold bg-navy-900/90 text-white px-2 py-0.5 rounded">
                          {item.brand}
                        </span>
                        <h4 className="text-xs font-black text-navy-900 line-clamp-1">{item.name}</h4>
                        <div className="text-[11px] text-slate-500">
                          ₹{item.price.toLocaleString('en-IN')} per {item.unit} (est.)
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls & item total */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 self-end sm:self-center">
                      <div className="flex items-center border border-warm-200 rounded-xl bg-warm-50 overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-warm-200 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-mono font-bold text-navy-900 min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-warm-200 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[5rem]">
                        <div className="text-sm font-black text-navy-900 font-mono">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-400">Total</div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-lg"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery info & Continue */}
              <div className="pt-4 border-t border-warm-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Local trade pickup at Raghavendra Colony or same-day local delivery across Jogulamba Gadwal.</span>
                </div>

                <button
                  onClick={() => setCheckoutStep(2)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-electric font-black rounded-xl text-xs shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Delivery Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ADDRESS & GST DETAILS */}
          {checkoutStep === 2 && (
            <div className="bg-white rounded-3xl border border-warm-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-warm-200 pb-4">
                <div>
                  <h2 className="text-xl font-black text-navy-900">Delivery Address & Site Details</h2>
                  <p className="text-xs text-slate-500">Provide site address in Jogulamba Gadwal or surrounding areas.</p>
                </div>
                <button
                  onClick={() => setCheckoutStep(1)}
                  className="text-xs text-navy-900 hover:text-amber-600 font-bold flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back to Cart</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Full Name / Primary Contact *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Ramesh Kumar"
                    className={`w-full bg-warm-50 border rounded-xl p-3 font-medium focus:outline-none focus:ring-2 focus:ring-electric ${
                      formErrors.fullName ? 'border-red-500' : 'border-warm-200'
                    }`}
                  />
                  {formErrors.fullName && <p className="text-[10px] text-red-500">{formErrors.fullName}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={`w-full bg-warm-50 border rounded-xl p-3 font-medium focus:outline-none focus:ring-2 focus:ring-electric ${
                      formErrors.phone ? 'border-red-500' : 'border-warm-200'
                    }`}
                  />
                  {formErrors.phone && <p className="text-[10px] text-red-500">{formErrors.phone}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email Address (for GST invoice PDF)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ramesh@example.com"
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-3 font-medium focus:outline-none focus:ring-2 focus:ring-electric"
                  />
                </div>

                {/* PIN Code */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Delivery PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="509125"
                    className={`w-full bg-warm-50 border rounded-xl p-3 font-medium focus:outline-none focus:ring-2 focus:ring-electric ${
                      formErrors.pincode ? 'border-red-500' : 'border-warm-200'
                    }`}
                  />
                  {formErrors.pincode && <p className="text-[10px] text-red-500">{formErrors.pincode}</p>}
                </div>

                {/* Full Address */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-slate-700">Site / Building / House Delivery Address *</label>
                  <textarea
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Plot No, Colony / Street Name, Landmark (e.g., Near Ragavendra Swamy Temple, Jogulamba Gadwal)"
                    className={`w-full bg-warm-50 border rounded-xl p-3 font-medium focus:outline-none focus:ring-2 focus:ring-electric ${
                      formErrors.address ? 'border-red-500' : 'border-warm-200'
                    }`}
                  />
                  {formErrors.address && <p className="text-[10px] text-red-500">{formErrors.address}</p>}
                </div>

                {/* City & State */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">City / Town</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-3 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-warm-50 border border-warm-200 rounded-xl p-3 font-medium"
                  />
                </div>

                {/* Contractor Toggle */}
                <div className="sm:col-span-2 pt-2 border-t border-warm-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isContractor"
                      checked={formData.isContractor}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded text-navy-900 focus:ring-electric"
                    />
                    <span className="font-bold text-navy-900">
                      I am a Contractor / Electrician / Business (Need B2B Tax Invoice with Input Credit)
                    </span>
                  </label>
                </div>

                {formData.isContractor && (
                  <>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Company / Trade Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Sri Balaji Electrical Contractors"
                        className="w-full bg-warm-50 border border-warm-200 rounded-xl p-3 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">15-Digit GSTIN Number</label>
                      <input
                        type="text"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleInputChange}
                        placeholder="36AAAAA0000A1Z5"
                        className="w-full bg-warm-50 border border-warm-200 rounded-xl p-3 font-mono uppercase"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                <button
                  onClick={() => setCheckoutStep(1)}
                  className="text-xs font-bold text-navy-900 hover:text-amber-600 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Cart</span>
                </button>

                <button
                  onClick={handleProceedToPayment}
                  className="px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-electric text-xs font-black rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & CONFIRMATION */}
          {checkoutStep === 3 && (
            <div className="bg-white rounded-3xl border border-warm-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-warm-200 pb-4">
                <div>
                  <h2 className="text-xl font-black text-navy-900">Select Payment Method</h2>
                  <p className="text-xs text-slate-500">Secure 256-bit encrypted checkout with instant receipt generation.</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Secure Gateway</span>
                </div>
              </div>

              {/* Payment Methods Options */}
              <div className="space-y-4">
                {/* 1. UPI Direct (QR & Intent Apps) */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  formData.paymentMethod === 'upi'
                    ? 'border-navy-900 bg-amber-50/30 shadow-md ring-1 ring-navy-900'
                    : 'border-warm-200 hover:bg-warm-50 cursor-pointer'
                }`}>
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="mt-1 text-navy-900"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-navy-900 flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-emerald-600" />
                          <span>Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        </span>
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          Recommended • Instant Dispatch
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Scan the dynamic UPI QR or click below to launch your preferred UPI app on your mobile device.
                      </p>
                    </div>
                  </label>

                  {formData.paymentMethod === 'upi' && (
                    <div className="mt-4 pt-4 border-t border-warm-200 space-y-4">
                      {/* Live UPI QR & Store VPA */}
                      <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-2xl border border-warm-200 shadow-sm">
                        <div className="flex flex-col items-center justify-center p-3 bg-navy-900 text-white rounded-2xl border border-navy-700 text-center w-36 h-36 flex-shrink-0">
                          {/* SVG QR Code Simulation */}
                          <svg className="w-24 h-24 text-electric" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M40,30 h10 v10 h-10 z M30,40 h10 v10 h-10 z M50,40 h10 v10 h-10 z M70,40 h10 v10 h-10 z M40,60 h10 v10 h-10 z M60,60 h10 v10 h-10 z M80,60 h10 v10 h-10 z M50,80 h10 v10 h-10 z M70,80 h10 v10 h-10 z M90,80 h10 v10 h-10 z"/>
                          </svg>
                          <span className="text-[9px] font-mono text-amber-300 font-bold mt-1">₹{finalTotal.toLocaleString('en-IN')} READY</span>
                        </div>

                        <div className="space-y-2 flex-1 text-xs">
                          <div className="font-bold text-navy-900 text-sm">Naveen Electronics Trade Account</div>
                          <div className="font-mono bg-warm-100 px-3 py-2 rounded-xl text-navy-950 font-black text-xs flex items-center justify-between">
                            <span>VPA: 9440800487@ybl</span>
                            <button
                              type="button"
                              onClick={() => handleCopyText('9440800487@ybl', 'VPA')}
                              className="text-amber-600 hover:text-amber-800 text-[10px] font-bold flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedBankText === 'VPA' ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Verified Store Name: <strong>NAVEEN ELECTRONICS</strong> (Raghavendra Colony, Gadwal)
                          </div>
                        </div>
                      </div>

                      {/* 1-Click App Intent Buttons */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                          Or Pay directly using your installed UPI App:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'gpay', name: 'Google Pay', color: 'border-blue-400 bg-blue-50 text-blue-900' },
                            { id: 'phonepe', name: 'PhonePe', color: 'border-purple-400 bg-purple-50 text-purple-900' },
                            { id: 'paytm', name: 'Paytm UPI', color: 'border-sky-400 bg-sky-50 text-sky-900' },
                            { id: 'bhim', name: 'BHIM UPI', color: 'border-emerald-400 bg-emerald-50 text-emerald-900' }
                          ].map(app => (
                            <button
                              key={app.id}
                              type="button"
                              onClick={() => setUpiData(prev => ({ ...prev, selectedApp: app.id }))}
                              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                upiData.selectedApp === app.id
                                  ? 'border-navy-900 bg-navy-900 text-white shadow-sm'
                                  : `${app.color} hover:opacity-90`
                              }`}
                            >
                              <Smartphone className="w-3.5 h-3.5" />
                              <span>{app.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Optional UTR / Reference Input */}
                      <div className="space-y-1 bg-warm-50 p-3 rounded-xl border border-warm-200">
                        <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                          <span>UPI Transaction UTR / Ref Number (Optional for manual log):</span>
                          <span className="text-[10px] text-slate-400">12 digits from receipt</span>
                        </label>
                        <input
                          type="text"
                          value={upiData.utr}
                          onChange={(e) => setUpiData(prev => ({ ...prev, utr: e.target.value }))}
                          placeholder="e.g. 429810487192"
                          maxLength={16}
                          className="w-full bg-white border border-warm-200 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Credit Card / Debit Card (RuPay, Visa, Mastercard) */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-navy-900 bg-amber-50/30 shadow-md ring-1 ring-navy-900'
                    : 'border-warm-200 hover:bg-warm-50 cursor-pointer'
                }`}>
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="mt-1 text-navy-900"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-navy-900 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span>Credit Card / Debit Card (RuPay, Visa, Mastercard)</span>
                        </span>
                        <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          RuPay Zero MDR Supported
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Pay securely with your domestic or international credit/debit card with 3D Secure OTP verification.
                      </p>
                    </div>
                  </label>

                  {formData.paymentMethod === 'card' && (
                    <div className="mt-4 pt-4 border-t border-warm-200 space-y-4">
                      {/* Realistic Card Preview */}
                      <div className="max-w-sm mx-auto bg-gradient-to-tr from-navy-950 via-navy-900 to-slate-800 text-white p-5 rounded-2xl shadow-xl border border-navy-700 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono tracking-widest text-electric font-bold">NAVEEN ELECTRONICS SECURE</span>
                          <span className="px-2 py-0.5 bg-electric text-navy-950 font-black text-[10px] rounded uppercase">
                            {cardData.cardType}
                          </span>
                        </div>
                        <div className="w-10 h-7 bg-amber-400/80 rounded-md border border-amber-300"></div>
                        <div className="font-mono text-base tracking-widest font-black">
                          {cardData.number || '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex justify-between items-end text-[10px]">
                          <div>
                            <span className="text-slate-400 block text-[8px] uppercase">Cardholder</span>
                            <span className="font-bold tracking-wider uppercase">{cardData.name || formData.fullName || 'CARD HOLDER'}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[8px] uppercase">Expires</span>
                            <span className="font-mono font-bold">{cardData.expiry || 'MM/YY'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Input Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="sm:col-span-2 space-y-1">
                          <label className="font-bold text-slate-700">Card Number *</label>
                          <input
                            type="text"
                            value={cardData.number}
                            onChange={handleCardNumberChange}
                            placeholder="4532 0000 0000 0000"
                            maxLength={19}
                            className="w-full bg-white border border-warm-200 rounded-xl p-2.5 font-mono font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-700">Cardholder Name *</label>
                          <input
                            type="text"
                            value={cardData.name}
                            onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Name as on card"
                            className="w-full bg-white border border-warm-200 rounded-xl p-2.5 font-bold uppercase"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Expiry *</label>
                            <input
                              type="text"
                              value={cardData.expiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full bg-white border border-warm-200 rounded-xl p-2.5 font-mono text-center font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">CVV *</label>
                            <input
                              type="password"
                              value={cardData.cvv}
                              onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                              placeholder="123"
                              maxLength={4}
                              className="w-full bg-white border border-warm-200 rounded-xl p-2.5 font-mono text-center font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Net Banking */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  formData.paymentMethod === 'netbanking'
                    ? 'border-navy-900 bg-amber-50/30 shadow-md ring-1 ring-navy-900'
                    : 'border-warm-200 hover:bg-warm-50 cursor-pointer'
                }`}>
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={handleInputChange}
                      className="mt-1 text-navy-900"
                    />
                    <div className="flex-1 space-y-1">
                      <span className="text-xs font-black text-navy-900 flex items-center gap-2">
                        <Building className="w-4 h-4 text-purple-600" />
                        <span>Net Banking (SBI, APGB, Telangana Grameena, HDFC, ICICI)</span>
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Direct debit from all major Indian and regional Grameena banks serving Jogulamba Gadwal.
                      </p>
                    </div>
                  </label>

                  {formData.paymentMethod === 'netbanking' && (
                    <div className="mt-4 pt-4 border-t border-warm-200 space-y-3">
                      <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                        Select Your Bank:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'sbi', name: 'State Bank of India', code: 'SBI' },
                          { id: 'apgb', name: 'Andhra Pragathi (APGB)', code: 'APGB' },
                          { id: 'tgb', name: 'Telangana Grameena', code: 'TGB' },
                          { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC' },
                          { id: 'icici', name: 'ICICI Bank', code: 'ICICI' },
                          { id: 'axis', name: 'Axis Bank', code: 'AXIS' },
                          { id: 'union', name: 'Union Bank of India', code: 'UBI' },
                          { id: 'canara', name: 'Canara Bank', code: 'CNRB' }
                        ].map(bank => (
                          <button
                            key={bank.id}
                            type="button"
                            onClick={() => setSelectedBank(bank.id)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                              selectedBank === bank.id
                                ? 'border-navy-900 bg-navy-900 text-electric shadow-sm'
                                : 'border-warm-200 bg-white text-slate-700 hover:bg-warm-100'
                            }`}
                          >
                            <div className="text-[10px] opacity-70 font-mono">{bank.code}</div>
                            <div className="font-extrabold line-clamp-1">{bank.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Cash on Delivery / Pay on Site */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-navy-900 bg-amber-50/30 shadow-md ring-1 ring-navy-900'
                    : 'border-warm-200 hover:bg-warm-50 cursor-pointer'
                }`}>
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mt-1 text-navy-900"
                    />
                    <div className="flex-1 space-y-1">
                      <span className="text-xs font-black text-navy-900 flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-amber-600" />
                        <span>Cash on Delivery (COD) / Pay on Site at Raghavendra Colony or Gadwal</span>
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Inspect genuine Polycab & Goldmedal wire packaging, seals, and switch boxes before paying cash or driver UPI.
                      </p>
                    </div>
                  </label>
                </div>

                {/* 5. Contractor NEFT / RTGS (Proforma Invoice) */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  formData.paymentMethod === 'neft'
                    ? 'border-navy-900 bg-amber-50/30 shadow-md ring-1 ring-navy-900'
                    : 'border-warm-200 hover:bg-warm-50 cursor-pointer'
                }`}>
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="neft"
                      checked={formData.paymentMethod === 'neft'}
                      onChange={handleInputChange}
                      className="mt-1 text-navy-900"
                    />
                    <div className="flex-1 space-y-1">
                      <span className="text-xs font-black text-navy-900 flex items-center gap-2">
                        <Building className="w-4 h-4 text-purple-600" />
                        <span>Contractor NEFT / RTGS Bank Transfer (Proforma Invoice)</span>
                      </span>
                      <p className="text-[11px] text-slate-500">
                        For bulk construction wiring reels, coils, and corporate accounts. Direct transfer to Naveen Electronics SBI Current Account.
                      </p>
                    </div>
                  </label>

                  {formData.paymentMethod === 'neft' && (
                    <div className="mt-4 pt-4 border-t border-warm-200 space-y-3 bg-white p-4 rounded-xl border border-warm-200 text-xs">
                      <div className="font-bold text-navy-900 text-sm">Official Bank Account for RTGS / NEFT:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                        <div className="bg-warm-50 p-2.5 rounded-lg border">
                          <span className="text-slate-400 text-[10px] block">A/C Name:</span>
                          <span className="font-bold text-navy-900">NAVEEN ELECTRONICS</span>
                        </div>
                        <div className="bg-warm-50 p-2.5 rounded-lg border">
                          <span className="text-slate-400 text-[10px] block">A/C Number:</span>
                          <span className="font-mono font-bold text-navy-900">394408004871</span>
                        </div>
                        <div className="bg-warm-50 p-2.5 rounded-lg border">
                          <span className="text-slate-400 text-[10px] block">Bank & Branch:</span>
                          <span className="font-bold text-navy-900">State Bank of India (Gadwal Branch)</span>
                        </div>
                        <div className="bg-warm-50 p-2.5 rounded-lg border">
                          <span className="text-slate-400 text-[10px] block">IFSC Code:</span>
                          <span className="font-mono font-bold text-navy-900">SBIN0020188</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-emerald-800 font-bold">
                        A downloadable Proforma Invoice with GSTIN 36AAECN8921B1Z9 will be generated immediately for your accounts department.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Address Summary Review */}
              <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200 text-xs space-y-1">
                <div className="font-bold text-navy-900 flex items-center justify-between">
                  <span>Delivering to: {formData.fullName} ({formData.phone})</span>
                  <button onClick={() => setCheckoutStep(2)} className="text-amber-600 hover:underline">Edit</button>
                </div>
                <div className="text-slate-600">{formData.address}, {formData.city} - {formData.pincode}</div>
                {formData.gstin && (
                  <div className="text-[11px] font-mono text-emerald-800 font-bold">GSTIN: {formData.gstin}</div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                <button
                  onClick={() => setCheckoutStep(2)}
                  className="text-xs font-bold text-navy-900 hover:text-amber-600 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Address</span>
                </button>

                <button
                  onClick={handleInitiatePayment}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {formData.paymentMethod === 'cod' ? 'Confirm Order' : `Pay Now (₹${finalTotal.toLocaleString('en-IN')})`}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-warm-200 shadow-sm p-6 space-y-5 sticky top-28">
            <h3 className="text-sm font-black text-navy-900 uppercase tracking-wider border-b border-warm-200 pb-3">
              Order Financial Summary
            </h3>

            {/* Price lines */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} units)</span>
                <span className="font-bold font-mono text-navy-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Estimated 18% GST (Tax breakdown)</span>
                <span className="font-bold font-mono text-navy-900">₹{estimatedTax.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Van Delivery (Jogulamba Gadwal Hub)</span>
                <span className="font-bold font-mono">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount Applied</span>
                  <span className="font-mono">-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-3 border-t border-warm-200 flex justify-between items-baseline">
                <span className="text-sm font-black text-navy-900">Grand Total (INR)</span>
                <span className="text-2xl font-black text-navy-900 font-mono text-emerald-700">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5 pt-2">
              <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                <Percent className="w-3 h-3 text-amber-500" />
                <span>Trade Coupon / Voucher Code</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="ELECTRO10"
                  className="flex-1 bg-warm-50 border border-warm-200 rounded-xl px-3 py-2 text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-electric"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-navy-900 text-electric text-xs font-bold rounded-xl hover:bg-navy-800"
                >
                  Apply
                </button>
              </div>
              <p className="text-[10px] text-slate-400">Use "ELECTRO10" for 10% off on your first home wiring order.</p>
            </form>

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-warm-200 space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Genuine Polycab & Goldmedal copper wires</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Official Tax Invoice with NAVEEN-ELECTRONICS GSTIN</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>7-Day Replacement for manufacturing faults</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------- */}
      {/* 3D-SECURE BANK OTP VERIFICATION MODAL */}
      {/* -------------------------------------------------------- */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-warm-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                  3D
                </div>
                <div>
                  <h3 className="text-sm font-black text-navy-900">Bank 3D Secure Verification</h3>
                  <p className="text-[10px] text-slate-500">Verified by RuPay / Visa / Mastercard</p>
                </div>
              </div>
              <button
                onClick={() => setIsOtpModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="flex justify-between">
                <span>Merchant:</span>
                <strong>NAVEEN ELECTRONICS</strong>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <strong className="font-mono">₹{finalTotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span>Card Ending:</span>
                <strong className="font-mono">•••• {cardData.number.slice(-4) || '0000'}</strong>
              </div>
            </div>

            <form onSubmit={handleVerifyOtpAndPay} className="space-y-4">
              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-700 block">
                  Enter One-Time Password (OTP) sent to your mobile:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="flex-1 text-center font-mono font-black text-lg tracking-widest bg-warm-50 border border-warm-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setEnteredOtp('123456')}
                    className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-xl text-[10px]"
                  >
                    Use Test OTP (123456)
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">
                  Simulated sandbox verification. Code valid for 2 minutes.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOtpModalOpen(false)}
                  className="flex-1 py-3 bg-warm-100 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-md"
                >
                  Authorize Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* REALISTIC PAYMENT GATEWAY PROCESSING MODAL */}
      {/* -------------------------------------------------------- */}
      {isProcessingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center space-y-6 shadow-2xl border border-warm-200 animate-in fade-in zoom-in duration-300">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-full border-4 border-warm-200 border-t-emerald-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-navy-900" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-black text-navy-900">Processing Payment</h3>
              <p className="text-xs text-slate-600 min-h-[2.5rem] flex items-center justify-center">
                {processingStatus}
              </p>
            </div>

            <div className="text-[11px] font-mono text-slate-400 bg-warm-50 py-1.5 px-3 rounded-lg border">
              Amount: ₹{finalTotal.toLocaleString('en-IN')} • 256-Bit SSL Encrypted
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
