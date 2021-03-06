import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import StarRating from "react-native-star-rating";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useBookContext } from "../Context/book";
import { BackgroundColorHead, ButtonDelete, Container, Image, NoImage, Text } from "./styles";

function List({ navigation }) {
    const { providerComments, book, fetchBookList } = useBookContext();

    const dataCommentsContext = providerComments("get");

    const [sizeDescription, setSizeDescription] = useState(16);
    const [rate, setRate] = useState(5);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        setConfirmDelete(false);
        totalStars();
    }, [dataCommentsContext]);

    const totalStars = () => {
        try {
            if (!dataCommentsContext) return false;
            const stars = dataCommentsContext.map(({ stars }) => stars);
            const valueStars = stars.length > 0 ? parseInt(stars.reduce((acc, curr) => curr + acc)) / stars.length : 0;
            setRate(valueStars);
        } catch (err) {
            console.log(err);
        }
    };

    const textColorPrimary = "white";
    const textColorSecondary = "#E1E1E6";

    const handleDelete = async () => {
        if (!confirmDelete) {
            return setConfirmDelete(true);
        }

        if (confirmDelete) {
            alert("Deletado com sucesso");
            try {
                const response = await fetch(`https://ahlibs.rj.r.appspot.com/books/${book._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        //auth: token,
                    },
                });
                const { error } = response;
                if (error) {
                    return alert("Não foi possível deletar o livro");
                }
                setConfirmDelete(false);
                fetchBookList();
                return navigation.navigate("Lista de Livros");
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleEdit = () => {
        navigation.navigate("Cadastro de Livro", { mode: "edit", data: book, isbn: book.isbn });
    };

    return (
        <>
            <ScrollView>
                <Container>
                    <BackgroundColorHead />
                    {book.image ? (
                        <Image
                            source={{
                                uri: book.image,
                            }}
                        />
                    ) : (
                        <NoImage>{book.title}</NoImage>
                    )}
                    <Text style={{ marginTop: 5 }} size={14}>
                        ISBN: {book.isbn}
                    </Text>
                    <StarRating containerStyle={{ marginTop: 20 }} disabled={false} maxStars={5} rating={rate ? rate : 0} fullStarColor="gold" halfStarColor="gold" />
                    <TouchableOpacity onPress={handleEdit} style={{ backgroundColor: "lightgray", padding: 10, marginTop: 20, borderRadius: 10 }}>
                        <Text color="black">Editar Livro</Text>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 20, marginBottom: 15 }} bold={true} size={24} uppercase={true} color={textColorPrimary}>
                        {book.title}
                    </Text>

                    <Text color={textColorSecondary}>By {book.author}</Text>

                    <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around", marginTop: 30 }}>
                        <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text>Editora</Text>
                            <Text size={16} bold={true} color={textColorPrimary}>
                                {book.publisher ? book.publisher : "n/a"}
                            </Text>
                        </View>
                        <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text>Idioma</Text>
                            <Text size={16} bold={true} color={textColorPrimary}>
                                {book.language ? book.language : "n/a"}
                            </Text>
                        </View>
                        <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Text>Páginas</Text>
                            <Text size={16} bold={true} color={textColorPrimary}>
                                {book.pages ? book.pages : "n/a"}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", paddingLeft: 30, paddingRight: 30, marginTop: 25 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
                            <Text size={24} bold={true} color="#A8A8B3">
                                Descrição
                            </Text>
                            <Text color="white" style={{ marginLeft: 30 }}>
                                Fonte
                            </Text>
                            <TouchableOpacity style={{ marginLeft: 10, marginRight: 20 }} onPress={() => setSizeDescription(sizeDescription + 2)}>
                                <MaterialCommunityIcons name="plus" color="white" size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSizeDescription(sizeDescription - 2)}>
                                <MaterialCommunityIcons name="minus" color="white" size={20} />
                            </TouchableOpacity>
                        </View>
                        {/* <ReadMore
                            numberOfLines={10}
                            seeMoreText="Ver Mais"
                            seeLessText="Ver Menos"
                            preserveLinebreaks={true}
                            style={{ textAlign: "justify", color: "white", fontSize: sizeDescription }}
                        >
                            {book.description ? book.description : "Descrição não disponibilizada"}
                        </ReadMore> */}

                        <Text style={{ textAlign: "justify", color: "white" }} size={sizeDescription}>
                            {book.description ? book.description : "Descrição não disponibilizada"}
                        </Text>
                    </View>
                    <ButtonDelete onPress={() => handleDelete()}>
                        <MaterialCommunityIcons name="delete" color="white" size={20} />
                        <Text>{confirmDelete ? "Confirmar exclusão" : "Excluir livro"}</Text>
                    </ButtonDelete>
                    {confirmDelete && (
                        <TouchableOpacity style={{ marginTop: 30, borderRadius: 10 }} onPress={() => setConfirmDelete(false)}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    )}
                </Container>
            </ScrollView>
            {/*<FooterView>
                <View style={{ display: "flex", paddingTop: 5, justifyContent: "space-evenly", flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Comentários")}
                        style={{ backgroundColor: "#8257E5", borderRadius: 10, padding: 15, display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: 40, paddingRight: 40 }}
                    >
                        <MaterialCommunityIcons name="comment-text-outline" color="white" size={18} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate("Emprestimo")}
                        style={{ backgroundColor: "#162130", borderRadius: 10, padding: 10, display: "flex", flexDirection: "row", alignItems: "center" }}
                    >
                        <Text size={16} color="white">
                            Alugar Este Livro
                        </Text>
                    </TouchableOpacity> 
                </View>
            </FooterView>*/}
        </>
    );
}

export default List;
