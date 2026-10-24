import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';

import colors from '../styles/colors';
import { useCart } from '../context/CartContext';

export default function LoginScreen({ route, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn, addItem } = useCart();

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing information', 'Enter your email and password.');
      return;
    }

    setIsLoggedIn(true);

    const pendingProduct = route.params?.pendingProduct;

    if (pendingProduct) {
      addItem({
        ...pendingProduct,
        price: Math.round(pendingProduct.price * 280),
      });
      navigation.navigate('MainTabs', { screen: 'Cart' });
    } else {
      navigation.navigate('MainTabs', { screen: 'Profile' });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>LuxeLane</Text>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to continue your journey.</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>New to LuxeLane? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background,
    justifyContent: 'center', padding: 24 },
  brand: { color: colors.primary, fontSize: 34, textAlign: 'center' },
  title: { color: colors.text, fontSize: 25, marginTop: 30 },
  subtitle: { color: colors.secondaryText, marginTop: 7, marginBottom: 28 },
  label: { color: colors.text, fontWeight: '600', marginBottom: 7 },
  input: { backgroundColor: colors.white, borderWidth: 1,
    borderColor: colors.border, borderRadius: 9, padding: 14,
    marginBottom: 18 },
  button: { backgroundColor: colors.primary, padding: 15,
    borderRadius: 9, alignItems: 'center', marginTop: 5 },
  buttonText: { color: colors.white, fontWeight: '700' },
  link: { textAlign: 'center', color: colors.primary, marginTop: 20 },
});