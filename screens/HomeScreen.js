import React from 'react';
import { View, Text, StyleSheet,ScrollView, TextInput, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.explorerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explorer</Text>
        <Icon name="filter" size={20} color="#666" />
      </View>
      <TextInput style={styles.searchInput} placeholder="Search for meals or area" />
      <Text style={styles.sectionTitle}>Top Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        <View style={styles.category}>
          <Image source={{ uri: 'https://storage.googleapis.com/a1aa/image/T2WtkOexAvaWHkwuOurl7EXsNO0PD1J4HDFllXD73vA.jpg' }} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Pizza</Text>
        </View>
        <View style={styles.category}>
          <Image source={{ uri: 'https://storage.googleapis.com/a1aa/image/M3lNgVPphxUu9EEwcDmJsYQof3ySYq7xH0hl_tACWv0.jpg' }} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Burgers</Text>
        </View>
        <View style={styles.category}>
          <Image source={{ uri: 'https://storage.googleapis.com/a1aa/image/1H3AsB3hwSFsf1aoyME7SwiIpVFbLH0bp5eGj4mpEKU.jpg' }} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Steak</Text>
        </View>
        <View style={styles.category}>
          <Image source={{ uri: 'https://storage.googleapis.com/a1aa/image/PeQFwUsF4St_O0ON9f1Vi_edwOuMDaXZFXGNemdKeHY.jpg' }} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Category</Text>
        </View>
      </ScrollView>
      <Text style={styles.sectionTitle}>Popular Items</Text>
      <View style={styles.itemsContainer}>
        <View style={styles.item}>
          <Image source={{ uri: 'https://storage.googleapis.com/a1aa/image/y7uNWm6PJbsn8dPXPLSPRKCEf-VIT38XBXKOkECAkEc.jpg' }} style={styles.itemImage} />
          <Text style={styles.itemTitle}>Food 1</Text>
          <Text style={styles.itemSubtitle}>By Viet Nam</Text>
          <Text style={styles.itemPrice}>1$</Text>
        </View>
        <View style={styles.item}>
          <Image source={{ uri: 'https://storage.googleapis.com/a1aa/image/GrOGILEHZJaWl9kJfOnyb-S4IuTzHCHni8na_O7dWQ4.jpg' }} style={styles.itemImage} />
          <Text style={styles.itemTitle}>Food 2</Text>
          <Text style={styles.itemSubtitle}>By Viet Nam</Text>
          <Text style={styles.itemPrice}>1$</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Popular Items</Text>
      <View style={styles.itemsContainer}>
        <View style={styles.item}>
          <Image source={{ uri: 'https://storage.googleapis.com/a1aa/image/KuwN3tDlv5NE7bsgVgon_WgU3YuKhzwmDIqwsNEGYX8.jpg' }} style={styles.itemImage} />
          <Text style={styles.itemTitle}>Food 3</Text>
          <Text style={styles.itemSubtitle}>By Viet Nam</Text>
          <Text style={styles.itemPrice}>1$</Text>
        </View>
        <View style={styles.item}>
          <Image source={{ uri: 'https://storage.googleapis.com/a1aa/image/FjPoETDFsZ2oAuii47BWoZ1AyiDIA67FUAiJKQCS5pg.jpg' }} style={styles.itemImage} />
          <Text style={styles.itemTitle}>Food 4</Text>
          <Text style={styles.itemSubtitle}>By Viet Nam</Text>
          <Text style={styles.itemPrice}>1$</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  signInContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    color: 'orange',
    textAlign: 'right',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  facebookButton: {
    backgroundColor: '#3b5998',
    marginLeft: 10,
  },
  facebookButtonText: {
    color: 'white',
  },
  signUpText: {
    textAlign: 'center',
  },
  signUpLink: {
    color: 'orange',
  },
  explorerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
  category: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    textAlign: 'center',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  accountContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  accountHeader: {
    width: '100%',
    height: 150,
    backgroundColor: '#3b82f6',
  },
  accountContent: {
    padding: 20,
    alignItems: 'center',
  },
  accountName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountRole: {
    color: '#3b82f6',
    marginBottom: 10,
  },
  accountDescription: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;