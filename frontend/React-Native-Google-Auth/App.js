import React, { useContext, useEffect } from "react";
import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { AxiosProvider } from "./context/AxiosContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from 'react-native-safe-area-context';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true
    }
  }
});

export default function App() {
   
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AxiosProvider>
          <SafeAreaProvider>
        <View style={styles.container}>
            <StatusBar style="auto" />
              <Layout />
            </View>
        </SafeAreaProvider>

          </AxiosProvider>
        </AuthProvider>
      </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex:1,
    justifyContent: "center",
      backgroundColor: "#006994",
   
  },
});
