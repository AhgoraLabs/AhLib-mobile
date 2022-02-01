import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Stories, Text, ImageStorie, ModalStorie, Button } from "./styles";
import styled from "styled-components/native";

export default function Home({ navigation }) {
    return (
        <View>
            <View>
                <Text>Bem vindo ao AH Library seu merdass</Text>
                <Stories horizontal={true}>
                    <ModalStorie>
                        <ImageStorie style={{ borderWidth: 1, borderColor: "thistle", borderRadius: 50 }} source={require("../../assets/person1.jpg")} />
                    </ModalStorie>
                    <ModalStorie>
                        <ImageStorie source={require("../../assets/person1.jpg")} />
                    </ModalStorie>
                    <ModalStorie>
                        <ImageStorie source={require("../../assets/person1.jpg")} />
                    </ModalStorie>
                    <ModalStorie>
                        <ImageStorie source={require("../../assets/person1.jpg")} />
                    </ModalStorie>
                    <ModalStorie>
                        <ImageStorie source={require("../../assets/person1.jpg")} />
                    </ModalStorie>
                </Stories>
                <Button onPress={() => navigation.navigate("Lista de Livros")}>
                    <Text>Lista de Livros (BETA)</Text>
                </Button>
            </View>
        </View>
    );
}
