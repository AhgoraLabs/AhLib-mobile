import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { Container, Title, Image } from "./styles";

function List({ route }) {
    const [BookData, setBookData] = useState({});

    useEffect(() => {
        setBookData(route.params.data);
    }, [route]);

    return (
        <Container>
            <Title>{BookData.title}</Title>
            <Image
                source={{
                    uri: BookData.image,
                }}
            />
        </Container>
    );
}

export default List;
