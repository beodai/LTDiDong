import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../AppContext';
import Icon from "react-native-vector-icons/FontAwesome";

const SignInScreen = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Thực hiện đăng nhập
    setIsLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email here!"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password here!"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Or sign in with</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={20} color="red" style={styles.icon} />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
          <Icon name="facebook" size={20} color="white" style={styles.icon} />
          <Text style={styles.facebookText}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text>Not yet a member? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 16
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: '#ccc'
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: 'gold',
    marginBottom: 15,
    fontWeight: 'bold'
  },
  signInButton: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center'
  },
  signInText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  orText: {
    marginVertical: 20,
    fontSize: 16,
    color: '#555',
    fronWeight: 'bold'
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    width: '48%',
    justifyContent: 'center',
    borderColor: '#ccc'
  },
  icon: {
    marginRight: 10
  },
  socialText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20
  },
  linkText: {
    color: 'gold',
  },
  facebookButton: {
    backgroundColor: 'blue', // Nền xanh
    borderColor: 'blue' // Để viền cùng màu nền
  },

  facebookText: {
    color: 'white', // Chữ màu trắng
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default SignInScreen;