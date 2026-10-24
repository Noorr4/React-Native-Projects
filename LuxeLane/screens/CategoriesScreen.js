
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import colors from '../styles/colors';

const categoryData = [
  {
    title: 'Accessories',
    description: 'The details make the difference.',
    male: ['Purses/Wallets', 'Watches'],
    female: ['Jewellery', 'Purses'],
  },
  {
    title: 'Clothes',
    description: 'Considered pieces. Effortless style.',
    male: ['Stitched', 'Unstitched'],
    female: ['Stitched', 'Unstitched'],
  },
  {
    title: 'Makeup',
    description: 'Your everyday beauty essentials.',
    male: [],
    female: [],
  },
];

export default function CategoriesScreen({ navigation }) {
  function openProducts(category, subcategory) {
    navigation.navigate('ProductList', {
      title:
        category === 'Makeup'
          ? 'Makeup'
          : subcategory
            ? `${category} - ${subcategory}`
            : category,
      category,
      subcategory:
        category === 'Makeup'
          ? 'Makeup'
          : subcategory,
    });
  }

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.title}>Categories</Text>

      <Text style={styles.heading}>
        A style for every side of you.
      </Text>

      <Text style={styles.subtitle}>
        Discover your world of fashion, finishing touches and beauty.
      </Text>

      {categoryData.map(category => (
        <View key={category.title} style={styles.card}>
          <Text style={styles.cardTitle}>
            {category.title}
          </Text>

          <Text style={styles.cardDescription}>
            {category.description}
          </Text>

          {category.title !== 'Makeup' ? (
            <View style={styles.columns}>
              <View style={styles.column}>
                <Text style={styles.columnTitle}>Male</Text>

                {category.male.map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.row}
                    onPress={() =>
                      openProducts(
                        category.title,
                        `Male - ${item}`
                      )
                    }
                  >
                    <Text style={styles.rowText}>{item}</Text>
                    <Text style={styles.arrow}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.column}>
                <Text style={styles.columnTitle}>Female</Text>

                {category.female.map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.row}
                    onPress={() =>
                      openProducts(
                        category.title,
                        `Female - ${item}`
                      )
                    }
                  >
                    <Text style={styles.rowText}>{item}</Text>
                    <Text style={styles.arrow}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                openProducts('Makeup', 'Makeup')
              }
            >
              <Text style={styles.makeupLink}>
                Explore products →
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    color: colors.text,
    fontSize: 22,
    marginTop: 55,
  },
  heading: {
    color: colors.text,
    fontSize: 24,
    marginTop: 22,
  },
  subtitle: {
    color: colors.secondaryText,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 12,
    marginBottom: 14,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 21,
  },
  cardDescription: {
    color: colors.secondaryText,
    fontSize: 11,
    marginTop: 4,
    marginBottom: 13,
  },
  columns: {
    flexDirection: 'row',
    gap: 15,
  },
  column: {
    flex: 1,
  },
  columnTitle: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rowText: {
    color: colors.text,
    fontSize: 11,
  },
  arrow: {
    color: colors.primary,
    fontSize: 17,
  },
  makeupLink: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});
