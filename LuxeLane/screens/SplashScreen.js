import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';

import colors from '../styles/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900',
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.panel}>
          <Text style={styles.brand}>♧ LuxeLane</Text>
          <Text style={styles.tagline}>THE EVERYDAY, ELEVATED</Text>

          <Text style={styles.offer}>20% OFF — Limited Stock!</Text>

          <Text style={styles.heading}>
            A little luxury.{"\n"}A lot of you.
          </Text>

          <Text style={styles.description}>
            Discover thoughtfully chosen fashion, accessories and beauty.
            Your next favourite is here.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 45,
  },
  brand: {
    color: colors.white,
    fontSize: 31,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 3,
  },
  tagline: {
    color: colors.gold,
    fontSize: 9,
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 28,
  },
  offer: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 16,
  },
  heading: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 39,
    marginBottom: 12,
  },
  description: {
    color: '#F3E8E8',
    fontSize: 13,
    lineHeight: 21,
  },
});