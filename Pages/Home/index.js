import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Stories, Text, ImageStorie, ModalStorie, Button } from "./styles";
import styled from "styled-components/native";

export default function Home({ navigation }) {
    return (
        <View style={{ padding: 10 }}>
            <Stories horizontal={true}>
                <ModalStorie>
                    <ImageStorie style={{ borderWidth: 1, borderColor: "thistle", borderRadius: 50 }} source={require("../../assets/person1.jpg")} />
                    <Text uppercase={true} style={{ marginTop: 10, marginLeft: 3 }}>
                        DEV
                    </Text>
                </ModalStorie>
                <ModalStorie>
                    <ImageStorie source={require("../../assets/person1.jpg")} />
                    <Text uppercase={true} style={{ marginTop: 10, marginLeft: 3 }}>
                        SUP
                    </Text>
                </ModalStorie>
                <ModalStorie>
                    <ImageStorie source={require("../../assets/person1.jpg")} />
                    <Text uppercase={true} style={{ marginTop: 10, marginLeft: 3 }}>
                        FIN
                    </Text>
                </ModalStorie>
                <ModalStorie>
                    <ImageStorie source={require("../../assets/person1.jpg")} />
                </ModalStorie>
                <ModalStorie>
                    <ImageStorie source={require("../../assets/person1.jpg")} />
                </ModalStorie>
            </Stories>
            <Button onPress={() => navigation.navigate("Lista de Livros")}>
                <Text>Acessar todos os livros</Text>
            </Button>
        </View>
    );
}
