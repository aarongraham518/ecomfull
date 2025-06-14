import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateCartItemQuantity = (productId, type) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.productId !== productId) return item;
  
        const newQuantity = type === 'inc'
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1);
  
        return { ...item, quantity: newQuantity };
      })
    );
  };
  

  // const getSubtotal = () =>
  //   cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const getSubtotal = () => {
    console.log("Cart:", cartItems);
  
    return cartItems.reduce((sum, item) => {
      const itemPrice = Number(item.price) || 0;
      const itemQty = Number(item.quantity) || 0;
  
      console.log(`Item: ${item.name}, Price: ${itemPrice}, Qty: ${itemQty}`);
  
      return sum + itemPrice * itemQty;
    }, 0);
  };
    

  const shippingFee = 17;
  const getTotal = () => getSubtotal() + shippingFee;

  const addToFavorites = (item) => {
    setFavorites(prev => {
      if (prev.some(fav => fav._id === item._id)) return prev; // avoid duplicates
      return [...prev, item];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(item => item._id !== productId));
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item._id === productId);
  };

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        updateCartItemQuantity, 
        getSubtotal, 
        getTotal, 
        shippingFee,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        favorites
       }}
    >
      {children}
    </CartContext.Provider>
  );
};
