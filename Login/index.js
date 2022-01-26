import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, BackHandler, Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView } from "./styles";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
        return () => backHandler.remove();
    }, []);

    const handleLogin = async (email, password) => {
        startImageRotateFunction();

        // try {
        //     const settings = {
        //         method: "POST",
        //         body: JSON.stringify({
        //             email: "pablo.bion@hotmail.com",
        //             password: "1XBdcJzo",
        //         }),
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json",
        //         },
        //     };

        //     const response = await fetch("http://sound-aileron-337523.rj.r.appspot.com/users/auth", settings);
        //     const responseData = await response.json();
        //     const { error, message } = responseData;
        //     const { token } = responseData.data;

        //     console.log(message);

        //     if (error || !token) {
        //         alert(message);
        //         return;
        //     }

        //     await AsyncStorage.setItem("@token", token);
        //     await navigation.navigate("Início");
        // } catch (err) {}
    };

    let rotateValueHolder = new Animated.Value(0);

    const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {});
    };

    const rotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Animated.Image
                    style={{
                        resizeMode: "contain",
                        height: 100,
                        width: 200,
                        transform: [{ rotate: rotateData }],
                    }}
                    source={require("../assets/onlylogo.png")}
                />
                <Text style={{ fontSize: 40, color: "#494949" }}>AhLib</Text>
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
