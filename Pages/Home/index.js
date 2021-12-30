import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from "react-native";

export default function Home({ navigation }) {
    const getPerIsbn = async () => {
        try {
            const isbn = "9788547000240";
            const response = await fetch(`http://ahlib.herokuapp.com/books/isbn/${isbn}`);
            const responseData = await response.json();

            navigation.navigate("Book", { data: { isbn, ...responseData.volumeInfo } });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.background}>
            <Button onPress={getPerIsbn} title="Button" />
            <Image style={{ marginTop: 30 }} source={require("../../assets/logoAhgora.png")} />
            <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate("Camera")}>
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
