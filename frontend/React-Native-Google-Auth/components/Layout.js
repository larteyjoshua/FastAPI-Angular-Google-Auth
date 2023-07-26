import React, {useContext, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, Dimensions } from "react-native";
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from './HeaderTilte';

const Stack = createNativeStackNavigator();
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Layout = () => {
  const authContext = useContext(AuthContext);
  return (
      <SafeAreaView>
    <View style={styles.container}>
    <NavigationContainer >
    <Stack.Navigator >

{(authContext?.authState?.authenticated)? (
   <Stack.Group screenOptions={{ headerTitle: (prop) => <HeaderTitle {...prop} />
      }}>

    <Stack.Screen name= "Dashboard" component={Dashboard}  />
</Stack.Group>
  ) : (
<Stack.Group screenOptions={{ headerShown: false
   }}>
<Stack.Screen name="Login" component={Login} />
  </Stack.Group>
  )}

    </Stack.Navigator>
            </NavigationContainer>
      </View>
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
     display: "flex",
    height: screenHeight,
    width: screenWidth,
    justifyItems: 'center',
    justifyContent:'center',
  
  },
});
export default Layout;
