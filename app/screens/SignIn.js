import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import AuthLayout from '../../components/auth/AuthLayout';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/slices/authSlice';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: "", password: ""
  });
  const { loading, setLoading } = useAuth();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
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




  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();
      navigation.navigate("TaskDetails");
      console.log(res)
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error","Invalid credentials.")
    } finally {
      setLoading(false); 
    }
  };


  return (
    <AuthLayout title="Welcome back">
      <View style={styles.form}>
        <Text style={styles.description}>
        Welcome back! Please enter your details
        </Text>
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
          onPress={handleSignIn}
        >
          Sign In
        </Button>

        <Text style={styles.requestText}>Not registered?
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.requestAccess}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
        <View style={styles.loader}>

        </View>
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
  rememberForgot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#929EAE',
  },
  checkboxChecked: {
    backgroundColor: '#C8EE44',
  },
  rememberText: {
    color: '#1B212D',
    fontSize: 14,
  },
  forgotText: {
    color: '#1B212D',
    fontSize: 14,
  },
  button: {
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 8
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
    marginTop: -19,
    marginBottom: -10,

  },
  loader: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
