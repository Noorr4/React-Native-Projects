import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import colors from '../styles/colors';
import { getProducts } from '../services/productService';
import demoProducts from '../data/demoProducts';

const PKR_PER_USD = 280;

function getPriceInPKR(product) {
  const price = Number(product.price) || 0;

  if (
    product.source === 'api' &&
    product.priceCurrency !== 'PKR'
  ) {
    return Math.round(price * PKR_PER_USD);
  }

  return Math.round(price);
}

function formatPrice(product) {
  return `Rs. ${getPriceInPKR(product).toLocaleString('en-PK')}`;
}

function matchesCategory(product, category, subcategory) {
  if (!category) return true;
  if (product.category !== category) return false;

  const selected = (subcategory || '').toLowerCase();
  const productSubcategory =
    (product.subcategory || '').toLowerCase();
  const gender = (product.gender || '').toLowerCase();

  if (selected.startsWith('male') && gender !== 'male') {
    return false;
  }

  if (selected.startsWith('female') && gender !== 'female') {
    return false;
  }

  // Check unstitched first because "unstitched"
  // contains the word "stitched".
  if (selected.includes('unstitched')) {
    return productSubcategory === 'unstitched';
  }

  if (selected.includes('stitched')) {
    return productSubcategory === 'stitched';
  }

  if (selected.includes('jewellery')) {
    return productSubcategory.includes('jewellery');
  }

  if (selected.includes('watch')) {
    return productSubcategory.includes('watch');
  }

  if (
    selected.includes('purse') ||
    selected.includes('wallet')
  ) {
    return (
      productSubcategory.includes('purse') ||
      productSubcategory.includes('wallet')
    );
  }

  return true;
}


export default function ProductListScreen({ route, navigation }) {
  const params = route.params || {};

  const title = params.title || 'All Products';
  const category = params.category || '';
  const subcategory = params.subcategory || '';
  const initialSearch = params.searchQuery || '';

  const [apiProducts, setApiProducts] = useState([]);
  const [searchText, setSearchText] = useState(initialSearch);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError('');

        const products = await getProducts();

        if (isMounted) {
          setApiProducts(products);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            'API products could not load. Check your internet and try again.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const allProducts = useMemo(
    () => [...apiProducts, ...demoProducts],
    [apiProducts]
  );

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) =>
      matchesCategory(product, category, subcategory)
    );

    const query = searchText.trim().toLowerCase();

    if (query) {
      result = result.filter((product) =>
        [
          product.title,
          product.description,
          product.category,
          product.subcategory || '',
          product.gender || '',
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)
      );
    }

    if (title.toLowerCase().includes('favourites')) {
      result = result.filter((product) => {
        const rating =
          typeof product.rating === 'number'
            ? product.rating
            : product.rating?.rate || 0;

        return rating >= 4 || product.source === 'local';
      });
    }

    return result;
  }, [
    allProducts,
    category,
    subcategory,
    searchText,
    title,
  ]);

  function renderProduct({ item }) {
    const imageUrl =
      item.thumbnail || item.image || item.images?.[0];

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            product: item,
          })
        }
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text>No image</Text>
          </View>
        )}

        <Text style={styles.productName} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.price}>{formatPrice(item)}</Text>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.message}>Loading products...</Text>
      </View>
    );
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

      <Text style={styles.heading}>{title}</Text>

      <Text style={styles.subtitle}>
        Discover products selected for LuxeLane.
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search products..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

      {!!error && (
        <Text style={styles.error}>
          {error} Showing available demo products instead.
        </Text>
      )}

      <Text style={styles.resultCount}>
        {filteredProducts.length} products
      </Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.message}>
            No products found in this collection.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#FFF9F6',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 36,
    justifyContent: 'center',
    marginBottom: 4,
  },
  backArrow: {
    fontSize: 36,
    color: colors.primary,
    lineHeight: 36,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary || '#6D4057',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#777',
    marginBottom: 16,
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5D9DF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 12,
    color: '#222',
  },
  resultCount: {
    color: '#777',
    marginBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 145,
    borderRadius: 10,
    backgroundColor: '#F4ECEF',
  },
  imagePlaceholder: {
    height: 145,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4ECEF',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#292329',
    marginTop: 9,
    minHeight: 38,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary || '#6D4057',
    marginTop: 5,
  },
  error: {
    color: '#A33A3A',
    marginBottom: 10,
  },
  message: {
    color: '#777',
    textAlign: 'center',
    marginTop: 16,
  },
});
