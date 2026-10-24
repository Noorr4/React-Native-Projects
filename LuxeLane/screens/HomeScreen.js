import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import colors from '../styles/colors';

const categories = [
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
  },
  {
    name: 'Clothes',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500',
  },
  {
    name: 'Makeup',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
  },
];

const favourites = [
  {
    id: 'bag',
    name: 'The Everyday Tote',
    price: 'Rs. 2,450',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
  },
  {
    id: 'watch',
    name: 'Classic Gold Watch',
    price: 'Rs. 3,200',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
  },
];

const banners = [
  {
    id: '1',
    eyebrow: 'A LITTLE TREAT, ON US',
    title: '20% OFF',
    description: 'On orders above Rs. 1,200',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500',
    collectionTitle: 'Shopping Collection',
  },
  {
    id: '2',
    eyebrow: 'TIMELESS ACCESSORIES',
    title: 'The Finishing Touch',
    description: 'Discover your everyday essentials',
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
    collectionTitle: 'Accessories Collection',
  },
  {
    id: '3',
    eyebrow: 'YOUR STYLE, YOUR WAY',
    title: 'New Looks',
    description: 'Find pieces made for your style',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500',
    collectionTitle: 'Clothing Collection',
  },
];

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [activeBanner, setActiveBanner] = useState(0);

  const bannerScrollRef = useRef(null);
  const { width } = useWindowDimensions();

  const bannerWidth = width - 40;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner(currentIndex => {
        const nextIndex = (currentIndex + 1) % banners.length;

        bannerScrollRef.current?.scrollTo({
          x: nextIndex * bannerWidth,
          animated: true,
        });

        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [bannerWidth]);

  function handleBannerScroll(event) {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / bannerWidth);

    setActiveBanner(index);
  }

  function openCategory(category) {
    navigation.navigate('Subcategory', { category });
  }

  function submitSearch() {
    const query = searchText.trim();

    navigation.navigate('ProductList', {
      title: query ? `Search: ${query}` : 'All Products',
      searchQuery: query,
    });
  }

  function openFavourites() {
    navigation.navigate('ProductList', {
      title: 'Favourites Edit',
    });
  }

  function openBanner(banner) {
    navigation.navigate('ProductList', {
      title: banner.collectionTitle,
    });
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>WELCOME TO LUXELANE</Text>

        <Text style={styles.heading}>
          Find your everyday luxe.
        </Text>

        <Text style={styles.subtitle}>
          Thoughtfully selected, just for you.
        </Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchPlaceholder}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your next favourite"
          placeholderTextColor={colors.secondaryText}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={submitSearch}
          returnKeyType="search"
          autoCapitalize="none"
        />

        <TouchableOpacity
          onPress={submitSearch}
          accessibilityRole="button"
          accessibilityLabel="Search products"
        >
          <Text style={styles.searchButton}>⌕</Text>
        </TouchableOpacity>
      </View>

      {/* Automatic sliding promotional banners */}
      <View style={styles.bannerSection}>
        <ScrollView
          ref={bannerScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleBannerScroll}
          scrollEventThrottle={16}
        >
          {banners.map(banner => (
            <TouchableOpacity
              key={banner.id}
              activeOpacity={0.9}
              style={[
                styles.banner,
                { width: bannerWidth },
              ]}
              onPress={() => openBanner(banner)}
            >
              <View style={styles.bannerText}>
                <Text style={styles.bannerEyebrow}>
                  {banner.eyebrow}
                </Text>

                <Text style={styles.discount}>
                  {banner.title}
                </Text>

                <Text style={styles.bannerDescription}>
                  {banner.description}
                </Text>

                <Text style={styles.shopNow}>
                  Shop now →
                </Text>
              </View>

              <Image
                source={{ uri: banner.image }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banner position indicators */}
        <View style={styles.dotsContainer}>
          {banners.map((banner, index) => (
            <TouchableOpacity
              key={banner.id}
              accessibilityRole="button"
              accessibilityLabel={`Show banner ${index + 1}`}
              onPress={() => {
                bannerScrollRef.current?.scrollTo({
                  x: index * bannerWidth,
                  animated: true,
                });

                setActiveBanner(index);
              }}
              style={[
                styles.dot,
                activeBanner === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Shop by category
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Categories')}
        >
          <Text style={styles.link}>View all →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryRow}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.name}
            style={styles.categoryItem}
            onPress={() => openCategory(category.name)}
          >
            <Image
              source={{ uri: category.image }}
              style={styles.categoryImage}
              resizeMode="cover"
            />

            <Text style={styles.categoryName}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Favourites */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          The favourites edit
        </Text>

        <TouchableOpacity onPress={openFavourites}>
          <Text style={styles.link}>Shop all →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productRow}>
        {favourites.map(product => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={openFavourites}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="cover"
            />

            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {product.name}
              </Text>

              <Text style={styles.productPrice}>
                {product.price}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
  },

  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 8,
  },

  heading: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '400',
  },

  subtitle: {
    color: colors.secondaryText,
    fontSize: 12,
    marginTop: 6,
  },

  searchPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginHorizontal: 20,
    marginBottom: 18,
  },

  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 12,
    paddingVertical: 14,
  },

  searchButton: {
    color: colors.primary,
    fontSize: 22,
    paddingLeft: 10,
  },

  bannerSection: {
    marginHorizontal: 20,
  },

  banner: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 13,
    overflow: 'hidden',
    height: 175,
  },

  bannerText: {
    flex: 1.15,
    padding: 13,
    justifyContent: 'center',
  },

  bannerEyebrow: {
    color: colors.gold,
    fontSize: 8,
    letterSpacing: 0.5,
    marginBottom: 8,
  },

  discount: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '700',
  },

  bannerDescription: {
    color: colors.white,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 5,
  },

  shopNow: {
    color: colors.primary,
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 10,
  },

  bannerImage: {
    flex: 0.85,
    height: '100%',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 7,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.border,
  },

  activeDot: {
    width: 20,
    backgroundColor: colors.primary,
  },

  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
  },

  link: {
    color: colors.primary,
    fontSize: 10,
  },

  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },

  categoryItem: {
    flex: 1,
  },

  categoryImage: {
    width: '100%',
    height: 78,
    borderRadius: 9,
  },

  categoryName: {
    color: colors.text,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 7,
  },

  productRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },

  productCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
  },

  productImage: {
    width: '100%',
    height: 145,
  },

  productInfo: {
    padding: 10,
  },

  productName: {
    color: colors.text,
    fontSize: 12,
  },

  productPrice: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5,
  },

  bottomSpace: {
    height: 30,
  },
});
