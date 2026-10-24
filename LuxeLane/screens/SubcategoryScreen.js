import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../styles/colors';

export default function SubcategoryScreen({ route, navigation }) {
  const { category = 'Accessories' } = route.params || {};

  const subcategories = {
    Accessories: [
      'Male - Purses/Wallets',
      'Male - Watches',
      'Female - Jewellery',
      'Female - Purses',
    ],
    Clothes: [
      'Male - Stitched',
      'Male - Unstitched',
      'Female - Stitched',
      'Female - Unstitched',
    ],
    Makeup: ['Explore Makeup'],
  };

  function openProducts(item) {
    const subcategory =
      category === 'Makeup' ? 'Makeup' : item;

    navigation.navigate('ProductList', {
      title:
        category === 'Makeup'
          ? 'Makeup'
          : `${category} - ${item}`,
      category,
      subcategory,
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{category}</Text>

      <Text style={styles.subtitle}>
        Choose your collection
      </Text>

      {(subcategories[category] || ['Explore Products']).map(item => (
        <TouchableOpacity
          key={item}
          style={styles.button}
          onPress={() => openProducts(item)}
        >
          <Text style={styles.buttonText}>{item}</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 45,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 8,
  },
  backArrow: {
    fontSize: 36,
    color: colors.primary,
    lineHeight: 40,
  },
  title: {
    fontSize: 28,
    color: colors.text,
  },
  subtitle: {
    color: colors.secondaryText,
    marginTop: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text,
    fontSize: 14,
  },
  arrow: {
    color: colors.primary,
    fontSize: 18,
  },
});