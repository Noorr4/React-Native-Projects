import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';

import colors from '../styles/colors';
import { useCart } from '../context/CartContext';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useCart();

  function handleSignup() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing information', 'Please complete every field.');
      return;
    }

    setIsLoggedIn(true);
    navigation.navigate('MainTabs', { screen: 'Profile' });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>LuxeLane</Text>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>A little luxury starts here.</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already registered? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background,
    justifyContent: 'center', padding: 24 },
  brand: { color: colors.primary, fontSize: 34, textAlign: 'center' },
  title: { color: colors.text, fontSize: 25, marginTop: 28 },
  subtitle: { color: colors.secondaryText, marginTop: 6, marginBottom: 24 },
  input: { backgroundColor: colors.white, borderWidth: 1,
    borderColor: colors.border, borderRadius: 9, padding: 14,
    marginBottom: 15 },
  button: { backgroundColor: colors.primary, padding: 15,
    borderRadius: 9, alignItems: 'center' },
  buttonText: { color: colors.white, fontWeight: '700' },
  link: { textAlign: 'center', color: colors.primary, marginTop: 20 },
});