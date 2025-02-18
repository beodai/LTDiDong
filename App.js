import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert 
} from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Hàm kiểm tra số điện thoại có hợp lệ không
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (phoneRegex.test(phone.replace(/\s/g, ''))) {
      setErrorMessage('');
      return true;
    } else {
      setErrorMessage('Số điện thoại không hợp lệ!');
      return false;
    }
  };

  // Hàm xử lý khi nhấn button
  const handleSubmit = () => {
    if (validatePhoneNumber(phoneNumber)) {
      Alert.alert("Thành công", "Số điện thoại hợp lệ! Tiếp tục đăng nhập.");
    } else {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại hợp lệ.");
    }
  };

  // Hàm xử lý nhập và tự động format số điện thoại
  const handlePhoneNumberChange = (input) => {
    let formatted = input.replace(/\D/g, ''); // Xóa tất cả ký tự không phải số

    if (formatted.length > 10) {
      formatted = formatted.slice(0, 10); // Giới hạn 10 ký tự
    }

    // Tự động thêm khoảng trắng theo nhóm 4-3-3 (0987 654 321)
    if (formatted.length > 7) {
      formatted = formatted.replace(/(\d{4})(\d{3})(\d{0,3})/, '$1 $2 $3');
    } else if (formatted.length > 4) {
      formatted = formatted.replace(/(\d{4})(\d{0,3})/, '$1 $2');
    }

    setPhoneNumber(formatted);
    validatePhoneNumber(formatted);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inner}>
          <Text style={styles.login}>Đăng nhập</Text>
          <Text style={styles.txtNhapsdt}>Nhập số điện thoại</Text>
          <Text style={styles.login1}>
            Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
          </Text>
          <TextInput
            style={[styles.txtInput, errorMessage ? styles.inputError : null]}
            placeholder="Nhập số điện thoại của bạn"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  login: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  txtNhapsdt: {
    fontSize: 20,
    marginBottom: 10,
  },
  login1: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 20,
  },
  txtInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#737373',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
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