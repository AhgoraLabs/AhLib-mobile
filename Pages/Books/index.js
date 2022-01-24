import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Container, Div, Label, Input, Button } from "./styles";
import { AsyncStorage } from "react-native";
import moment from "moment";
function Books({ route }) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (route?.params?.data) setData(route?.params?.data);
    }, [route]);

    //obrigatorios
    /*
        title 
        isbn
        data dd/mm/yyyy
    */

    const handleChangeData = (key, value) => setData({ ...data, [key]: value });

    const handleSendBook = async () => {
        const body = data;
        const momentDate = data.publishDate ? moment(new Date("Mar 14, 2017")).format("DD/MM/YYYY") : false;
        body.publishDate = momentDate;
        console.log(momentDate);

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
                <Label size={30} color="#494949">
                    Dados do livro
                </Label>
            </Div>
            <Label onPress={() => setData({})} color="black" style={{ marginBottom: 20, width: 300 }}>
                Limpar Campos
            </Label>
            <Div>
                <Input placeholder="ISBN" defaultValue={data.isbn} onChangeText={value => handleChangeData("isbn", value)}></Input>
                <Input placeholder="Título" defaultValue={data.title} onChangeText={value => handleChangeData("title", value)}></Input>
                <Input placeholder="Sub-titulo" defaultValue={data.subtitle} onChangeText={value => handleChangeData("subtitle", value)}></Input>
                <Input placeholder="Autor" defaultValue={data.author} onChangeText={value => handleChangeData("author", value)}></Input>
                <Input placeholder="Editora" defaultValue={data.publisher} onChangeText={value => handleChangeData("publisher", value)}></Input>
                <Input placeholder="Idioma" defaultValue={data.language} onChangeText={value => handleChangeData("language", value)}></Input>
                <Input
                    defaultValue={data.description}
                    height={150}
                    underlineColorAndroid="transparent"
                    placeholder="Descrição"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    onChange={target => handleChangeData("description", target.target.value)}
                ></Input>
                <Input placeholder="Total de paginas" defaultValue={data.pages} onChangeText={value => handleChangeData("pages", value)}></Input>
                <Input placeholder="Imagem" defaultValue={data.imageLinks?.image} onChangeText={value => handleChangeData("image", value)}></Input>
                {/* <Image style={{ width: "100%", height: "50%" }} source={{ uri: "https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg" }} /> */}
                <Input placeholder="Idioma" defaultValue={data.language} onChangeText={value => handleChangeData("language", value)}></Input>
                <Input
                    defaultValue={data.description}
                    height={150}
                    underlineColorAndroid="transparent"
                    placeholder="Descrição"
                    placeholderTextColor="grey"
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
