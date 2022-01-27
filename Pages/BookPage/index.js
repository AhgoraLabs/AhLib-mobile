import React, { useEffect, useState } from "react";
import { Container, BackgroundColorHead, Image, Text, FooterView } from "./styles";
import { View, ScrollView, TouchableOpacity, Button } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function List({ route }) {
    const [BookData, setBookData] = useState({});
    const [sizeDescription, setSizeDescription] = useState(16);

    useEffect(() => {
        setBookData(route.params.data);
    }, [route]);

    return (
        <>
            <ScrollView>
                <Container>
                    <BackgroundColorHead />
                    <Image
                        source={{
                            uri: BookData.image,
                        }}
                    />
                    <Text style={{ marginTop: 20 }} bold={true} size={24} uppercase={true} color="#201A33">
                        {BookData.title}
                    </Text>

                    <Text color="gray">By: {BookData.author}</Text>

                    <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around", marginTop: 20 }}>
                        <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text color="gray">Editora</Text>
                            <Text size={16} bold={true} color="#201A33">
                                {BookData.publisher}
                            </Text>
                        </View>
                        <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text color="gray">Idioma</Text>
                            <Text size={16} bold={true} color="#201A33">
                                {BookData.language}
                            </Text>
                        </View>
                        <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text color="gray">Páginas</Text>
                            <Text size={16} bold={true} color="#201A33">
                                {BookData.pages}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", paddingLeft: 30, paddingRight: 30, marginTop: 15 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Text size={26} bold={true} color="#201A33">
                                Descrição
                            </Text>
                            <Text color="#494949" style={{ marginLeft: 30 }}>
                                Fonte
                            </Text>
                            <TouchableOpacity style={{ marginLeft: 10, marginRight: 20 }} onPress={() => setSizeDescription(sizeDescription + 2)}>
                                <MaterialCommunityIcons name="plus" color="#494949" size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSizeDescription(sizeDescription - 2)}>
                                <MaterialCommunityIcons name="minus" color="#494949" size={20} />
                            </TouchableOpacity>
                        </View>
                        <Text size={sizeDescription} style={{ textAlign: "justify" }} color="gray">
                            {BookData.description}
                        </Text>
                    </View>
                </Container>
            </ScrollView>
            <FooterView>
                <View style={{ display: "flex", paddingTop: 5, justifyContent: "space-around", flexDirection: "row" }}>
                    <Button title="alugar livro beta"></Button>
                    <Button title="comentar"></Button>
                </View>
            </FooterView>
        </>
    );
}

export default List;
