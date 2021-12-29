import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, Button, TouchableOpacity } from "react-native";
import React from "react";

export default function Login({ navigation }) {
    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.container}>
                <Image
                    style={{
                        resizeMode: "contain",
                        height: 100,
                        width: 200,
                    }}
                    source={require("../assets/iconAhgora.png")}
                />
            </View>

            <View style={styles.containerLogo}>
                <TextInput style={styles.input} placeholder="Email" autoCorrect={false} onChangeText={() => {}} />
                <TextInput style={styles.input} placeholder="Senha" autoCorrect={false} onChangeText={() => {}} />
                <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate("Home")}>
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
        backgroundColor: "#404040",
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
        backgroundColor: "#3b3b3b",
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
