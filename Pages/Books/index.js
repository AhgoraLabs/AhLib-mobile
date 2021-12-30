import React from "react";
import { Container, Div, Label, Input, Button } from "./styles";
import { View, Text, StyleSheet, TextInput, flatList } from "react-native";

function Books() {
    return (
        <Container>
            <Div>
                <Label size={30} color="#494949">
                    Dados do livro
                </Label>
            </Div>

            <Div>
                <Input placeholder="ISBN"></Input>
                <Input placeholder="Título"></Input>
                <Input placeholder="Sub-titulo"></Input>
                <Input placeholder="Autor"></Input>
                <Input placeholder="Editora"></Input>
                <Input placeholder="Data de publicação"></Input>
                <Input placeholder="Total de paginas"></Input>
                <Input placeholder="Imagem"></Input>
                <Input placeholder="Idioma"></Input>
                <Input height={150} underlineColorAndroid="transparent" placeholder="Descrição" placeholderTextColor="grey" numberOfLines={10} multiline={true}></Input>
                <Button>
                    <Label color="white">Enviar</Label>
                </Button>
            </Div>
        </Container>
    );
}

export default Books;
