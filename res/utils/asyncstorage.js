import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  let storeValue = value;
  if (typeof value !== 'string') {
    storeValue = JSON.stringify(value);
  }
  try {
    await AsyncStorage.setItem(key, storeValue);
    console.debug('store data:', value);
  } catch (e) {
    console.debug('saving error:', e);
  }
};

export const getData = async (key, isObject = false) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.debug('read data:', key);
    if (isObject) {
      return value != null ? JSON.parse(value) : null;
    }
    return value;
  } catch (e) {
    console.debug('reading error:', e);
  }
};

export const removeData = async (keys) => {
  try {
    if (!Array.isArray(keys)) {
      keys = [keys];
    }
    for (var i = 0; i < keys.length; ++i) {
      await AsyncStorage.removeItem(keys[i]);
    }
  } catch (e) {
    console.debug('removing error:', e);
  }
  console.debug('removing done:', keys);
};
