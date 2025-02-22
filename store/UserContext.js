import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const INITIAL_STATE = {
  mobile: "",
  name: "",
  dob: "",
  address: "",
  aadharUrl: "",
  panUrl: "",
  selfieUrl: "",
  mpin: "",
  fingerprint: false,
};

export const UserContext = createContext({
  userData: INITIAL_STATE,
  setUserData: (data = {}) => {},
  signup: async () => {},
  login: async ({ mobile, mpin }) => {},
  logout: () => {},
  isLoading: true,
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Load data from AsyncStorage when the app starts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
          setUserData(JSON.parse(storedData)); // ✅ Restore saved user data
        }
      } catch (error) {
        console.error("❌ Failed to load user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  // 🔹 Save user data to AsyncStorage whenever it changes
  const updateUserData = async (newData) => {
    try {
      const updatedData = { ...userData, ...newData };
      setUserData(updatedData);
      await AsyncStorage.setItem("userData", JSON.stringify(updatedData)); // ✅ Persist data
    } catch (error) {
      console.error("❌ Failed to save user data:", error);
    }
  };

  const signup = async () => {
    const response = await axios.post(
      "http://192.168.105.118:4000/signup",
      userData
    );
    if (response.status === 200) {
      return true;
    } else {
      console.error("❌ Signup failed");
      return false;
    }
  };

  const login = async ({ mobile, mpin }) => {
    const response = await axios.post("http://192.168.105.118:4000/login", {
      mobile,
      mpin,
    });
    if (response.status === 200) {
      updateUserData(response.data.user);
      return true;
    } else {
      console.error("❌ Login failed");
      return false;
    }
  };

  // 🔹 Logout Function (Clears AsyncStorage & State)
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userData"); // ❌ Clear AsyncStorage
      setUserData(INITIAL_STATE); // ❌ Reset state to initial values
    } catch (error) {
      console.error("❌ Failed to log out:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData: updateUserData,
        signup,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
