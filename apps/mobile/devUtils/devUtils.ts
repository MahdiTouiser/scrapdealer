import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearAuthToken = async () => {
  await AsyncStorage.removeItem('auth_token');
  console.log('auth_token cleared!');
};
