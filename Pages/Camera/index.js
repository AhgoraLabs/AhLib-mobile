import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

import { Container, Modal, Button, CameraView, LineBar } from "./styles";

export default function CameraComponent({ navigation }) {
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const getPerIsbn = async ({ type, data }) => {
        setLoading(true);

        try {
            const isbn = data;
            const response = await fetch(`http://ahlib.herokuapp.com/books/isbn/${isbn}`);
            const responseData = await response.json();
            setScanned(true);
            setLoading(false);
            navigation.navigate("Book", { data: { isbn, ...responseData.volumeInfo } });
        } catch (error) {
            console.log(error);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <Container>
            {scanned && <TouchableOpacity title={"Scanear novamente"} onPress={() => setScanned(false)} color="#3b3b3b" />}
            <CameraView>
                {isFocused && <Camera onBarCodeScanned={scanned ? undefined : getPerIsbn} style={StyleSheet.absoluteFillObject} />}
                {scanned && !loading && (
                    <Modal style={{ backgroundColor: "white", height: 100 }}>
                        <Text style={{ color: "black", fontSize: 24 }}>Você deseja scanear um novo livro?</Text>
                        <Button onPress={() => setScanned(false)}>
                            <Text style={{ color: "white", fontSize: 24 }}>Scanear novo livro</Text>
                        </Button>
                    </Modal>
                )}
                {!scanned && !loading && (
                    <>
                        <LineBar />
                        <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>Coloque o código de barras na area indicada</Text>
                    </>
                )}
                {loading && (
                    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
                        <Image style={{ marginTop: 30 }} source={require("../../assets/loading2.gif")} />
                    </View>
                )}
            </CameraView>
        </Container>
    );
}

const styles = StyleSheet.create({
    barcodebox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 500,
        overflow: "hidden",
        borderRadius: 30,
    },
});
