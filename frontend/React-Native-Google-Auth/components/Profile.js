import { View, Text, StyleSheet } from 'react-native';

const Profile = ({data}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>

      <View style={styles.details}>
        <Text>Class: {data.class_}</Text>
        <Text>Age: {data.age}</Text>
        <Text>Favorite Food: {data.favorite_food}</Text>
        <Text>Favorite Color: {data.favorite_color}</Text>  
      </View>

    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
        margin: 20,
        backgroundColor: "#ffff",
    width: 300
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  details: {
    marginVertical: 10
  }
});
export default Profile;


