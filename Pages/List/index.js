import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Loader, Placeholder } from "rn-placeholder";
//api
import { getCommentsBook } from "../../api/api";
//context
import { useBookContext } from "../Context/book";
import { Container, Image, ImageList, Livros, NoImage, NoImageList, Text } from "./styles";

function List({ navigation, route }) {
    const { setBookContext, providerComments, fetchBookList, bookList } = useBookContext([]);
    const [normalModeList, setNormalModeList] = useState(false);

    useEffect(() => {
        handleFetchBookList();
    }, []);

    const handleFetchBookList = () => {
        fetchBookList();
    };

    const handleClickBook = async item => {
        navigation.navigate("Pagina do Livro");
        setBookContext(item);
        const comments = await getCommentsBook(item._id);
        providerComments("set", comments);
    };

    const randomColor = {
        0: "#FFCB00",
        1: "#FF8A00",
        2: "#FF5E00",
        3: "#F1948A",
        4: "#D2B4DE",
        5: "#A9CCE3",
        6: "#A3E4D7",
        7: "#F9E79F",
        8: "#F5CBA7",
        9: "#CCD1D1",
        10: "#52BE80",
    };

    const colorBackground = "#222";

    const gridBooksRender = () => (
        <Container>
            {bookList && bookList.length > 0 && (
                <FlatList
                    numColumns={2}
                    data={bookList}
                    contentContainerStyle={{ paddingBottom: 500, backgroundColor: colorBackground, alignItems: "center", justifyContent: "space-between" }}
                    keyExtractor={() => {
                        return new Date().getTime().toString() + Math.floor(Math.random() * Math.floor(new Date().getTime())).toString();
                    }}
                    renderItem={({ item }) => (
                        <View key={item._id} style={{ display: "flex", alignItems: "center" }}>
                            <View style={{ elevation: 6 }}>
                                {item.image ? (
                                    <Image
                                        source={{
                                            uri: item.image,
                                        }}
                                    />
                                ) : (
                                    <NoImage color={randomColor[Math.floor(Math.random() * 10)]}>{item.title}</NoImage>
                                )}
                            </View>

                            <Livros onPress={() => handleClickBook(item)}>
                                <Text color="white" bold={true} size={14}>
                                    {item.title}
                                </Text>
                            </Livros>
                        </View>
                    )}
                ></FlatList>
            )}
        </Container>
    );

    const listBooksRender = () => {
        return bookList && bookList.length > 0 ? (
            <FlatList
                data={bookList}
                numColumns={1}
                keyExtractor={bookList => bookList._id}
                contentContainerStyle={{ backgroundColor: colorBackground, paddingBottom: 200 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item._id}
                        style={{
                            backgroundColor: "#333",
                            padding: 10,
                            borderRadius: 10,
                            display: "flex",
                            elevation: 1,
                            margin: 10,
                        }}
                        onPress={() => handleClickBook(item)}
                    >
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            {item.image ? (
                                <ImageList
                                    source={{
                                        uri: item.image,
                                    }}
                                />
                            ) : (
                                <NoImageList color={randomColor[Math.floor(Math.random() * 10)]}>
                                    <Text size={9}>{item.title}</Text>
                                </NoImageList>
                            )}

                            <Text color="white" size={18} bold={true} style={{ width: 250 }}>
                                {item.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            ></FlatList>
        ) : (
            <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Placeholder style={{ marginTop: 300 }} Animation={props => <Loader {...props} size="large" color="gray" />} />
                <Text color="white">Carregando listagem de livros</Text>
            </View>
        );
    };

    return (
        <View style={{ backgroundColor: colorBackground }}>
            {bookList && bookList.length === 0 ? (
                <Placeholder style={{ marginTop: 100 }} Animation={props => <Loader {...props} size="large" color="gray" />} />
            ) : (
                <>
                    <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10, flexDirection: "row", backgroundColor: colorBackground }}>
                        <TouchableOpacity onPress={handleFetchBookList} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcons style={{ marginRight: 5 }} name="refresh" color="gray" size={30} />
                            <Text color="white">{bookList ? bookList.length : 0} Livros encontrados</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setNormalModeList(!normalModeList)}>
                            <MaterialCommunityIcons style={{ marginLeft: 5 }} name={normalModeList ? "view-headline" : "view-grid-outline"} color="gray" size={30} />
                        </TouchableOpacity>
                    </View>

                    {normalModeList ? gridBooksRender() : listBooksRender()}
                </>
            )}
        </View>
    );
}

export default List;
