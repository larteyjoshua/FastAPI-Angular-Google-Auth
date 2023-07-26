import React, {useContext} from 'react';
import { View, Text,StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { AuthContext } from '../context/AuthContext';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const HeaderTitle = () => {
    const authContext = useContext(AuthContext);
  return (
    <View style = {styles.container} >
      <Text style = {styles.titleText}>{authContext?.authState?.username } </Text>
      <MaterialCommunityIcons name="logout-variant" size={24} color="black" onPress={() =>authContext.logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      color: "#FFFF",
      height: 'auto',
      flexWrap: 'wrap',
      width: screenWidth,
       flexDirection: 'row',
    },
    titleText: {
        fontSize: 15,
        color: '#000',
        fontStyle: 'italic',
    },
   
  });

export default HeaderTitle;
