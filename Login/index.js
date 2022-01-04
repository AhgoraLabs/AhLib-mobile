import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, Button, TouchableOpacity, AsyncStorage } from "react-native";
import React, { useState } from "react";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (email, password) => {
        try {
            const settings = {
                method: "POST",
                body: JSON.stringify({
                    email: "pablo.bion@hotmail.com",
                    password: "1XBdcJzo",
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch("http://ahlib.herokuapp.com/users/auth", settings);
            const responseData = await response.json();
            const { error, message } = responseData;
            const { token } = responseData.data;
            //token deve ser salvo no app, provavelmente com local storage.
            //isso porque o token deve ser enviado junto no momento de criar o livro, porque precisamos verificar se quem, está mandando o livro é de fato o acesso da recepcionista.

            try {
                await AsyncStorage.setItem("@token", token);
            } catch (e) {
                // saving error
            }

            if (error) {
                alert(message);
                return;
            }

            navigation.navigate("home");
        } catch (err) {}
    };

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.container}>
                <Image
                    style={{
                        resizeMode: "contain",
                        height: 100,
                        width: 200,
                    }}
                    source={require("../assets/logoAhgora.png")}
                />
            </View>

            <View style={styles.containerLogo}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCorrect={false}
                    onChangeText={value => {
                        setEmail(value);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={value => {
                        setPassword(value);
                    }}
                />
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => {
                        handleLogin(email, password);
                    }}
                >
                    <Text style={styles.submitText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    containerLogo: {
        flex: 1,
        justifyContent: "center",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 50,
    },
    input: {
        backgroundColor: "#FFF",
        marginBottom: 15,
        color: "#222",
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        width: 250,
    },
    btnSubmit: {
        backgroundColor: "lightblue",
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        width: 250,
    },
    submitText: {
        color: "#FFF",
        fontSize: 15,
        borderRadius: 7,
        marginBottom: 10,
    },
    btnRegister: {
        marginTop: 10,
    },
    registerText: {
        color: "#FFF",
        marginLeft: "35%",
    },
});
