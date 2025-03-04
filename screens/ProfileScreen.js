import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../AppContext';

const ProfileScreen = () => {
  const { setIsLoggedIn } = useContext(AppContext);

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hung Nguyen</Text>
      <Text style={styles.subtitle1}>Mobile developer</Text>
      <Text style={styles.subtitle2}>I have above 5 years of experience in native mobile apps development, now i'm learning React Native</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle1: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#64c3df',
  },
  subtitle2: {
    width: 299,
    fontSize: 16,
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

export default ProfileScreen;