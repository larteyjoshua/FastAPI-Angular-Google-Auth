import React, { useContext, useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, Pressable, ScrollView } from "react-native";

import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import { AxiosContext } from "../context/AxiosContext";
import { useIsFocused } from "@react-navigation/native";
import Profile from "../components/Profile";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Dashboard = () => {
  const isFocused = useIsFocused();
  const { authAxios } = useContext(AxiosContext);
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState(false);
  const [page, SetPage] = useState(1);
  const [size, SetSize] = useState(10);
  let randomNum = 0;

  function addOne() {
  randomNum++;
  return randomNum;
}

  const { refetch: getStudents } = useQuery(
    "students",
    async () => {
      setStatus(true);
      return await authAxios.get(`students?page=${page}&size=${size}`);
    },
    {
      enabled: false,
      retry: 1,

      onSuccess: (res) => {
        setStudents(res?.data.results);
        setStatus(false);
      },
      onError: (err) => {
        Alert.alert("Failure", err.message);
        setStatus(false);
      },
    }
  );
  useEffect(() => {
    getStudents();
  }, [isFocused]);

  if (status) {
    return <Spinner />;
  }
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Pressable>
      {students &&
            students.map((student) => <Profile key={addOne()} data={student} />)}
        </Pressable>
        </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006994",
  },
});
export default Dashboard;
