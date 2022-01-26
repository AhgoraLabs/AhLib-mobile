import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from "react-native";

export default function Home({ navigation }) {
    return (
        <View style={styles.background}>
            <Image style={{ marginTop: 30 }} source={require("../../assets/logoAhgora.png")} />
            <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate("Código de Barras")}>
                <Text style={styles.submitText}>Escanear Código de Barras</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate("Lista de Livros")}>
                <Text style={styles.submitText}>Escanear Código de Barras</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
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
