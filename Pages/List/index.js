import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Container, Livros, Text, Image, NoImage, ImageList, ScrollView, NoImageList } from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Placeholder, Loader } from "rn-placeholder";

//context
import { useBookContext } from "../Context/book";

//api
import { getCommentsBook, getBooks } from "../../api/api";

function List({ navigation }) {
    const { providerBook, providerComments, providerBookList } = useBookContext([]);
    // const dataBookList = providerBookList("get");
    const [listBooks, setListBooks] = useState([]);
    const [normalModeList, setNormalModeList] = useState(false);

    useEffect(() => {
        handleGetBooks();
    }, []);

    // useEffect(() => {
    //     setListBooks(dataBookList);
    // }, [dataBookList]);

    const handleGetBooks = async () => {
        const response = await getBooks();
        setListBooks(response);
        //providerBookList("set", response);
    };

    const handleClickBook = async item => {
        console.log(item);
        //set book to provider
        providerBook("set", item);
        //set comments to provider
        const comments = await getCommentsBook(item._id);
        providerComments("set", comments);
        navigation.navigate("Pagina do Livro");
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

    const gridBooksRender = () => (
        <Container>
            <FlatList
                numColumns={2}
                data={listBooks}
                contentContainerStyle={{ paddingBottom: 100, backgroundColor: "#082032", alignItems: "center", justifyContent: "space-between" }}
                keyExtractor={() => {
                    return new Date().getTime().toString() + Math.floor(Math.random() * Math.floor(new Date().getTime())).toString();
                }}
                renderItem={({ item }) => (
                    <View key={item._id} style={{ paddingBottom: 30, display: "flex", alignItems: "center" }}>
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
                        {item.image ? (
                            <ImageList
                                source={{
                                    uri: item.image,
                                }}
                            />
                        ) : (
                            <NoImageList>
                                <Text size={10}>{item.title}</Text>
                            </NoImageList>
                        )}

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
