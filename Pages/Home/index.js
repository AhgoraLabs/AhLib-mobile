import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
    return (
        <View style={styles.background}>
            <Image
                style={{
                    resizeMode: "cover",
                    height: "20%",
                    width: "100%",
                }}
                source={require("../../assets/imgAhgora.png")}
            />
            <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate("Camera")}>
                <Text style={styles.submitText}>Escanear Código de Barras</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#2e2e2e",
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
