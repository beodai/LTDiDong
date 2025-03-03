import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

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
              width: 28,
              height: 28,
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
    <Tab.Screen name="Cart" component={HomeStack} options={{ headerShown: false }} />
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
});

export default Test1;