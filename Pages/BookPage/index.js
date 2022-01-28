import React, { useEffect, useState } from "react";
import { Container, BackgroundColorHead, Image, Text, FooterView } from "./styles";
import { View, ScrollView, TouchableOpacity, Button } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ReadMore from "@fawazahmed/react-native-read-more";
import StarRating from "react-native-star-rating";

function List({ route, navigation }) {
    const [BookData, setBookData] = useState({});
    const [commentsData, setCommentsData] = useState({});
    const [sizeDescription, setSizeDescription] = useState(16);
    const [rate, setRate] = useState([]);

    useEffect(() => {
        if (!route) return false;
        const { data } = route?.params;
        setBookData(data);
        fetchGetComments(data);
    }, [route]);

    const fetchGetComments = async book => {
        try {
            const response = await fetch(`http://sound-aileron-337523.rj.r.appspot.com/comments/?idBook=${book._id}`);
            const responseData = await response.json();
            setCommentsData(responseData);

            const dataStars = responseData.data;
            const stars = dataStars.map(({ stars }) => stars);
            const valueStars = totalStars(stars);
            setRate(valueStars);
        } catch (err) {
            console.log(err);
        }
    };

    const totalStars = (star = []) => {
        return star.length > 0 ? parseInt(star.reduce((acc, curr) => curr + acc)) / star.length : 0;
    };

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
                    <StarRating containerStyle={{ marginTop: 20 }} disabled={false} maxStars={5} rating={rate ? rate : 0} fullStarColor="gold" halfStarColor="gold" />
                    <Text style={{ marginTop: 20, marginBottom: 15 }} bold={true} size={24} uppercase={true} color="#201A33">
                        {BookData.title}
                    </Text>

                    <Text color="gray">By {BookData.author}</Text>

                    <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around", marginTop: 30 }}>
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
                    <View style={{ width: "100%", paddingLeft: 30, paddingRight: 30, marginTop: 25 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
                            <Text size={24} bold={true} color="#201A33">
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
                        <ReadMore numberOfLines={5} seeMoreText="Ver Mais" seeLessText="Ver Menos" preserveLinebreaks={true} style={{ textAlign: "justify", color: "gray", fontSize: sizeDescription }}>
                            {BookData.description}
                        </ReadMore>
                    </View>
                </Container>
            </ScrollView>
            <FooterView>
                <View style={{ display: "flex", paddingTop: 5, justifyContent: "space-evenly", flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Comentários", { data: commentsData.data })}
                        style={{ backgroundColor: "#162130", borderRadius: 10, padding: 15, display: "flex", flexDirection: "row", alignItems: "center" }}
                    >
                        <MaterialCommunityIcons name="comment-text-outline" color="white" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Emprestimo')}
                    style={{ backgroundColor: "#162130", borderRadius: 10, padding: 10, display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Text size={16} color="white">
                            Alugar Este Livro
                        </Text>
                    </TouchableOpacity>
                </View>
            </FooterView>
        </>
    );
}

export default List;
