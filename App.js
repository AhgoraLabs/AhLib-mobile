import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
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
        try {
            const requestOptions = JSON.stringify({
                method: "POST",
                headers: {
                    "api-key": "100216A23C5AEE390338BBD19EA86D29",
                    "Content-Type": "application/json",
                },
                body: {
                    search: "9788551002490",
                },
            });

            const response = await fetch("https://isbn-search-br.search.windows.net/indexes/isbn-index/docs/search?api-version=2016-09-01", requestOptions);
            const data = await response.json();
        } catch (err) {}

        alert(`O código de barras ${data} foi escaneado! `);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
            {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});
