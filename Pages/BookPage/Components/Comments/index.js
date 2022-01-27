import React, { useEffect, useState } from "react";
import { ScrollView, Image, View } from "react-native";
import { Container, Text } from "../../styles";
import ReadMore from "@fawazahmed/react-native-read-more";

function Comments({ route }) {
    const [commentsData, setCommentsData] = useState([]);

    useEffect(() => {
        setCommentsData(route.params.data);
        console.log(route.params.data);
    }, [route]);
    return (
        <ScrollView>
            <View>
                <Text style={{ textAlign: "center", marginTop: 10 }} color="#201A33" size={30} bold={true}>
                    Comentários
                </Text>
            </View>
            <View style={{ margin: 20, borderRadius: 10 }}>
                {commentsData.map(item => (
                    <View style={{ marginBottom: 20, backgroundColor: "white", padding: 20 }}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <Text color="#201A33" size={18} bold={true}>
                                {item.by}
                            </Text>
                            <Text style={{ marginLeft: 20 }} color="#201A33" size={18} bold={true}>
                                {item.stars}
                            </Text>
                        </View>

                        <ReadMore numberOfLines={2} seeMoreText="Ver Mais" seeLessText="Ver Menos" preserveLinebreaks={true} style={{ textAlign: "justify", color: "gray" }}>
                            {item.comment}
                        </ReadMore>

                        {/* <Text style={{ marginBottom: 20, marginTop: 5 }} color="gray">
                            {item.comment}
                        </Text> */}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

export default Comments;
