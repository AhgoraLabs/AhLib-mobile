import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Container, Livros, Text, Image } from "./styles";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

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
            {/* <ContentLoader viewBox="0 80 380 650" backgroundColor="lightgray">
                <Rect x="0" y="40" rx="4" ry="4" width="170" height="280" />
                <Rect x="200" y="40" rx="4" ry="4" width="170" height="280" />
            </ContentLoader> */}

            <FlatList
                data={listBooks}
                numColumns={1}
                contentContainerStyle={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                keyExtractor={listBooks => listBooks.title}
                renderItem={({ item }) => (
                    <View key={item._id} style={{ paddingBottom: 30 }}>
                        <Image
                            source={{
                                uri: item.image,
                            }}
                        />
                        <Livros onPress={() => navigation.navigate("Pagina do Livro", { data: item })}>
                            <Text color="white" bold={true} size={14}>
                                {item.title}
                            </Text>
                        </Livros>
                    </View>
                )}
            ></FlatList>
        </Container>
    );
}

export default List;
