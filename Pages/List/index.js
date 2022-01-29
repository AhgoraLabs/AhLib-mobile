import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Container, Livros, Text, Image, NoImage, ImageList, ScrollView } from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Placeholder, Loader } from "rn-placeholder";

//context
import { useBookContext } from "../Context/book";

//api
import { getCommentsBook } from "../../api/api";

function List({ navigation }) {
    const { providerBook, providerComments } = useBookContext();

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
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickBook = async item => {
        //set book to provider
        providerBook("set", item);
        //set comments to provider
        const comments = await getCommentsBook(item._id);
        providerComments("set", comments);
        navigation.navigate("Pagina do Livro");
    };

    const gridBooksRender = () => (
        <Container>
            {/* <ScrollView>
                {listBooks.map(item => (
                    <View key={item._id} style={{ paddingBottom: 30 }}>
                        <View style={{ elevation: 6 }}>
                            {item.image ? (
                                <Image
                                    source={{
                                        uri: item.image,
                                    }}
                                />
                            ) : (
                                <NoImage>Sem Imagem Disponível</NoImage>
                            )}
                        </View>

                        <Livros onPress={() => handleClickBook(item)}>
                            <Text color="#201A33" bold={true} size={14}>
                                {item.title}
                            </Text>
                        </Livros>
                    </View>
                ))}
            </ScrollView> */}
            <FlatList
                data={listBooks}
                contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", height: "120%" }}
                keyExtractor={listBooks => listBooks.title}
                renderItem={({ item }) => (
                    <View key={item._id} style={{ paddingBottom: 30 }}>
                        <View style={{ elevation: 6 }}>
                            {item.image ? (
                                <Image
                                    source={{
                                        uri: item.image,
                                    }}
                                />
                            ) : (
                                <NoImage>{item.title}</NoImage>
                            )}
                        </View>

                        <Livros onPress={() => handleClickBook(item)}>
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
                    onPress={() => handleClickBook(item)}
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
                    {normalModeList ? gridBooksRender() : listBooksRender()}
                </>
            )}
        </>
    );
}

export default List;
