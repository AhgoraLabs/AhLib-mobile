import React, { useEffect, useState } from "react";
import { ScrollView, Image, View } from "react-native";
import { Container, Text } from "../../styles";
import ReadMore from "@fawazahmed/react-native-read-more";
import UserAvatar from "react-native-user-avatar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//context
import { useBookContext } from "../../../Context/book";

function Comments({}) {
    const { providerComments } = useBookContext();
    const dataCommentsContext = providerComments();
    const [commentsData, setCommentsData] = useState([]);

    useEffect(() => {
        setCommentsData(dataCommentsContext);
    }, [dataCommentsContext]);
    return (
        <ScrollView>
            <View>
                <Text style={{ textAlign: "center", marginTop: 10 }} color="#201A33" size={30} bold={true}>
                    Comentários
                </Text>
            </View>
            <View style={{ margin: 20 }}>
                {commentsData.map(item => (
                    <View
                        key={item._id}
                        style={{
                            marginBottom: 20,
                            backgroundColor: "white",
                            padding: 20,
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            elevation: 1,
                        }}
                    >
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <UserAvatar size={30} name={item.by} style={{ marginRight: 10 }} />
                            <Text numberOfLines={1} ellipsizeMode="tail" color="#201A33" size={18} bold={true} style={{ width: "70%" }}>
                                {item.by}
                            </Text>
                            <MaterialCommunityIcons style={{ marginLeft: 20 }} name="star" color="gold" size={30} />
                            <Text color="#201A33" size={18} bold={true}>
                                {item.stars}
                            </Text>
                        </View>

                        <ReadMore numberOfLines={2} seeMoreText="Ver Mais" seeLessText="Ver Menos" preserveLinebreaks={true} style={{ textAlign: "justify", color: "gray" }}>
                            {item.comment}
                        </ReadMore>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

export default Comments;
