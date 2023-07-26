import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";
import { Feather } from "@expo/vector-icons";
import { useMutation } from "react-query";
import Spinner from "../components/Spinner";
import Logo from "../components/Logo";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Icon from "react-native-vector-icons/FontAwesome";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const windowWidth = Dimensions.get("window").width;
const inputWidth = windowWidth * 0.8;



const useGoogleAuth = () => {
  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
  };

  

  
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: '',
    clientId: '',
    expoClientId: '',
    iosClientId:''
,    scopes: ["profile", "email", "openid"],
    redirectUri: makeRedirectUri({
      scheme: 'com.joshualartey.reactrativegoogleruth',
      preferLocalhost: true,
      isTripleSlashed: true,

    }),
    discovery,
  });
 
  return {
    request,
    response,
    promptAsync,
  };
};

export { useGoogleAuth };

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleView, setToggleView] = useState(true);
  const [status, setStatus] = useState(false);
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const { promptAsync, response } = useGoogleAuth();

  const LoginWithGoogleAuth = async (token) => {
    const loggedData = {
      token: token,
    };
    try {
      const response = await publicAxios({
        method: "post",
        url: "verify-google-auth",
        data: loggedData,
      });
      setStatus(false);
      const email = response.data.email;
      authContext.setAuthState({
        accessToken: "Google-Bearer" + " " + token,
        authenticated: true,
        username: email,
        loading: status,
      });
    } catch (err) {
      setStatus(false);
      Alert.alert("Login Failed", err.message);
      authContext.setAuthState({
        accessToken: null,
        authenticated: false,
        username: null,
        loading: status,
      });
    }
  };

  const signIn = async () => {
    await promptAsync({showInRecents: true});
  };

  if (response?.type === "success") {
    LoginWithGoogleAuth(response.params.id_token);
  }

  const onForgetPassword = async () => {
    navigation.navigate("ResetPassword");
  };

  const { mutate: LoginFunction } = useMutation(
    async () => {
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      return await publicAxios({
        method: "post",
        url: "/login",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    {
      onSuccess: (response) => {
        setStatus(false);
        const token = response.data.access_token;
        authContext.setAuthState({
          accessToken: "User-Bearer" + " " + token,
          authenticated: true,
          username: username,
          loading: status,
        });
      },
      onError: (err) => {
        setStatus(false);
        Alert.alert("Login Failed", err.message);
        authContext.setAuthState({
          accessToken: null,
          authenticated: false,
          username: null,
          username: null,
          loading: status,
        });
      },
    }
  );

  if (status) {
    return <Spinner />;
  }

  const onLogin = async () => {
    setStatus(true);
    if (username.includes("@") && password.length >= 8) {
      LoginFunction();
    } else {
      setStatus(false);
      Alert.alert("Login Failed", "Please Enter Your Details Entered");
    }
  };

  const updateSecureEntry = () => {
    setToggleView(!toggleView);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Pressable>
          <TouchableWithoutFeedback>
            <View style={styles.loginFormArea}>
              <Logo />
              <Text style={styles.wText}>Log into Your Account</Text>
              <View animation={"lightSpeedIn"} style={styles.userInputArea}>
                <View style={styles.userInput}>
                  <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={(username) => setUsername(username)}
                    defaultValue={username}
                  />
                  <View style={styles.emailIcon}>
                    <FontAwesome name="user-o" size={24} color="#000" />
                  </View>
                </View>

                <View style={styles.userInput}>
                  <TextInput
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.input}
                    secureTextEntry={toggleView ? true : false}
                    onChangeText={(password) => setPassword(password)}
                    defaultValue={password}
                  />
                  <View style={styles.emailIcon}>
                    <MaterialIcons name="lock" size={24} color="#000" />
                  </View>
                </View>
                <View style={styles.passwordEye}>
                  <TouchableOpacity onPressIn={updateSecureEntry}>
                    {toggleView ? (
                      <Feather name="eye-off" size={20} color="#000" />
                    ) : (
                      <Feather name="eye" size={20} color="#000" />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.loginButton}>
                  <Pressable style={styles.button} onPress={() => onLogin()}>
                    <Text style={styles.lText}>Login</Text>
                  </Pressable>

                  <TouchableOpacity style={styles.Gbutton} onPress={signIn}>
                    <View style={styles.iconContainer}>
                      <Icon name="google" size={20} color="#FFFFFF" />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.lText}>Sign in with Google</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Text style={styles.fText} onPress={() => onForgetPassword()}>
                  Forget password?
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006994",
  },

  loginFormArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop:40
  },

  wText: {
    fontSize: 22,
    justifyContent: "center",
    textAlign: "center",
    color: "#000",
  },

  userInputArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 5,
  },

  userInput: {
    marginTop: 30,
    height: 40,
    borderWidth: 1,
    borderRadius: 14,
    width: inputWidth,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFFF",
  },

  input: {
    paddingLeft: 40,
  },

  emailIcon: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignContent: "flex-end",
    position: "absolute",
    paddingLeft: 10,
  },

  loginButton: {
    marginTop: 20,
    display: "flex",
    gap: 20,
  },
  lText: {
    fontSize: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#FFF",
  },
  button: {
    borderRadius: 14,
    backgroundColor: "#006998",
    width: inputWidth,
    width: inputWidth,
    height: 40,
  },

  fText: {
    marginTop: 12,
    fontSize: 20,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    color: "#006998",
  },

  passwordEye: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignContent: "flex-end",
    position: "absolute",
    right: 10,
    top: 110,
  },

  Gbutton: {
    flexDirection: "row",
    backgroundColor: "#006998",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 40,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default Login;
