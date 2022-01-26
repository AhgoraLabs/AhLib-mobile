import React, { useEffect, useState } from "react";
import { Text, FlatList, View } from "react-native";
import { Container, Livros } from "./styles";

function List() {
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
    const livro = () => <Text> pablito </Text>;
    return (
        <Container>
            <FlatList
                data={listBooks}
                keyExtractor={listBooks => listBooks.title}
                renderItem={({ item }) => (
                    <Livros>
                        <Text>asd asd</Text>
                    </Livros>
                )}
            ></FlatList>
        </Container>
    );
}

export default List;
