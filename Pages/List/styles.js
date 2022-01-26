import styled from "styled-components/native";

export const Container = styled.View`
    display: flex;
    flex-direction: row;
    height: 100%;
    padding-top: 10px;
`;
export const Livros = styled.TouchableOpacity`
    width: 170px;
    height: 280px;
    border: 1px solid lightgray;
    box-shadow: 5px 5px 1px black;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: lightgray;
    margin: 5px;
`;

export const Text = styled.Text`
    font-size: 14px;
    color: black;
`;

export const Image = styled.Image`
    width: 100%;
    height: 90%;
    border-radius: 10px;
`;
