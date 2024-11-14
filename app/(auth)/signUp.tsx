import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import OAuth from '@/components/Oauth';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'success',
    error: '',
    code: '',
  });

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSignUpPress = async () => {
    // Simulate Sign Up process (replace with actual implementation)
    Alert.alert('Sign Up', 'Account created successfully!');
    setVerification({ ...verification, state: 'pending' });
  };

  const onPressVerify = async () => {
    // Simulate verification process (replace with actual implementation)
    if (verification.code === '123456') {
      setVerification({ ...verification, state: 'success' });
      Alert.alert('Verification', 'Verification successful!');
    } else {
      setVerification({ ...verification, error: 'Verification failed', state: 'failed' });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
      <View style={{ position: 'relative', width: '100%', height: 250 }}>
        <Image source={images.signUpCar} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
        <Text style={{ position: 'absolute', bottom: 20, left: 20, fontSize: 24, color: '#000', fontWeight: '600' }}>
          Welcome 👋
        </Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20, backgroundColor: '#f4f6f8' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 }}>Sign Up</Text>
        <View style={{ width: '90%', maxWidth: 400, padding: 20, backgroundColor: '#fff', borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 4 }}>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 5 }}>Name</Text>
            <TextInput
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
              style={{ width: '100%', padding: 10, fontSize: 16, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, backgroundColor: '#f9f9f9' }}
              placeholder="Enter your name"
            />
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 5 }}>Email</Text>
            <TextInput
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              style={{ width: '100%', padding: 10, fontSize: 16, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, backgroundColor: '#f9f9f9' }}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 5 }}>Password</Text>
            <TextInput
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              style={{ width: '100%', padding: 10, fontSize: 16, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, backgroundColor: '#f9f9f9' }}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <CustomButton title="Sign Up" onPress={onSignUpPress} style={{ marginTop: 24, paddingVertical: 12, backgroundColor: '#007BFF', borderRadius: 50, alignItems: 'center' }} />

          {/* Verification Code Section */}
          {verification.state === 'pending' && (
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 16, color: '#333', marginBottom: 5 }}>Verification Code</Text>
              <TextInput
                value={verification.code}
                onChangeText={(value) => setVerification({ ...verification, code: value })}
                style={{ width: '100%', padding: 10, fontSize: 16, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, backgroundColor: '#f9f9f9' }}
                placeholder="Enter verification code"
              />
            </View>
          )}

          {verification.state === 'failed' && (
            <Text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>
              {verification.error}
            </Text>
          )}

          {verification.state === 'pending' && (
            <CustomButton
              title="Verify Code"
              onPress={onPressVerify}
              style={{ marginTop: 24, paddingVertical: 12, backgroundColor: '#007BFF', borderRadius: 50, alignItems: 'center' }}
            />
          )}

          <OAuth />

          <TouchableOpacity onPress={() => router.push('/signIn')}>
            <Text style={{ marginTop: 20, fontSize: 18, textAlign: 'center', color: '#666' }}>
              Already have an account? <Text style={{ color: '#007BFF', fontWeight: 'bold' }}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {verification.state === 'success' && (
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            <Image source={images.check} style={{ width: 110, height: 110, alignSelf: 'center' }} />
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 10 }}>Verification Successful!</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SignUp;
