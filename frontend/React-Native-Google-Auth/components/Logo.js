import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import coverLogo from '../assets/appIcon.png';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Logo = () => {
  return (
    <View>
     <View style ={styles.imageArea}>
    <Image source={coverLogo} style= {styles.coverImage} resizeMode='stretch'/>
    <Text style={styles.appName}>AREA EXPLORER</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    imageArea: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth*0.60 ,
        height: screenHeight * 0.3,
        flexDirection: 'column',
    },
        coverImage: {
        display: 'flex',
        width: screenWidth *0.30,
        height: screenHeight * 0.15,
    },
    appName: {
          color: '#000',
          fontSize: 30,
          display: 'flex',
          justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
        }
  });

export default Logo;
