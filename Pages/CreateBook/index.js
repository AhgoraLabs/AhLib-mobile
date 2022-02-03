import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Container, Div, Label, Input, Button } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import { useBookContext } from "../Context/book";

function Books({ route }) {
    const { fetchBookList } = useBookContext();
    const [data, setData] = useState({});

    useEffect(() => {
        console.log(route?.params?.data);
        if (route?.params?.data) setData(route?.params?.data);
    }, [route]);

    const handleChangeData = (key, value) => setData({ ...data, [key]: value });

    const handleSendBook = async () => {
        const body = data;
        fetchBookList();

        if (!data.title || !data.isbn) {
            alert("Necessário título e ISBN");
            return false;
        }

        try {
            //const token = await AsyncStorage.getItem("@token");
            const response = await fetch("http://sound-aileron-337523.rj.r.appspot.com/books/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    //auth: token,
                },
                body: JSON.stringify(body),
            });

            const responseData = await response.json();

            if (responseData.error) {
                console.log(responseData);
                alert("Houve problema ao cadastrar livro");
                return false;
            }
            alert("Livro cadastrado com sucesso!");
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Div>
                <Label size={30} color="white">
                    Dados do livro
                </Label>
            </Div>
            <Label onPress={() => setData({})} color="white" style={{ marginBottom: 20, width: 300, marginLeft: 20, backgroundColor: "#333", width: 150, padding: 10, borderRadius: 10 }}>
                Limpar Campos
            </Label>
            <Div>
                <Input placeholderTextColor="whitesmoke" placeholder="ISBN" defaultValue={data.data} onChangeText={value => handleChangeData("isbn", value)}></Input>
                <Input placeholderTextColor="whitesmoke" placeholder="Título" defaultValue={data.title} onChangeText={value => handleChangeData("title", value)}></Input>
                <Input placeholderTextColor="whitesmoke" placeholder="Autor" defaultValue={data.author} onChangeText={value => handleChangeData("author", value)}></Input>
                <Input placeholderTextColor="whitesmoke" placeholder="Editora" defaultValue={data.publisher} onChangeText={value => handleChangeData("publisher", value)}></Input>
                <Input placeholderTextColor="whitesmoke" placeholder="Pages" defaultValue={data.language} onChangeText={value => handleChangeData("pages", value)}></Input>
                <Input placeholderTextColor="whitesmoke" placeholder="Idioma" defaultValue={data.language} onChangeText={value => handleChangeData("language", value)}></Input>

                <Input
                    defaultValue={data.description}
                    height={150}
                    underlineColorAndroid="transparent"
                    placeholder="Descrição"
                    placeholderTextColor="whitesmoke"
                    numberOfLines={10}
                    multiline={true}
                    onChange={target => handleChangeData("description", target.target.value)}
                ></Input>
                <Button onPress={() => handleSendBook()}>
                    <Label color="white">Enviar</Label>
                </Button>
            </Div>
        </Container>
    );
}
const styles = StyleSheet.create({
    dateComponent: {
        fontSize: 50,
        backgroundColor: "white",
        color: "#000000",
        borderRadius: 15,
        marginBottom: 15,
        width: 330,
        marginLeft: -3,
    },
});
export default Books;
