import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import React from "react";
import Home from "../Pages/Home/index";
import { NavigationContainer } from "@react-navigation/native";

export default function Login({ navigation }) {
    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.container}>
                <Image source={require("../src/assets/ImgAhgoraLabs.png")} />
            </View>

            <View style={styles.containerLogo}>
                <TextInput style={styles.input} placeholder="Email" autoCorrect={false} onChangeText={() => {}} />
                <TextInput style={styles.input} placeholder="Senha" autoCorrect={false} onChangeText={() => {}} />
                <TouchableOpacity style={styles.btnSubmit}>
                    <Text style={styles.submitText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister}>
                    <Text style={styles.registerText}>Criar Conta</Text>
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
        backgroundColor: "#191919",
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
        width: 250,
        height: 50,
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
        backgroundColor: "#400080",
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
