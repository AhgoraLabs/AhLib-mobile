import styled from "styled-components/native";

export const Text = styled.Text`
    font-size: ${props => (props.size ? `${props.size}px` : "18px")};
    font-weight: ${props => (props.bold === true ? "bold" : "normal")};
    text-transform: ${props => (props.uppercase === true ? "uppercase" : "capitalize")};
    color: ${props => (props.color ? props.color : "black")};
`;

export const Button = styled.TouchableOpacity`
    background-color: cyan;
    align-items: center;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
`;

//stories recomendação
export const Stories = styled.ScrollView`
    background-color: whitesmoke;
    height: 150px;
`;

export const ModalStorie = styled.View`
    background-color: whitesmoke;
    width: 100px;
    margin: 5px;
    padding: 3px;
    elevation: 2;
    border-radius: 5px;
`;

export const ImageStorie = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`;
