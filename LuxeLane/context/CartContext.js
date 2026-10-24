import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function addItem(product) {
    setCart(previousCart => {
      const existingProduct = previousCart.find(
        item => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(productId) {
    setCart(previousCart =>
      previousCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productId) {
    setCart(previousCart =>
      previousCart
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function removeItem(productId) {
    setCart(previousCart =>
      previousCart.filter(item => item.id !== productId)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = subtotal > 1200 ? subtotal * 0.20 : 0;
  const finalAmount = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoggedIn,
        setIsLoggedIn,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        subtotal,
        discount,
        finalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}