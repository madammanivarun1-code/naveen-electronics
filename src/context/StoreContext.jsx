import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import { STORE_INFO } from '../data/categories';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // 1. Products State (versioned storage key so new business details & Polycab/Goldmedal updates load instantly)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('naveen_electronics_products_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('naveen_electronics_products_v3', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  // 2. Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('naveen_electronics_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load cart', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('naveen_electronics_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // 3. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('naveen_electronics_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load wishlist', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('naveen_electronics_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // 4. Navigation & View State
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Raghavendra Colony, Jogulamba Gadwal');
  const [lastOrder, setLastOrder] = useState(null);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(true);

  // 5. Toast / Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart operations
  const addToCart = (product, quantity = 1, chosenUnit = null) => {
    const unitToUse = chosenUnit || product.unit;
    const priceToUse = (chosenUnit === product.coilLength && product.coilPrice) 
      ? product.coilPrice 
      : product.indicativePrice;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === product.id && item.unit === unitToUse
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, {
          id: product.id,
          name: product.name,
          brand: product.brand,
          sku: product.sku,
          price: priceToUse,
          unit: unitToUse,
          mrp: product.mrp,
          image: product.image,
          category: product.category,
          quantity: quantity,
          productRef: product
        }];
      }
    });

    showToast(`Added ${quantity} ${unitToUse} of "${product.name}" to cart!`, 'success');
  };

  const updateCartQuantity = (itemId, unit, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemId, unit);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId && item.unit === unit
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (itemId, unit) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === itemId && item.unit === unit)));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  // Navigation Helper
  const navigateTo = (page, data = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (data?.category) {
      setSelectedCategory(data.category);
      setSelectedSubcategory(data.subcategory || null);
    }
    if (data?.product) {
      setSelectedProduct(data.product);
      setProductModalOpen(true);
    }
    if (data?.search) {
      setSearchQuery(data.search);
    }
    setActivePage(page);
  };

  const viewProductDetail = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  // Order Placement
  const placeOrder = (orderData) => {
    const orderId = `NE-GDW-${Math.floor(100000 + Math.random() * 900000)}`;
    const fullOrder = {
      ...orderData,
      orderId,
      createdAt: new Date().toISOString(),
      status: 'Confirmed - Preparing for Pickup / Delivery in Gadwal',
      items: [...cart],
      store: STORE_INFO
    };
    setLastOrder(fullOrder);
    clearCart();
    navigateTo('order-success');
    showToast(`Order #${orderId} confirmed!`, 'success');
    return fullOrder;
  };

  // Product Catalog Management (Admin)
  const updateProduct = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast(`Product "${updatedProduct.name}" updated successfully!`, 'success');
  };

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 1,
      lastPriceUpdate: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [productWithId, ...prev]);
    showToast(`New product "${newProduct.name}" added to catalog!`, 'success');
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product removed from catalog', 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('naveen_electronics_products_v2');
    showToast('Product catalog reset to default verified items', 'info');
  };

  const updateAllPricesDate = (dateStr) => {
    setProducts(prev =>
      prev.map(p => ({
        ...p,
        lastPriceUpdate: dateStr
      }))
    );
    showToast(`Updated estimate dates to ${dateStr}!`, 'success');
  };

  // Cart Totals
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const estimatedTax = Math.round(cartSubtotal * 0.18);
  const freeShippingThreshold = 1999;
  const deliveryCharge = cartSubtotal === 0 ? 0 : cartSubtotal >= freeShippingThreshold ? 0 : 80;
  const cartGrandTotal = cartSubtotal + estimatedTax + deliveryCharge;

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        activePage,
        selectedCategory,
        selectedSubcategory,
        searchQuery,
        selectedProduct,
        productModalOpen,
        selectedCity,
        lastOrder,
        rfqModalOpen,
        adminAuth,
        toast,
        cartSubtotal,
        cartItemsCount,
        estimatedTax,
        deliveryCharge,
        cartGrandTotal,
        freeShippingThreshold,
        // Actions
        setActivePage,
        setSelectedCategory,
        setSelectedSubcategory,
        setSearchQuery,
        setSelectedProduct,
        setProductModalOpen,
        setSelectedCity,
        setRfqModalOpen,
        setAdminAuth,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        navigateTo,
        viewProductDetail,
        placeOrder,
        updateProduct,
        addProduct,
        deleteProduct,
        resetProductsToDefault,
        updateAllPricesDate,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
