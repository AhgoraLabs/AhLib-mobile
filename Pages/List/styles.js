import styled from "styled-components/native";

export const Container = styled.View`
    display: flex;
    flex-direction: row;
    height: 100%;
    padding-top: 10px;
`;
export const Livros = styled.TouchableOpacity`
    width: 170px;
    height: 220px;
    border-radius: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: white;
    margin-top: 50px;
    elevation: 5;
    padding-bottom: 20px;
    margin-right: 10px;
    margin-left: 10px;
`;

export const Text = styled.Text`
    font-size: ${props => (props.size ? `${props.size}px` : "18px")};
    font-weight: ${props => (props.bold === true ? "bold" : "normal")};
    text-transform: ${props => (props.uppercase === true ? "uppercase" : "capitalize")};
    color: ${props => (props.color ? props.color : "black")};
    text-align: center;
`;

export const Image = styled.Image`
    width: 140px;
    height: 220px;
    border-radius: 10px;
    elevation: 6;
    position: relative;
    top: 0;
    margin-left: 25px;
    margin-bottom: -220px;
    margin-top: 25px;
`;

//List render books

export const ImageList = styled.Image`
    width: 40px;
    height: 80px;
    border-radius: 5px;
    margin-right: 20px;
`;
