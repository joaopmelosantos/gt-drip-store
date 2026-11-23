import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'drip_store_cart';

// Carrega itens salvos do localStorage com segurança
function loadSavedCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadSavedCart);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingMessage, setShippingMessage] = useState('');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Salva o carrinho no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignora erro caso localStorage não esteja disponível
    }
  }, [items]);

  function addItem(product, selectedSize, selectedColor) {
    const unitPrice = product.priceDiscount || product.price;
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Único';
    const color =
      selectedColor || (product.colors && product.colors[0]) || '#1F1F1F';

    setItems((currentItems) => {
      const existingIndex = currentItems.findIndex(
        (item) =>
          String(item.id) === String(product.id) &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex >= 0) {
        const updated = [...currentItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: unitPrice,
          oldPrice: product.price,
          size,
          color,
          quantity: 1,
        },
      ];
    });
  }

  function updateQuantity(index, delta) {
    setItems((currentItems) => {
      const updated = [...currentItems];
      const nextQty = updated[index].quantity + delta;
      if (nextQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...updated[index], quantity: nextQty };
      }
      return updated;
    });
  }

  function removeItem(index) {
    setItems((currentItems) => currentItems.filter((_, idx) => idx !== index));
  }

  function clearCart() {
    setItems([]);
    setCouponCode('');
    setCouponDiscount(0);
    setCouponMessage('');
    setCep('');
    setShippingCost(0);
    setShippingMessage('');
  }

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  function applyCoupon(code) {
    const cleanCode = String(code || '').trim().toUpperCase();
    setCouponCode(cleanCode);

    if (cleanCode === 'DRIP10') {
      const discount = Math.round(subtotal * 0.1);
      setCouponDiscount(discount);
      setCouponMessage('Cupom DRIP10 aplicado (10% de desconto).');
    } else if (cleanCode === 'DRIP30') {
      setCouponDiscount(30);
      setCouponMessage('Cupom DRIP30 aplicado (R$ 30,00 de desconto).');
    } else {
      setCouponDiscount(0);
      setCouponMessage('Cupom inválido. Tente DRIP10 ou DRIP30.');
    }
  }

  function calculateShipping(cepValue) {
    const digits = String(cepValue || '').replace(/\D/g, '');
    setCep(cepValue);

    if (digits.length < 8) {
      setShippingCost(0);
      setShippingMessage('Informe um CEP válido com 8 dígitos.');
      return;
    }

    // Frete grátis para pedidos acima de 200; caso contrário R$ 19,90
    if (subtotal >= 200) {
      setShippingCost(0);
      setShippingMessage('Frete grátis para sua região!');
    } else {
      setShippingCost(19.9);
      setShippingMessage('Entrega padrão: R$ 19,90 (5 a 7 dias úteis).');
    }
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const effectiveDiscount = Math.min(couponDiscount, subtotal);
  const total = Math.max(0, subtotal + shippingCost - effectiveDiscount);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        shippingCost,
        shippingMessage,
        couponCode,
        couponMessage,
        discountAmount: effectiveDiscount,
        total,
        cep,
        isCartModalOpen,
        setIsCartModalOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        calculateShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
