import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { signup } from '@/services/auth'; // Ensure this path matches your project structure

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSignUpPress = async () => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      // Make the signup request
      const response = await signup(name, email, password);
      Alert.alert('Sign Up', response.message);
      router.push('/signIn');
    } catch (err: any) {
      if (err.message.includes('Email already in use')) {
        Alert.alert('Error', 'This email is already registered.');
      } else if (err.message.includes('All fields are required')) {
        Alert.alert('Error', 'Please fill all required fields.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Sign Up</Text>

        <TextInput
          placeholder="Name"
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
          style={{
            width: '90%',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
          keyboardType="email-address"
          style={{
            width: '90%',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry
          style={{
            width: '90%',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            marginBottom: 20,
          }}
        />

        <TouchableOpacity
          onPress={onSignUpPress}
          style={{
            backgroundColor: '#007BFF',
            padding: 15,
            borderRadius: 8,
            width: '90%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signIn')}>
          <Text style={{ marginTop: 20, color: '#007BFF' }}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;
