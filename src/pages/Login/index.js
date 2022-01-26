import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";

import { Input } from "react-native-elements";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("admin");
  const [senha, setSenha] = useState("admin");
  const navigation = useNavigation();
  const { setUsuario } = useContext(AuthContext);

  function Validar() {
    if (email == "admin" && senha == "admin") {
      navigation.navigate("Home");
      return true;
    } else {
      return false;
    }
  }

  function handleLogin() {
    if (Validar()) {
      setUsuario({
        email,
        senha,
      });
    } else {
      alert("Verifique as informações preenchidas.");
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView>
        <View>
          <Image
            source={require("../../assets/img/logo.png")}
            style={styles.img}
          />
        </View>
        <View>
          <Input onChangeText={setEmail} placeholder="Email" />
        </View>
        <View>
          <Input onChangeText={setSenha} placeholder="Senha" />
        </View>
        <View style={styles.btnFundo}>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.entrarbtn}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    resizeMode: "contain",
    marginTop: 60,
    width: "72%",
    height: 200,
    alignSelf: "center",
    marginBottom: 80,
  },
  entrarbtn: {
    paddingTop: 7,
    width: "100%",
    height: 45,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "#ccc",
    marginTop: 15,
    marginBottom: 10,
  },
  btnFundo: {
    width: "50%",
    alignSelf: "center",
  },
});
