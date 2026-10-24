import React from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';

import colors from '../styles/colors';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const {
    cart, increaseQuantity, decreaseQuantity, removeItem,
    subtotal, discount, finalAmount,
  } = useCart();

  if (cart.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>♡</Text>
        <Text style={styles.title}>Your bag is waiting</Text>
        <Text style={styles.muted}>
          Discover something beautiful for yourself.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Shopping Bag</Text>

      {cart.map(item => (
        <View style={styles.card} key={String(item.id)}>
          <Image
  source={{
    uri: item.image || item.thumbnail || item.images?.[0],
  }}
  style={styles.productImage}
  resizeMode="cover"
/>

          <View style={styles.details}>
            <Text numberOfLines={2} style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>
              Rs. {item.price.toLocaleString('en-PK')}
            </Text>

            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decreaseQuantity(item.id)}
              >
                <Text>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantity}>{item.quantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => increaseQuantity(item.id)}
              >
                <Text>+</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <SummaryRow label="Subtotal" value={subtotal} />
        <SummaryRow label="Discount" value={-discount} />
        <View style={styles.separator} />
        <SummaryRow label="Total" value={finalAmount} bold />

        <Text style={styles.offer}>
          {subtotal > 1200
            ? 'You qualify for 20% off!'
            : `Shop above Rs. 1,200 to unlock 20% off.`}
        </Text>
        <TouchableOpacity
  style={styles.continueShoppingButton}
  onPress={() => navigation.navigate('Categories')}
>
  <Text style={styles.continueShoppingText}>
    Continue Shopping
  </Text>
</TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.buttonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryText, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.summaryText, bold && styles.bold]}>
        Rs. {Math.abs(value).toLocaleString('en-PK')}
        {value < 0 ? ' discount' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 18,
    paddingTop: 55 },
  title: { fontSize: 25, color: colors.text, marginBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: colors.white,
    padding: 10, borderRadius: 11, marginBottom: 12 },
  details: { flex: 1, paddingLeft: 12, justifyContent: 'center' },
  name: { color: colors.text, fontSize: 13 },
  price: { color: colors.primary, fontWeight: '700', marginTop: 7 },
  controls: { flexDirection: 'row', alignItems: 'center',
    marginTop: 10, gap: 10 },
  quantityButton: { borderWidth: 1, borderColor: colors.border,
    width: 27, height: 27, borderRadius: 6,
    alignItems: 'center', justifyContent: 'center' },
  quantity: { color: colors.text },
  remove: { color: colors.error, fontSize: 11 },
  summary: { backgroundColor: colors.white, padding: 16,
    borderRadius: 12, marginTop: 10, marginBottom: 25 },
  summaryTitle: { color: colors.text, fontSize: 18, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between',
    marginVertical: 7 },
  summaryText: { color: colors.secondaryText, fontSize: 13 },
  bold: { color: colors.text, fontWeight: '700', fontSize: 15 },
  separator: { height: 1, backgroundColor: colors.border, marginVertical: 7 },
  offer: { color: colors.primary, fontSize: 12, marginTop: 12 },
  button: { backgroundColor: colors.primary, padding: 15,
    borderRadius: 9, alignItems: 'center', marginTop: 15 },
  buttonText: { color: colors.white, fontWeight: '700' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: colors.background, padding: 25 },
  emptyIcon: { color: colors.primary, fontSize: 55 },
  muted: { color: colors.secondaryText, textAlign: 'center', marginTop: 8 },
  continueShoppingButton: {
  borderWidth: 1,
  borderColor: colors.primary || '#6D4057',
  borderRadius: 12,
  paddingVertical: 13,
  alignItems: 'center',
  marginBottom: 12,
},
continueShoppingText: {
  color: colors.primary || '#6D4057',
  fontSize: 15,
  fontWeight: '600',
},
productImage: {
  width: 95,
  height: 110,
  resizeMode: 'contain',
  backgroundColor: '#FFFFFF',
},
});