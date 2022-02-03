import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Container, Div, Input, Button } from "./styles";
import { Placeholder, Loader } from "rn-placeholder";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useBookContext } from "../Context/book";

function Books({ route, navigation }) {
    const { fetchBookList } = useBookContext();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (route?.params?.data) setData(route?.params?.data);
    }, [route]);

    const handleChangeData = (key, value) => setData({ ...data, [key]: value });

    const handleSendBook = async () => {
        const body = data;
        setLoading(true);

        if (!data.title || !data.isbn) {
            alert("Necessário título e ISBN");
            setLoading(false);
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
            setLoading(false);

            if (responseData.error) {
                console.log(responseData);
                alert("Houve problema ao cadastrar livro");
                return false;
            }

            alert("Livro cadastrado com sucesso!");
            setData({});
            fetchBookList();
            navigation.navigate("Lista de Livros");
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <Container>
            {loading ? (
                <View style={{ display: "flex", alignItems: "center" }}>
                    <Placeholder style={{ marginTop: 100 }} Animation={props => <Loader {...props} size="large" color="gray" />} />
                    <Text style={{ color: "white" }}>Cadastrando Livro</Text>
                </View>
            ) : (
                <>
                    <Div>
                        <Text style={{ color: "white", fontSize: 25, marginBottom: 20 }}>Dados do livro</Text>
                    </Div>
                    <TouchableOpacity onPress={() => setData({})} style={{ marginBottom: 20, width: 300, marginLeft: 20, backgroundColor: "#333", width: 150, padding: 10, borderRadius: 10 }}>
                        <Text style={{ color: "white", fontSize: 16, marginLeft: 7 }}>Limpar Campos</Text>
                    </TouchableOpacity>
                    <Div>
                        <Input color="whitesmoke" placeholderTextColor="gray" placeholder="ISBN" defaultValue={data.isbn} onChangeText={value => handleChangeData("isbn", value)}></Input>
                        <Input color="whitesmoke" placeholderTextColor="gray" placeholder="Título" defaultValue={data.title} onChangeText={value => handleChangeData("title", value)}></Input>
                        <Input color="whitesmoke" placeholderTextColor="gray" placeholder="Autor" defaultValue={data.author} onChangeText={value => handleChangeData("author", value)}></Input>
                        <Input color="whitesmoke" placeholderTextColor="gray" placeholder="Editora" defaultValue={data.publisher} onChangeText={value => handleChangeData("publisher", value)}></Input>
                        <Input color="whitesmoke" placeholderTextColor="gray" placeholder="Pages" defaultValue={data.pages} onChangeText={value => handleChangeData("pages", value)}></Input>
                        <Input color="whitesmoke" placeholderTextColor="gray" placeholder="Idioma" defaultValue={data.language} onChangeText={value => handleChangeData("language", value)}></Input>

                        <Input
                            defaultValue={data.description}
                            height={150}
                            underlineColorAndroid="transparent"
                            placeholder="Descrição"
                            color="whitesmoke"
                            placeholderTextColor="gray"
                            numberOfLines={10}
                            multiline={true}
                            onChange={target => handleChangeData("description", target.target.value)}
                        ></Input>
                        <Button color={loading ? "gray" : "#8257E5"} disabled={loading} onPress={() => handleSendBook()}>
                            <Text style={{ color: "white", fontSize: 18 }}>Enviar</Text>
                        </Button>
                    </Div>
                </>
            )}
        </Container>
    );
}

export default Books;
