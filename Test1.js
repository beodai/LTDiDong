import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { CreditCard, Apple, ArrowLeft } from "lucide-react-native";
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
    return (
        <View style={styles.containerHome}>
          <ScrollView>
            <View style={styles.headerHome}>
              <View>
                <Text style={styles.greeting}>Hello 👋</Text>
                <Text style={styles.name}>Christie Doe</Text>
              </View>
              <Image source={require('./image/img-ava.png')} style={styles.profileImage} />
            </View>
    
            <Text style={styles.sectionTitle}>Your Insights</Text>
            <View style={styles.grid}>
              {/** Các ô insights **/}
              <View style={styles.card}>
                <Image source={require('./icon/icon-scannew.png')} />
                <Text style={styles.cardTitle}>Scan new</Text>
                <Text style={styles.cardSubtitle}>Scanned 483</Text>
              </View>
              <View style={styles.card}>
                <Image source={require('./icon/bg-counterfeits.png')} />
                <Text style={styles.cardTitle}>Counterfeits</Text>
                <Text style={styles.cardSubtitle}>Counterfeited 32</Text>
              </View>
              <View style={styles.card}>
                <Image source={require('./icon/bg-success.png')} />
                <Text style={styles.cardTitle}>Success</Text>
                <Text style={styles.cardSubtitle}>Checkouts 8</Text>
              </View>
              <View style={styles.card}>
                <Image source={require('./icon/bg-directory.png')} />
                <Text style={styles.cardTitle}>Directory</Text>
                <Text style={styles.cardSubtitle}>History 26</Text>
              </View>
            </View>
    
            <View style={styles.exploreMore}>
              <Text style={styles.sectionTitle}>Explore More</Text>
              <Icon name="arrow-right" size={20} color="#6B7280" />
            </View>
    
            {/** Hàng 3 ảnh **/}
            <View style={styles.imageRow}>
              <Image source={require('./image/expm-img1.png')} style={styles.exploreImage} />
              <Image source={require('./image/expm-img2.png')} style={styles.exploreImage} />
              <Image source={require('./image/expm-img3.png')} style={styles.exploreImage} />
            </View>
          </ScrollView>
        </View>
      );
    
};

const ScanScreen = ({ navigation }) => {
    useEffect(() => {
        const parent = navigation.getParent();
        parent?.setOptions({ tabBarStyle: { display: 'none' } });
    
        return () => {
          parent?.setOptions({
            tabBarStyle: {
              height: 80,
              backgroundColor: '#FFFFFF',
              borderRadius: 40,
              shadowColor: '#000',
              shadowOffset: { width: 4, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            },
          });
        };
      }, [navigation]);
    
      return (
        <View style={styles.containerScan}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="indigo" />
          </TouchableOpacity>
    
          <View style={styles.scanArea}>
            <Image source={require('./image/screen-img.png')} style={styles.bottleImage} />
            <View style={styles.scanOverlay}>
              <View style={styles.scanBorder}></View>
              <Image source={require('./image/scan-image.png')} style={styles.scanImage} />
            </View>
          </View>
    
          <View style={styles.infoContainer}>
            <Image source={require('./image/info-img.png')} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.subtitle}>Lauren's</Text>
              <Text style={styles.title}>Orange Juice</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      );
};


const CheckoutScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const shakeAnim = new Animated.Value(0);

  const handleExpiryChange = (text) => {
    let formattedText = text.replace(/[^0-9]/g, "");
    if (formattedText.length > 2) {
      formattedText = formattedText.slice(0, 2) + "/" + formattedText.slice(2, 4);
    }
    setExpiry(formattedText);
  };

  const handlePayment = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
    navigation.navigate("PaymentSuccess");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.header}>Checkout 💳</Text>
        <Text style={styles.amount}>₹ 1,527</Text>
        <Text style={styles.taxInfo}>Including GST (18%)</Text>

        <View style={styles.paymentOptionsContainer}>
          <View style={styles.paymentOptions}>
            <TouchableOpacity style={[styles.paymentButton, styles.creditCard]}>
              <CreditCard color="white" size={20} />
              <Text style={styles.paymentText}>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.paymentButton, styles.applePay]}>
              <Apple size={20} />
              <Text style={styles.applePayText}>Apple Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.cardNumber}>Card number</Text>
        <View style={styles.cardInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
            maxLength={19}
          />
          <View style={styles.cardIcons}>
            <Image source={require("./image/mastercard.png")} style={styles.mastercardLogo} />
            <Image source={require("./image/visa.png")} style={styles.visacardLogo} />
          </View>
        </View>
        <Text style={styles.cardNumber}>Cardholder name</Text>
        <TextInput style={styles.input} placeholder="Cardholder Name" value={name} onChangeText={setName} />
        <View style={styles.inputRow}>
          <View style={styles.smallInputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Expiry date</Text>
            </View>
            <TextInput
              style={[styles.input, styles.smallInput]}
              placeholder="MM/YY"
              value={expiry}
              onChangeText={handleExpiryChange}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
          <View style={styles.smallInputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>CVV / CVC</Text>
              <Image source={require("./image/hint.png")} style={styles.helpIcon} />
            </View>
            <TextInput
              style={[styles.input, styles.smallInput]}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
        </View>
        
        <Text style={styles.infoText}>We will send you an order details to your email after the successful payment</Text>

        <Animated.View style={[styles.payButtonWrapper, { transform: [{ translateX: shakeAnim }] }]}> 
          <TouchableOpacity style={styles.payButton} onPress={handlePayment} >
            <Image source={require("./image/lock.png")} style={styles.lockIcon} />
            <Text style={styles.payButtonText}>Pay for the order</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const PaymentSuccess = ({navigation}) => {
  return (
    <View style={styles.containerSuccess}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
      <Image
        source={require('./image/Success_Payment.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Payment Success, Yayy!</Text>
      <Text style={styles.subtitle}>
        we will send order details and invoice in your contact no. and registered email
      </Text>
      <TouchableOpacity>
        <Text style={styles.checkDetails}>
          Check Details <FontAwesome name="arrow-right" size={14} color="#1E90FF" />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ScanStack = () => (
    <Stack.Navigator>
    <Stack.Screen
      name="Scan"
      component={ScanScreen}
      options={{ 
        headerShown: false, 
        tabBarStyle: { display: 'none' }  // Ẩn Bottom Tab
      }}  
    />
  </Stack.Navigator>
);

const CheckoutStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Checkout" 
      component={CheckoutScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="PaymentSuccess" 
      component={PaymentSuccess} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let icon;
        if (route.name === 'Home') {
          icon = require('./icon/icon-home.png');
        } else if (route.name === 'Noti') {
          icon = require('./icon/icon-noti.png');
        } else if (route.name === 'Scan') {
          icon = require('./icon/icon-scan.png');
        } else if (route.name === 'History') {
          icon = require('./icon/icon-history.png');
        } else if (route.name === 'Cart') {
          icon = require('./icon/icon-cart.png');
        }

        return (
          <Image
            source={icon}
            style={{
              width: 22,
              height: 23,
              tintColor: focused ? '#3B82F6' : '#C4C4C4',
            }}
          />
        );
      },
      tabBarStyle: {
        height: 80,
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="Noti" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="Scan" component={ScanStack} options={{ headerShown: false }} />
    <Tab.Screen name="History" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="Cart" component={CheckoutStack} options={{ headerShown: false }} />
  </Tab.Navigator>
  );
  

const Test1 = () => {
    return (
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      );    
  };
  

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerHome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 50,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    color: '#6B7280',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  card: {
    backgroundColor: '#F8FAFC',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: '600',
    marginTop: 8,
  },
  cardSubtitle: {
    color: '#6B7280',
  },
  exploreMore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  containerScan: {
    flex: 1,
    backgroundColor: '#eadece',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  scanArea: {
    position: 'relative',
    width: '100%',
    maxWidth: 300,
    aspectRatio: 1 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanImage: {
    width: '83%',
    height: '40%',
    bottom: -110,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  scanBorder: {
    width: '85%',
    height: '65%',
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 20,
    position: 'absolute',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 80,
    width: '90%',
    maxWidth: 320,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#d69974',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 35,
    elevation: 4,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'indigo',
    padding: 8,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  exploreImage: {
    width: '30%',
    height: 100,
    borderRadius: 8,
  },
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FB",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  amount: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2ECC71",
    textAlign: "right",
    bottom: 50,
  },
  taxInfo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
    textAlign: "right",
    bottom: 40,
  },
  paymentOptionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
  },
  creditCard: {
    backgroundColor: "#2ECC71",
    marginRight: 10,
  },
  applePay: {
    backgroundColor: "#f1f1f1",
  },
  paymentText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
  },
  applePayText: {
    color: "#000",
    marginLeft: 8,
    fontWeight: "bold",
  },
  cardInputContainer: {
    position: "relative",
  },
  cardIcons: {
    position: "absolute",
    right: 10,
    top: 14,
    flexDirection: "row",
  },
  mastercardLogo: {
    width: 27,
    height: 16,
    marginLeft: 5,
  },
  visacardLogo: {
    width: 28,
    height: 23,
    marginLeft: 5,
  },
  cardNumber: {
    fontWeight: "bold",
    marginBottom: 5,
    left: 5,
    fontSize: 17,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  helpIcon: {
    width: 18,
    height: 18,
  },
  infoText: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 50,
    width: 220,
    left: 84,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  smallInputContainer: {
    flex: 1,
    marginHorizontal: 2,
  },
  smallInput: {
    width: "90%",
  },
  payButtonWrapper: {
    marginTop: 20,
  },
  payButton: {
    backgroundColor: "#2ECC71",
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  lockIcon: {
    width: 17,
    height: 22,
    marginRight: 17,
  },
  payButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },


  containerSuccess: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  checkDetails: {
    color: '#1E90FF',
    marginBottom: 30,
  },
  downloadButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Test1;