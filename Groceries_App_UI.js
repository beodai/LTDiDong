import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Animated, SafeAreaView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton1}>
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton1}>
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
        <TouchableOpacity onPress={() => navigation.navigate('SelectLocation')} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>→</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

// Màn hình Select Location
const SelectLocation = ({ navigation }) => {
  const [isOpenZone, setIsOpenZone] = useState(false); // Dropdown cho Your Zone
  const [isOpenArea, setIsOpenArea] = useState(false); // Dropdown cho Your Area

  // State để lưu giá trị được chọn
  const [selectedZone, setSelectedZone] = useState('Banaree'); // Giá trị mặc định cho Your Zone
  const [selectedArea, setSelectedArea] = useState(''); // Giá trị mặc định cho Your Area

  // Danh sách tùy chọn cho Your Zone
  const zones = ['Banaree', 'Zone 1', 'Zone 2', 'Zone 3'];

  // Danh sách tùy chọn cho Your Area
  const areas = ['Area A', 'Area B', 'Area C'];

  // Hàm mở/đóng dropdown cho Your Zone
  const toggleZoneDropdown = () => {
    setIsOpenZone(!isOpenZone);
    if (isOpenArea) setIsOpenArea(false); // Đóng dropdown Your Area nếu đang mở
  };

  // Hàm mở/đóng dropdown cho Your Area
  const toggleAreaDropdown = () => {
    setIsOpenArea(!isOpenArea);
    if (isOpenZone) setIsOpenZone(false); // Đóng dropdown Your Zone nếu đang mở
  };

  // Hàm chọn giá trị cho Your Zone
  const selectZone = (zone) => {
    setSelectedZone(zone);
    setIsOpenZone(false); // Đóng dropdown sau khi chọn
  };

  // Hàm chọn giá trị cho Your Area
  const selectArea = (area) => {
    setSelectedArea(area);
    setIsOpenArea(false); // Đóng dropdown sau khi chọn
  };

  return (
      <SafeAreaView style={styles.selectLocationContainer}>
    {/* Nút back */}
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Icon name="arrow-back" size={37} color="#333" />
    </TouchableOpacity>

    {/* Nội dung chính */}
    <View style={styles.selectLocationContent}>
      <Image
        source={require('./image/GroceryUI/map.png')}
        style={styles.selectLocationBackground}
      />
      <Text style={styles.selectLocationTitle}>Select Your Location</Text>
      <Text style={styles.selectLocationSubtitle}>
        Switch on your location to stay in tune with what's happening in your area
      </Text>

      

      {/* Your Zone Dropdown */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Your Zone</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleZoneDropdown}
        >
          <Text style={styles.dropdownText}>
            {selectedZone || 'Select your zone'}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        {isOpenZone && (
          <View style={styles.dropdownList}>
            <FlatList
              data={zones}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectZone(item)}>
                  <Text style={styles.dropdownItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      {/* Your Area Dropdown */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Your Area</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleAreaDropdown}
        >
          <Text style={styles.dropdownText}>
            {selectedArea || 'Types of your area'}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        {isOpenArea && (
          <View style={styles.dropdownList}>
            <FlatList
              data={areas}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectArea(item)}>
                  <Text style={styles.dropdownItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    <TouchableOpacity
      style={styles.submitButton}
      onPress={() => navigation.navigate('LogIn')}
    >
      <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
};

// Màn hình Log In
const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.LogInContainer}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('./image/GroceryUI/carrot.png')}
          style={styles.logo}
        />
      </View>
      {/* Title */}
      <Text style={styles.LogIntitle}>Login</Text>
      <Text style={styles.LogInsubtitle}>Enter your emails and password</Text>

      {/* Email Input */}
      <Text style={styles.LogInlabel}>Email</Text>
      <TextInput
        style={styles.LogIninput}
        placeholder="you@example.com"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <Text style={styles.LogInlabel}>Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="********"
          placeholderTextColor="#999"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text style={styles.togglePassword}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Bottom Sign Up */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Màn hình Sign Up
const SignUp = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.SignUpContainer}>
      {/* Logo */}
      <View style={styles.SignUplogoContainer}>
        <Image
          source={require('./image/GroceryUI/carrot.png')}
          style={styles.SignUplogo}
        />
      </View>

      {/* Title */}
      <Text style={styles.SignUptitle}>Sign Up</Text>
      <Text style={styles.SignUpsubtitle}>Enter your credentials to continue</Text>

      {/* Username */}
      <Text style={styles.SignUplabel}>Username</Text>
      <TextInput
        style={styles.SignUpinput}
        placeholder="Enter your name"
        placeholderTextColor="#999"
      />

      {/* Email */}
      <Text style={styles.SignUplabel}>Email</Text>
      <TextInput
        style={styles.SignUpinput}
        placeholder="you@example.com"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      {/* Password */}
      <Text style={styles.SignUplabel}>Password</Text>
      <View style={styles.SignUppasswordInputContainer}>
        <TextInput
          style={styles.SignUppasswordInput}
          placeholder="********"
          placeholderTextColor="#999"
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text style={styles.SignUptogglePassword}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Terms */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>By continuing you agree to our</Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>and</Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Privacy Policy.</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already have account */}
      <View style={styles.loginRedirectContainer}>
        <Text style={styles.termsText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    top: 70,
    width: 50,
    height: 57,
    marginBottom: 40,
    alignSelf: 'center',
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
  backButton1: {
    position: 'absolute',
    top: -50,
    left: 20,
    zIndex: 1,
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

// Styles cho Select Location
selectLocationContainer: {
  flex: 1,
  backgroundColor: '#fff',
},
backButton: {
  position: 'absolute',
  top: 60,
  left: 20,
  zIndex: 1,
},
selectLocationContent: {
  flex: 1,
  width: '100%',
  padding: 10,
},
selectLocationBackground: {
  width: 224.69,
  height: 170.69,
  resizeMode: 'contain',
  marginVertical: 20,
  alignSelf: 'center',
},
selectLocationTitle: {
  fontSize: 26,
  fontWeight: '600',
  color: '#333',
  marginTop: 50,
  textAlign: 'center',
},
selectLocationSubtitle: {
  fontSize: 16,
  color: '#7C7C7C',
  marginTop: 10,
  marginBottom: 100,
  textAlign: 'center',
},
dropdownContainer: {
  padding: 20,
  width: '100%',
},
label: {
  fontSize: 14,
  color: '#999',
  marginBottom: 5,
},
dropdownButton: {
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  paddingVertical: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
dropdownText: {
  fontSize: 16,
  color: '#333',
},
dropdownArrow: {
  fontSize: 16,
  color: '#333',
},
dropdownList: {
  marginTop: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  backgroundColor: '#fff',
  maxHeight: 150, // Giới hạn chiều cao để tránh tràn
  overflow: 'hidden',
},
dropdownItem: {
  paddingVertical: 10,
  paddingHorizontal: 15,
  fontSize: 16,
  color: '#333',
},
submitButton: {
  backgroundColor: '#53B175', // màu xanh giống ảnh
  height: 70,
  borderRadius: 22,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
  marginHorizontal: 20, // canh đều 2 bên
},
submitButtonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4CAF50',
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 20,
  },
  switchText: {
    color: '#4CAF50',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },

  //Style Login
  LogInContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LogInlogoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  logo: {
    top: 70,
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  LogIntitle: {
    fontWeight: '600',
    fontSize: 26,
    marginLeft: 30,
    marginTop: 150,
  },
  LogInsubtitle: {
    fontSize: 16,
    marginLeft: 30,
    marginTop: 10,
    color: '#7C7C7C',
  },
  LogInlabel: {
    fontSize: 18,
    marginLeft: 30,
    marginTop: 40,
    color: '#7C7C7C',
  },
  LogIninput: {
    fontSize: 16,
    marginLeft: 30,
    marginTop: 15,
    width: 380,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#333',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 380,
  },
  passwordInput: {
    fontSize: 16,
    flex: 1,
    height: 30,
    color: '#333',
  },
  togglePassword: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  forgotPasswordContainer: {
    marginTop: 20,
    marginLeft: 280,
  },
  forgotPasswordText: {
    color: '#7C7C7C',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#53B175',
    width: 353,
    height: 63,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#181725',
  },
  signUpLink: {
    color: '#53B175',
    fontWeight: '500',
    marginLeft: 5,
  },

  //Style SignUp
  SignUpContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  SignUplogoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  SignUplogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  SignUptitle: {
    fontWeight: '600',
    fontSize: 26,
    marginLeft: 30,
    marginTop: 50,
  },
  SignUpsubtitle: {
    fontSize: 16,
    marginLeft: 30,
    marginTop: 10,
    color: '#7C7C7C',
  },
  SignUplabel: {
    fontSize: 18,
    marginLeft: 30,
    marginTop: 40,
    color: '#7C7C7C',
  },
  SignUpinput: {
    fontSize: 16,
    marginLeft: 30,
    marginTop: 15,
    width: 380,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#333',
  },
  SignUppasswordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 380,
  },
  SignUppasswordInput: {
    fontSize: 16,
    flex: 1,
    height: 30,
    color: '#333',
  },
  togglePassword: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  termsContainer: {
    flexDirection: 'row',
    marginLeft: 29,
    marginTop: 10,
  },
  termsText: {
    fontWeight: '500',
    color: '#181725',
  },
  linkText: {
    color: '#5eb078',
    marginLeft: 5,
    fontWeight: '500',
  },
  signUpButton: {
    backgroundColor: '#5eb078',
    width: 353,
    height: 67,
    marginLeft: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },

});


const Groceries_App_UI = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Started" component={Started} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="PhoneNumberInput" component={PhoneNumberInput} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Groceries_App_UI;