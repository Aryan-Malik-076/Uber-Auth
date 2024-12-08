import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import OAuth from '@/components/Oauth';
import { setAuth } from '@/services/auth'; // Import the setAuth function
import axios from 'axios';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (name: any, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login'
, formData);
      const result = await response.data;

      if (response.data) {
        await setAuth(result.token); // Store JWT token
        Alert.alert('Success', 'Logged in successfully');
        router.push('/home'); // Navigate to the home screen
      } else {
        Alert.alert('Error', result.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.imageContainer}>
        <Image source={images.signUpCar} style={styles.image} />
        <Text style={styles.welcomeText}>Welcome Back 👋</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <CustomButton
            title="Log In"
            onPress={handleSubmit}
            style={styles.customButton}
          />

          <OAuth />

          <TouchableOpacity onPress={() => router.push('/signUp')}>
            <Text style={styles.loginText}>
              Don't have an account? <Text style={styles.loginLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  welcomeText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 24,
    color: '#000',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  form: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },
  customButton: {
    marginTop: 24,
    paddingVertical: 12,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    alignItems: 'center',
  },
  loginText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default SignIn;
