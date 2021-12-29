import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Camera() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);
    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
    };

    if (hasPermission === null) {
        return <Text>Requer permissão da camera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso a camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Button onPress={handleBarCodeScanned} title="Button" />
            <View style={styles.barcodebox}>
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
                {scanned && <TouchableOpacity title={"Scanear novamente"} onPress={() => setScanned(false)} color="#3b3b3b" />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#404040",
    },
    barcodebox: {
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
        width: 500,
        overflow: "hidden",
        borderRadius: 30,
        backgroundColor: "#222",
    },
});
