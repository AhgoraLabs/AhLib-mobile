import styled from "styled-components/native";
import { TextInput } from "react-native";

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const CameraView = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

export const LineBar = styled.View`
    width: 50%;
    min-height: 30%;
    border-radius: 30px;
    border: 1px solid lightgray;
`;

export const Modal = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    min-height: 50%;
    padding: 10px;
    border-radius: 30px;
    border: 1px solid #555;
`;

export const Button = styled.TouchableOpacity`
    background-color: #8257e5;
    width: 220px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 60px;
    margin-top: 10px;
    color: white;
    padding: 5px;
`;

export const Input = styled.TextInput`
    background-color: lightgray;
    margin-top: 50px;
    margin-bottom: 15px;
    color: #222;
    font-size: 17px;
    border-radius: 7px;
    width: 250px;
    height: 60px;
    padding-left: 10px;
`;
