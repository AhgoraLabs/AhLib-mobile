import styled from "styled-components/native";

const randomColor = {
    0: "#FFCB00",
    1: "#FF8A00",
    2: "#FF5E00",
    3: "#F1948A",
    4: "#D2B4DE",
    5: "#A9CCE3",
    6: "#A3E4D7",
    7: "#F9E79F",
    8: "#F5CBA7",
    9: "#CCD1D1",
    10: "#52BE80",
};

export const Container = styled.View`
    display: flex;

    padding-top: 10px;
    padding-bottom: 100px;
    height: 120%;
`;

export const ScrollView = styled.ScrollView`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    width: 100%;
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
    position: relative;
    top: 0;
    margin-left: 25px;
    margin-bottom: -220px;
    margin-top: 25px;
`;
export const NoImage = styled.Text`
    width: 140px;
    height: 220px;
    border-radius: 10px;
    position: relative;
    top: 0;
    padding-top: 100px;
    text-align: center;
    margin-bottom: -220px;
    margin-top: 25px;
    margin-left: 25px;
    background-color: ${randomColor[Math.floor(Math.random() * 10)]};
`;

//List render books

export const ImageList = styled.Image`
    width: 40px;
    height: 80px;
    border-radius: 5px;
    margin-right: 20px;
`;

export const NoImageList = styled.View`
    width: 40px;
    height: 80px;
    border-radius: 5px;
    background-color: blue;
    margin-right: 25px;
    padding-top: 10px;
    background-color: ${randomColor[Math.floor(Math.random() * 10)]};
`;
