import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import colors from '../styles/colors';
import { useCart } from '../context/CartContext';

const PKR_PER_USD = 280;

function getPriceInPKR(product) {
  const price = Number(product.price) || 0;

  // Do not convert a price that has already been converted.
  if (product.priceCurrency === 'PKR') {
    return Math.round(price);
  }

  // API prices are in USD; local demo prices are already in PKR.
  if (product.source === 'api') {
    return Math.round(price * PKR_PER_USD);
  }

  return Math.round(price);
}

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addItem, isLoggedIn } = useCart();

  const displayPrice = getPriceInPKR(product);

  function handleAddToCart() {
    const productForCart = {
      ...product,
      price: displayPrice,
      priceCurrency: 'PKR',
    };

    if (!isLoggedIn) {
      navigation.navigate('Login', {
        pendingProduct: productForCart,
      });
      return;
    }

    addItem(productForCart);

    navigation.navigate('MainTabs', {
      screen: 'Cart',
    });
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: product.image || product.thumbnail || product.images?.[0] }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.category}>
          {product.category}
        </Text>

        <Text style={styles.title}>
          {product.title}
        </Text>

        <Text style={styles.price}>
          Rs. {displayPrice.toLocaleString('en-PK')}
        </Text>

        <Text style={styles.heading}>
          Product description
        </Text>

        <Text style={styles.description}>
          {product.description}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: 16,
    marginTop: 8,
  },
  backArrow: {
    fontSize: 36,
    color: colors.primary,
    lineHeight: 40,
  },
  image: {
    width: '100%',
    height: 320,
    resizeMode: 'contain',
    backgroundColor: colors.white,
    marginTop: 10,
  },
  content: {
    padding: 20,
  },
  category: {
    color: colors.primary,
    textTransform: 'capitalize',
  },
  title: {
    color: colors.text,
    fontSize: 24,
    marginTop: 8,
  },
  price: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
  },
  heading: {
    color: colors.text,
    fontSize: 17,
    marginTop: 25,
    marginBottom: 8,
  },
  description: {
    color: colors.secondaryText,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});