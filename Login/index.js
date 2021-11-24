import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function Login() {
    return (
        <View style={styles.container}>
            <Image source={require("..src/assets/splash.png")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#312e38",
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        color: "#fff",
    },
});
