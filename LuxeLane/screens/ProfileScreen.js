import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';

import colors from '../styles/colors';
import { useCart } from '../context/CartContext';

export default function ProfileScreen({ navigation }) {
  const { isLoggedIn, setIsLoggedIn } = useCart();

  function handleLogout() {
    Alert.alert('Log out', 'Would you like to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        onPress: () => setIsLoggedIn(false),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>L</Text>
        </View>

        <Text style={styles.name}>
          {isLoggedIn ? 'LuxeLane Customer' : 'Welcome to LuxeLane'}
        </Text>

        <Text style={styles.subtitle}>
          {isLoggedIn
            ? 'Your shopping journey starts here.'
            : 'Sign in to continue shopping.'}
        </Text>

        {!isLoggedIn && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.optionText}>My Shopping Bag</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() =>
          Alert.alert('Order History', 'No previous orders in this demo.')
        }
      >
        <Text style={styles.optionText}>Order History</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {isLoggedIn && (
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.footnote}>
        LuxeLane · Everyday, elevated.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 27,
    color: colors.text,
    marginBottom: 22,
  },
  card: {
    backgroundColor: colors.white,
    padding: 22,
    borderRadius: 13,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 30,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 14,
  },
  subtitle: {
    color: colors.secondaryText,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 11,
    borderRadius: 8,
    marginTop: 18,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
  },
  option: {
    backgroundColor: colors.white,
    borderRadius: 9,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    color: colors.text,
    fontSize: 14,
  },
  arrow: {
    color: colors.primary,
    fontSize: 20,
  },
  logout: {
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 13,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: colors.primary,
    fontWeight: '600',
  },
  footnote: {
    color: colors.secondaryText,
    textAlign: 'center',
    marginTop: 25,
    fontSize: 11,
  },
});