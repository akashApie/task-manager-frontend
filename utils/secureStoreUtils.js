import * as SecureStore from "expo-secure-store";

export async function saveToSecureStore(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Error saving ${key} to SecureStore:`, error);
  }
}

export async function getFromSecureStore(key) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Error retrieving ${key} from SecureStore:`, error);
    return null;
  }
}

export async function deleteFromSecureStore(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error deleting ${key} from SecureStore:`, error);
  }
}
