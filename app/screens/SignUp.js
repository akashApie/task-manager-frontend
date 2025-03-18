import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import AuthLayout from '../../components/auth/AuthLayout';
import { useDispatch } from 'react-redux';
import { signUpUser } from '@/redux/slices/authSlice';
import Toast from 'react-native-toast-message';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const { loading, setLoading } = useAuth();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true); 

    try {
      await dispatch(signUpUser({ name, email, password })).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        position: 'top',
      });
      navigation.navigate("SignIn"); 
    } catch (error) {
      console.error("Registration error:", error);
      Toast.show({
        type: 'error',
        text1: 'Registration failed. Try again!',
        position: 'top',
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <AuthLayout title="Create an Account">
      <View style={styles.form}>
        <Text style={styles.description}>Please register yourself.</Text>

        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          outlineColor="#F2F2F2"
          activeOutlineColor="#333333"
        />
        {errors.name && (
          <HelperText type="error" style={styles.errorText} visible={!!errors.name}>
            {errors.name}
          </HelperText>
        )}

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          outlineColor="#F2F2F2"
          activeOutlineColor="#333333"
        />
        {errors.email && (
          <HelperText type="error" style={styles.errorText} visible={!!errors.email}>
            {errors.email}
          </HelperText>
        )}

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          outlineColor="#F2F2F2"
          activeOutlineColor="#333333"
        />
        {errors.password && (
          <HelperText type="error" style={styles.errorText} visible={!!errors.password}>
            {errors.password}
          </HelperText>
        )}

        <Button
          mode="contained"
          buttonColor="#C8EE44"
          textColor="black"
          style={styles.button}
          onPress={handleSignUp}
        >
          Sign Up
        </Button>

        <Text style={styles.requestText}>
          Already registered?
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.requestAccess}> Sign In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
  description: {
    fontSize: 16,
    color: '#78778B',
    textAlign: 'left',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 8,
  },
  requestText: {
    textAlign: "center",
    color: '#1B212D',
    fontSize: 14,
  },
  requestAccess: {
    marginLeft: 3,
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 5,
  },
});

export default SignUp;
