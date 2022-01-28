import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Container, Livros, Text, Image, ImageList } from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade, Loader, Shine, ShineOverlay } from "rn-placeholder";

function List({ navigation }) {
    const [listBooks, setListBooks] = useState([]);
    const [normalModeList, setNormalModeList] = useState(true);

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

    const normalBooksRender = () => (
        <Container>
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
                            <Text color="#201A33" bold={true} size={14}>
                                {item.title}
                            </Text>
                        </Livros>
                    </View>
                )}
            ></FlatList>
        </Container>
    );

    const listBooksRender = () => (
        <FlatList
            style={{ marginTop: 10 }}
            data={listBooks}
            numColumns={1}
            contentContainerStyle={{}}
            keyExtractor={listBooks => listBooks.title}
            renderItem={({ item }) => (
                <TouchableOpacity
                    key={item._id}
                    style={{
                        backgroundColor: "white",
                        padding: 10,
                        borderRadius: 10,
                        display: "flex",
                        elevation: 1,
                        margin: 10,
                    }}
                    onPress={() => navigation.navigate("Pagina do Livro", { data: item })}
                >
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <ImageList
                            source={{
                                uri: item.image,
                            }}
                        />
                        <Text color="#201A33" size={18} bold={true}>
                            {item.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        ></FlatList>
    );

    return (
        <>
            {listBooks.length === 0 ? (
                <Placeholder style={{ marginTop: 100 }} Animation={props => <Loader {...props} size="large" color="gray" />} />
            ) : (
                <>
                    <TouchableOpacity
                        onPress={() => setNormalModeList(!normalModeList)}
                        style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 20, marginTop: 5, flexDirection: "row" }}
                    >
                        <MaterialCommunityIcons style={{ marginLeft: 5 }} name={normalModeList ? "view-headline" : "view-grid-outline"} color="gray" size={30} />
                    </TouchableOpacity>
                    {normalModeList ? normalBooksRender() : listBooksRender()}
                </>
            )}
        </>
    );
}

export default List;
