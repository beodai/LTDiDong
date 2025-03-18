// import React, { createContext, useState } from 'react';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra trạng thái đăng nhập khi mở app
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem('isLoggedIn');
        if (storedStatus !== null) {
          setIsLoggedIn(JSON.parse(storedStatus));
        }
      } catch (error) {
        console.error('Lỗi khi lấy trạng thái đăng nhập:', error);
      }
    };
    checkLoginStatus();
  }, []);

  // Cập nhật trạng thái đăng nhập vào AsyncStorage
  const updateLoginStatus = async (status) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(status));
      setIsLoggedIn(status);
    } catch (error) {
      console.error('Lỗi khi lưu trạng thái đăng nhập:', error);
    }
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn: updateLoginStatus }}>
      {children}
    </AppContext.Provider>
  );
};
