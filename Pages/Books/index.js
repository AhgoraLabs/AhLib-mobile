import React, { useEffect, useState } from "react";
import { Container, Div, Label, Input, Button } from "./styles";
import { View, Text, StyleSheet, TextInput, flatList, AsyncStorage } from "react-native";

function Books({ route }) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (route?.params?.data) {
            console.log(route?.params?.data);
            setData(route?.params?.data);
            console.log(data);
        }
    }, [route]);

    const handleClick = async () => {
        try {
            const token = await AsyncStorage.getItem("@token");
            console.log(data);
            // const response = await fetch(`http://ahlib.herokuapp.com/books/isbn/${data.isbn}`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Accept: "application/json",
            //         auth: token,
            //     },
            // });

            // const responseData = await response.json();
            // console.log(responseData);
        } catch (err) {}
    };

    return (
        <Container>
            <Div>
                <Label size={30} color="#494949">
                    Dados do livro
                </Label>
            </Div>
            <Label onPress={() => setData({})} color="black" style={{ marginLeft: "70%", marginBottom: 20 }}>
                Limpar Campos
            </Label>
            <Div>
                <Input placeholder="ISBN" defaultValue={data.isbn}></Input>
                <Input placeholder="Título" defaultValue={data.title}></Input>
                <Input placeholder="Sub-titulo" defaultValue={data.subtitle}></Input>
                <Input placeholder="Autor" defaultValue={data.authors}></Input>
                <Input placeholder="Editora" defaultValue={data.publisher}></Input>
                <Input placeholder="Data de publicação" defaultValue={data.publishedDate}></Input>
                <Input placeholder="Total de paginas" defaultValue={data.pageCount}></Input>
                <Input placeholder="Imagem" defaultValue={data.imageLinks?.thumbnail}></Input>
                <Input placeholder="Idioma" defaultValue={data.language}></Input>
                <Input defaultValue={data.description} height={150} underlineColorAndroid="transparent" placeholder="Descrição" placeholderTextColor="grey" numberOfLines={10} multiline={true}></Input>
                <Button onPress={() => handleClick()}>
                    <Label color="white">Enviar</Label>
                </Button>
            </Div>
        </Container>
    );
}

export default Books;
