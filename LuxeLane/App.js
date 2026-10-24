import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { CartProvider } from './context/CartContext';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}