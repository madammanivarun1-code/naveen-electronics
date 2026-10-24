import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_INFO } from '../data/categories';
import { 
  CheckCircle2, 
  Printer, 
  Share2, 
  ArrowRight, 
  Package, 
  MapPin, 
  Clock, 
  PhoneCall, 
  FileCheck2,
  Building2,
  ShieldCheck
} from 'lucide-react';

export default function OrderSuccessPage() {
  const { lastOrder, navigateTo } = useStore();

  if (!lastOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-navy-900">No recent order found</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="px-5 py-2.5 bg-navy-900 text-electric text-xs font-bold rounded-xl"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const { customer, items, subtotal, tax, shipping, discount, grandTotal, orderId, createdAt, paymentMethod } = lastOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppDispatch = () => {
    const text = `Hi Naveen Electronics (Jogulamba Gadwal), I placed order #${orderId} for ₹${grandTotal.toLocaleString('en-IN')}.\n\nCustomer: ${customer.fullName}, ${customer.address}, ${customer.pincode}.\nPlease confirm order processing and delivery status.`;
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* 1. Success Notification Header */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Order Confirmed & Logged
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900">
            Thank You, {customer.fullName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Your electrical order has been received by Naveen Electronics in Raghavendra Colony, Jogulamba Gadwal. You can pick it up or receive local delivery.
          </p>
        </div>

        {/* Order Meta Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-emerald-200 text-xs shadow-sm">
          <div>
            <span className="text-slate-400">Order Reference: </span>
            <span className="font-mono font-black text-navy-900">{orderId}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div>
            <span className="text-slate-400">Payment Status: </span>
            <span className={`font-bold px-2.5 py-0.5 rounded text-[11px] uppercase ${
              lastOrder.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
            }`}>
              {lastOrder.paymentStatus === 'PAID' ? 'PAID ✓' : (lastOrder.paymentStatus || 'CONFIRMED')}
            </span>
          </div>
          <span className="text-slate-300">•</span>
          <div>
            <span className="text-slate-400">Mode: </span>
            <span className="font-bold text-navy-900 uppercase">{lastOrder.paymentMeta?.paymentMethodName || paymentMethod}</span>
          </div>
          {lastOrder.transactionId && (
            <>
              <span className="text-slate-300">•</span>
              <div>
                <span className="text-slate-400">Txn Ref: </span>
                <span className="font-mono font-bold text-navy-900">{lastOrder.transactionId}</span>
              </div>
            </>
          )}
          <span className="text-slate-300">•</span>
          <div>
            <span className="text-slate-400">Total: </span>
            <span className="font-mono font-black text-emerald-700">₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleWhatsAppDispatch}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow transition-colors flex items-center gap-2"
          >
            <span>WhatsApp Dispatch Alert</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-white hover:bg-warm-100 text-navy-900 text-xs font-bold rounded-xl border border-warm-200 transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print Tax Invoice</span>
          </button>

          <button
            onClick={() => navigateTo('shop')}
            className="px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-electric text-xs font-black rounded-xl transition-colors flex items-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Official Printable Tax Invoice Layout */}
      <div className="bg-white rounded-3xl border border-warm-200 shadow-sm p-6 sm:p-10 space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Invoice Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-warm-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-navy-900">
                NAVEEN<span className="text-amber-500">-ELECTRONICS</span>
              </span>
              <span className="text-[10px] font-bold bg-navy-900 text-electric px-1.5 py-0.5 rounded">
                TAX INVOICE
              </span>
            </div>
            <p className="text-xs text-slate-500">{STORE_INFO.legalName}</p>
            <p className="text-xs text-slate-500">{STORE_INFO.address}</p>
            <p className="text-xs font-mono font-bold text-navy-900">GSTIN: {STORE_INFO.gstin}</p>
            <p className="text-xs text-slate-500">Owner Phone: {STORE_INFO.phone} • Email: {STORE_INFO.email}</p>
          </div>

          <div className="text-left sm:text-right space-y-1 text-xs">
            <div className="text-slate-400">Invoice Number:</div>
            <div className="font-mono font-black text-navy-900 text-base">{orderId}</div>
            <div className="text-slate-400">Date: {new Date(createdAt).toLocaleDateString('en-IN')}</div>
            <div className="text-slate-400">State: Telangana (Code: 36)</div>
          </div>
        </div>

        {/* Customer & Delivery Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-warm-50 p-4 rounded-2xl border border-warm-200 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Billed / Delivered To:</span>
            <div className="font-extrabold text-navy-900 text-sm">{customer.fullName}</div>
            <div className="text-slate-600">{customer.address}</div>
            <div className="text-slate-600">{customer.city}, {customer.state} - <span className="font-mono font-bold">{customer.pincode}</span></div>
            <div className="text-slate-600 font-mono">Mobile: +91 {customer.phone}</div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Business / Tax Details:</span>
            {customer.isContractor && customer.gstin ? (
              <div className="space-y-0.5">
                <div className="font-bold text-navy-900">{customer.companyName || 'Contractor / Trade Account'}</div>
                <div className="font-mono text-emerald-800 font-bold text-xs">GSTIN: {customer.gstin}</div>
                <div className="text-[11px] text-slate-500">18% ITC Eligible Tax Invoice</div>
              </div>
            ) : (
              <div className="text-slate-500 italic">Retail Consumer (B2C Invoice)</div>
            )}
            {customer.deliveryNotes && (
              <div className="pt-2 text-slate-500 text-[11px]">
                <strong>Site Note:</strong> {customer.deliveryNotes}
              </div>
            )}
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-warm-200 bg-warm-100/60 text-slate-600">
                <th className="py-2.5 px-3 font-bold">#</th>
                <th className="py-2.5 px-3 font-bold">Item Description & Brand</th>
                <th className="py-2.5 px-3 font-bold">SKU</th>
                <th className="py-2.5 px-3 font-bold text-center">Unit</th>
                <th className="py-2.5 px-3 font-bold text-center">Qty</th>
                <th className="py-2.5 px-3 font-bold text-right">Rate (₹)</th>
                <th className="py-2.5 px-3 font-bold text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-warm-50/50">
                  <td className="py-3 px-3 text-slate-400">{idx + 1}</td>
                  <td className="py-3 px-3">
                    <div className="font-extrabold text-navy-900">{item.name}</div>
                    <div className="text-[10px] text-slate-500">Brand: {item.brand}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{item.sku}</td>
                  <td className="py-3 px-3 text-center uppercase text-[10px] font-bold text-slate-600">{item.unit}</td>
                  <td className="py-3 px-3 text-center font-bold text-navy-900">{item.quantity}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-navy-900">
                    ₹{item.price.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black text-navy-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary Totals */}
        <div className="border-t border-warm-200 pt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-1 text-xs text-slate-500 max-w-sm">
            <p><strong>Terms & Declarations:</strong> We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
            <p className="text-[11px] text-slate-400">Subject to Jogulamba Gadwal Jurisdiction only. Genuine Polycab, Goldmedal & ISI components.</p>
          </div>

          <div className="w-full sm:w-64 space-y-1.5 text-xs text-right">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono font-bold text-navy-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>CGST (9%):</span>
              <span className="font-mono font-bold text-navy-900">₹{Math.round(tax / 2).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>SGST (9%):</span>
              <span className="font-mono font-bold text-navy-900">₹{Math.round(tax / 2).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charge:</span>
              <span className="font-mono font-bold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount:</span>
                <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="border-t border-warm-200 pt-2 flex justify-between items-baseline text-navy-900">
              <span className="font-black text-sm">Invoice Total:</span>
              <span className="font-mono font-black text-xl">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
