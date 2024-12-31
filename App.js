import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.login}>Đăng nhập</Text>
      <Text style={styles.txtNhapsdt}>Nhập số điện thoại</Text>
      <Text style={styles.login1}>Dùng số điện thoại để đăng nhập hoặc đăng ký tài tại OneHousing Pro</Text>
      <TextInput style = {styles.txtInput}
                  placeholder="Nhập số điện thoại của bạn"
                  keyboardType="numeric"></TextInput>
      <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingLeft: 30,
    paddingRight: 30,
    fontWeight: 'bold',
  },
  login: {
    fontSize: 25,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    marginBottom: 50,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  txtNhapsdt: {
    marginBottom: 20,
    fontSize: 20,
  },
  
  login11: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingLeft: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  txtInput: {
    marginTop: 20,
    marginBottom: 140,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
