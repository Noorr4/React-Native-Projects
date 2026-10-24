import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';

import colors from '../styles/colors';
import { useCart } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cart, subtotal, discount, finalAmount, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  function placeOrder() {
    if (cart.length === 0) {
      Alert.alert('Your cart is empty', 'Add a product before checkout.');
      return;
    }

    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <View style={styles.container}>
        <Text style={styles.successIcon}>✓</Text>
        <Text style={styles.title}>Order placed!</Text>
        <Text style={styles.description}>
          Thank you for shopping with LuxeLane. This is a demo order
          confirmation; no payment was taken.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
  onPress={() => navigation.goBack()}
  accessibilityRole="button"
  accessibilityLabel="Back to cart"
  style={{ paddingVertical: 10 }}
>
  <Text style={{ fontSize: 16, color: '#6D4057' }}>
    ‹ Back to Cart
  </Text>
</TouchableOpacity>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.description}>
        Review your order before placing it.
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Order Summary</Text>
        <Row
  label="Total Items"
  value={String(
    cart.reduce((total, item) => total + item.quantity, 0)
  )}
/>
        <Row label="Subtotal" value={money(subtotal)} />
        <Row label="20% Discount" value={`− ${money(discount)}`} />
        <View style={styles.line} />
        <Row label="Final Payable" value={money(finalAmount)} bold />
      </View>

      <Text style={styles.note}>
        The 20% discount applies when your subtotal is greater than
        Rs. 1,200.
      </Text>

      <TouchableOpacity
        style={[styles.button, cart.length === 0 && styles.disabled]}
        onPress={placeOrder}
      >
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

function money(value) {
  return `Rs. ${Math.round(value).toLocaleString('en-PK')}`;
}

function Row({ label, value, bold }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowText, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.rowText, bold && styles.bold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background,
    padding: 22, justifyContent: 'center' },
  title: { color: colors.text, fontSize: 28, marginBottom: 8 },
  description: { color: colors.secondaryText, lineHeight: 21, marginBottom: 20 },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 18 },
  heading: { color: colors.text, fontSize: 19, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 9 },
  rowText: { color: colors.secondaryText, fontSize: 13 },
  bold: { color: colors.text, fontWeight: '700', fontSize: 15 },
  line: { height: 1, backgroundColor: colors.border, marginVertical: 6 },
  note: { color: colors.primary, fontSize: 12, marginTop: 16 },
  button: { backgroundColor: colors.primary, borderRadius: 9,
    padding: 16, alignItems: 'center', marginTop: 25 },
  buttonText: { color: colors.white, fontWeight: '700' },
  disabled: { opacity: 0.5 },
  successIcon: { color: colors.success, fontSize: 55, marginBottom: 12 },
});