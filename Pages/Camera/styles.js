import styled from "styled-components/native";

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
    border: 1px solid lightgray;
`;

export const Button = styled.TouchableOpacity`
    background-color: #1565c0;
    width: 200px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 90px;
    margin-top: 40px;
`;
