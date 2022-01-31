import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

import { Container, Modal, Button, CameraView, LineBar, TextInput, Input } from "./styles";

export default function CameraComponent({ navigation }) {
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const isFocused = useIsFocused();
    const [isbnText, setIsbnText] = useState("");
    
        

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const getPerIsbn = async ({ type, data }) => {
        setLoading(true);
        try {
            const response = await fetch(`http://ahlib.herokuapp.com/books/isbn/${data}`);
            const responseData = await response.json();
            setScanned(true);
            setLoading(false);
            console.logv 
            navigation.navigate("Cadastro de Livro", { data: { ...responseData, data } });
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetPerIsbnText = (dataIsbn) => {
        if (dataIsbn === "") return navigation.navigate("Cadastro de Livro");
        if (dataIsbn.length < 10) return alert("Isbn precisa ter 10 ou mais números e não pode ser vazio.");
        getPerIsbn({ data: dataIsbn });
        setIsbnText("");
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
                        <Text style={{ color: "black", fontSize: 24, textAlign: "center" }}>Você deseja scanear um novo livro?</Text>
                        <Button onPress={() => setScanned(false)}>
                            <Text style={{ color: "white", fontSize: 24 }}>Scanear novo livro</Text>
                        </Button>
                    </Modal>
                )}
                {!scanned && !loading && (
                    <>
                        <LineBar />
                        <Text style={{ color: "white", fontSize: 20, marginTop: 20, textAlign: "center" }}>Coloque o código de barras na area indicada</Text>
                        <Input placeholder="Digite o ISBN" autoCorrect={false} keyboardType="numeric" onChangeText={(value) => setIsbnText(value)} />
                        <Button
                            onPress={() => {
                                handleGetPerIsbnText(isbnText);
                                setScanned(false);
                            }}
                        >
                            <Text style={{ color: "white" }}>Buscar livro</Text>
                        </Button>
                        <Text
                            style={{ color: "white", marginTop: 20 }}
                            onPress={() => {
                                navigation.navigate("Cadastro de Livro");
                            }}
                        >
                            Cadastrar um novo livro
                        </Text>
                        
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
