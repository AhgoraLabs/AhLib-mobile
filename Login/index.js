import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, BackHandler, Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView } from "./styles";
import { Placeholder, Loader } from "rn-placeholder";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        startImageRotateFunction();
        startFade();
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
        return () => backHandler.remove();
    }, []);

    const handleLogin = async (email, password) => {
        setLoading(true);
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

            const response = await fetch("http://sound-aileron-337523.rj.r.appspot.com/users/auth", settings);
            const responseData = await response.json();
            const { error, message } = responseData;
            const { token } = responseData.data;

            console.log(message);

            if (error || !token) {
                alert(message);
                return;
            }
            setLoading(false);
            await AsyncStorage.setItem("@token", token);
            await navigation.navigate("Início");
            //await navigation.navigate("book");
        } catch (err) {
            console.log(err);
        }
    };

    let [rotateValueHolder] = useState(new Animated.Value(0));

    const startImageRotateFunction = () => {
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {});
    };

    const rotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const [fadeAnim] = useState(new Animated.Value(0));

    const startFade = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
        }).start();
    };

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
                <Animated.Image
                    style={{
                        resizeMode: "contain",
                        height: 100,
                        width: 200,
                        opacity: fadeAnim,
                    }}
                    source={require("../assets/ahlib.png")}
                ></Animated.Image>
            </View>

            {loading ? (
                <View style={{ height: 80 }}>
                    <Placeholder style={{ marginTop: 100 }} Animation={props => <Loader {...props} size="large" color="gray" />} />
                </View>
            ) : (
                <View style={{ height: 80 }}></View>
            )}

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
