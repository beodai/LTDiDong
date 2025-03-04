import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const splashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Started'); // Thay thế màn hình hiện tại bằng màn hình Started
    }, 3000); // Thay đổi 3000 thành số mili giây bạn muốn

    return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
  }, [navigation]);

  return (
    <View style={styles.containerSplash}>
      <Image
        source={require('./image/GroceryUI/splash-screen.png')}
        style={styles.splashImage}
      />
    </View>
  );
};

const Started = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./image/GroceryUI/onboarding-screen.png')} style={styles.backgroundImage} />

      <Image source={require('./image/GroceryUI/carrot-logo.png')} style={styles.logo} />

      <Text style={styles.title}>Welcome to our store</Text>
      <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignIn = ({ navigation }) => {
  return (
    <View style={styles.signInContainer}>
      {/* Ảnh nền */}
      <Image source={require('./image/GroceryUI/signin-screen.png')} style={styles.signInBackground} />

      {/* Nội dung */}
      <View style={styles.signInContent}>
        <Text style={styles.signInTitle}>Get your groceries with nectar</Text>

        {/* Ô nhập số điện thoại */}
        <TouchableOpacity onPress={() => navigation.navigate('PhoneNumberInput')}>
          <View style={styles.phoneInputContainer}>
            <Image source={require('./image/GroceryUI/bangladesh-flag.png')} style={styles.flag} />
            <Text style={styles.phonePrefix}>+880</Text>
            <TextInput style={styles.phoneInput} placeholder="Enter your number" keyboardType="phone-pad" editable={false} />
          </View>
        </TouchableOpacity>

        <Text style={styles.orText}>Or connect with social media</Text>

        {/* Nút đăng nhập với Google */}
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Nút đăng nhập với Facebook */}
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PhoneNumberInput = ({ navigation }) => {
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      Animated.timing(keyboardHeight, {
        toValue: event.endCoordinates.height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.phoneNumberContainer}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image source={require('./image/GroceryUI/number-screen.png')} style={styles.phoneNumberBackground} />
        
        <View style={styles.phoneNumberContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.phoneNumberTitle}>Enter your mobile number</Text>
          <Text style={styles.phoneNumberSubtitle}>Mobile number</Text>
          <View style={styles.phoneInputContainer}>
            <Image source={require('./image/GroceryUI/bangladesh-flag.png')} style={styles.flag} />
            <Text style={styles.phonePrefix}>+880</Text>
            <TextInput style={styles.phoneInput} placeholder="Enter your number" keyboardType="phone-pad" autoFocus={true} />
          </View>
        </View>
      </ScrollView>
      
      <Animated.View style={[styles.nextButtonContainer, { bottom: keyboardHeight }]}> 
        <TouchableOpacity onPress={() => navigation.navigate('Verification')} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>→</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const Verification = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      Animated.timing(keyboardHeight, {
        toValue: event.endCoordinates.height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.verificationContainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.verificationContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.verificationTitle}>Enter your 4-digit code</Text>
          <Text style={styles.verificationSubtitle}>Code</Text>
          <TextInput
            style={styles.codeInput}
            placeholder="- - - -"
            keyboardType="number-pad"
            maxLength={4}
            value={code}
            onChangeText={setCode}
          />
          
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <Animated.View style={[styles.nextButtonContainer, { bottom: keyboardHeight }]}> 
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>→</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerSplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: 120,
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 57,
    marginBottom: 20,
  },
  title: {
    width: 250,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#c5bcb5',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Styles cho SignIn
  signInContainer: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
  signInBackground: {
    width: width,
    height: height * 0.4,
    resizeMode: 'cover',
  },
  signInContent: {
    padding: 20,
  },
  signInTitle: {
    width: 200,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    marginBottom: 20,
  },
  flag: {
    width: 35,
    height: 24,
    marginRight: 10,
  },
  phonePrefix: {
    fontSize: 16,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 10,
  },
  socialButton: {
    backgroundColor: '#4C75A3',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  //Style cho Number
  phoneNumberContainer: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  phoneNumberBackground: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
  phoneNumberContent: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  phoneNumberTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  phoneNumberSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  backButtonText: {
    fontSize: 40,
    color: '#000',
  },
  nextButtonContainer: {
    position: 'absolute',
    right: 20,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 100,
  },
  nextButtonText: {
    fontSize: 24,
    color: '#fff',
  },

  //Style cho Verification
  verificationContainer: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  verificationContent: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  verificationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  verificationSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  codeInput: {
    fontSize: 24,
    letterSpacing: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  resendButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  resendText: {
    color: 'green',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: -50,
    left: 20,
  },
  backButtonText: {
    fontSize: 40,
    color: '#000',
  },
  nextButtonContainer: {
    position: 'absolute',
    right: 20,
  },
  nextButton: {
    backgroundColor: 'green',
    padding: 18,
    borderRadius: 100,
  },
  nextButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

const Groceries_App_UI = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splashScreen">
        <Stack.Screen name="splashScreen" component={splashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Started" component={Started} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="PhoneNumberInput" component={PhoneNumberInput} options={{ headerShown: false }} />
        <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Groceries_App_UI;