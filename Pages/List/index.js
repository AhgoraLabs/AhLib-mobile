import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Container, Livros, Text, Image } from "./styles";

function List({ navigation }) {
    const [listBooks, setListBooks] = useState({});

    useEffect(() => {
        handleGetBooks();
    }, []);

    const handleGetBooks = async () => {
        try {
            //const token = await AsyncStorage.getItem("@token");
            const response = await fetch("http://sound-aileron-337523.rj.r.appspot.com/books/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const responseData = await response.json();
            setListBooks(responseData.data);
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <FlatList
                data={listBooks}
                contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}
                keyExtractor={listBooks => listBooks.title}
                renderItem={({ item }) => (
                    <Livros onPress={() => navigation.navigate("Pagina do Livro", { data: item })}>
                        <Text>{item.title}</Text>
                        <Image
                            source={{
                                uri: item.image,
                            }}
                        />
                    </Livros>
                )}
            ></FlatList>
        </Container>
    );
}

export default List;
