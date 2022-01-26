import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from "react-native";

export default function Home({ navigation }) {
    return (
        <View style={styles.background}>
            <Image
                style={{
                    resizeMode: "contain",
                    height: 100,
                    width: 200,
                    marginTop: 30,
                }}
                source={require("../../assets/onlylogo.png")}
            />
            <Image
                style={{
                    resizeMode: "contain",
                    height: 100,
                    width: 160,
                }}
                source={require("../../assets/ahlib.png")}
            ></Image>
            <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate("Lista de Livros")}>
                <Text style={styles.submitText}>Lista de Livros (BETA)</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        alignItems: "center",
    },
    btnSubmit: {
        backgroundColor: "#c5c5c5",
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        width: 250,
        top: "50%",
    },
});
