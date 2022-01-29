import styled from "styled-components/native";

export const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 100px;
`;
export const BackgroundColorHead = styled.View`
    position: absolute;
    width: 100%;
    height: 200px;
    background-color: #162130;
`;

export const Text = styled.Text`
    font-size: ${props => (props.size ? `${props.size}px` : "18px")};
    font-weight: ${props => (props.bold === true ? "bold" : "normal")};
    text-transform: ${props => (props.uppercase === true ? "uppercase" : "capitalize")};
    color: ${props => (props.color ? props.color : "black")};
`;

export const Image = styled.Image`
    width: 180px;
    height: 250px;
    border-radius: 20px;
`;

export const NoImage = styled.Text`
    width: 180px;
    height: 250px;
    border-radius: 20px;
    background-color: lightgray;
    text-align: center;
    padding-top: 100px;
`;

export const FooterView = styled.View`
    position: absolute;
    bottom: 0;
    height: 60px;
    padding-top: 1px;
    padding-bottom: 5px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
`;
