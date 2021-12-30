import styled from "styled-components/native";

export const Container = styled.ScrollView`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10px;
`;

export const Div = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const Label = styled.Text`
    font-size: ${props => (props.size ? props.size : "18px")};
    color: ${props => (props.color ? props.color : "black")};
    margin-bottom: 10px;
`;

export const Input = styled.TextInput`
    font-size: 18px;
    background-color: #fff;
    width: 90%;
    color: black;
    border-radius: 5px;
    padding-left: 10px;
    margin-bottom: 10px;
    border: 1px solid lightgray;
    height: ${props => (props.height ? props.height : "40px")};
`;

export const Button = styled.TouchableOpacity`
    background-color: #1565c0;
    color: #fff;
    width: 300px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-bottom: 40px;
    padding-top: 10px;
`;
