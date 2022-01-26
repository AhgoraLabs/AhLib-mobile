import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import { Container } from "./styles";

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
            setListBooks(responseData);
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Text>List</Text>
        </Container>
    );
}

export default List;
