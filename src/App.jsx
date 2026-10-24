import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import ProductDetailModal from './components/ProductDetailModal';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import RequestQuotePage from './pages/RequestQuotePage';
import AdminCatalogPage from './pages/AdminCatalogPage';
import { 
  AboutPage, 
  ContactPage, 
  FAQPage, 
  ShippingPage, 
  ReturnsPage, 
  LegalPage 
} from './pages/InfoPages';

function MainContent() {
  const { activePage, toast } = useStore();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'cart':
      case 'checkout':
        return <CartPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'rfq':
        return <RequestQuotePage />;
      case 'admin':
        return <AdminCatalogPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'shipping':
        return <ShippingPage />;
      case 'returns':
        return <ReturnsPage />;
      case 'privacy':
        return <LegalPage title="Privacy & Data Protection Policy" />;
      case 'terms':
        return <LegalPage title="Terms & Conditions of Commercial Trade" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-warm-50 text-navy-900">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-navy-700 flex items-center gap-3 text-xs font-bold animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-electric animate-ping"></span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Product Detail Modal */}
      <ProductDetailModal />

      {/* Floating WhatsApp Helpdesk */}
      <WhatsAppFloatingButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
