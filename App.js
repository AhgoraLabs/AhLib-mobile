import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

//context menu
import BookProvider from "./Pages/Context/book";

import Login from "./Login";
import Home from "./Pages/Home";
import Camera from "./Pages/Camera";
import Book from "./Pages/Books";
import List from "./Pages/List/index";
import BookPage from "./Pages/BookPage";
import BookPageComments from "./Pages/BookPage/Components/Comments";
import BookLoan from "./Pages/BookPage/Components/Loan";

//const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs({ navigation }) {
    const logout = async () => {
        await AsyncStorage.setItem("@token", JSON.stringify(false));
    };

    return (
        <>
            <Tab.Navigator
                shifting={true}
                sceneAnimationEnabled={false}
                screenOptions={{
                    headerLeft: () => <MaterialCommunityIcons onPress={() => navigation.goBack()} style={{ marginTop: 5, marginLeft: 20 }} name="arrow-left" color="black" size={26} />,
                }}
            >
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                        showLabel: false,
                        headerLeft: () => null,
                    }}
                    name="Início"
                    component={Home}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Cadastro de Livro",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="barcode" color={color} size={26} />,
                    }}
                    name="Código de Barras"
                    component={Camera}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book" color={color} size={26} />,
                        tabBarButton: () => null,
                    }}
                    name="Cadastro de Livro"
                    component={Book}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book" color={color} size={26} />,
                        tabBarButton: () => null,
                    }}
                    name="Lista de Livros"
                    component={List}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book" color={color} size={26} />,
                        tabBarButton: () => null,
                        headerLeft: () => (
                            <MaterialCommunityIcons onPress={() => navigation.navigate("Lista de Livros")} style={{ marginTop: 5, marginLeft: 20 }} name="arrow-left" color="black" size={26} />
                        ),
                    }}
                    name="Pagina do Livro"
                    component={BookPage}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book" color={color} size={26} />,
                        tabBarButton: () => null,
                        headerLeft: () => (
                            <MaterialCommunityIcons onPress={() => navigation.navigate("Pagina do Livro")} style={{ marginTop: 5, marginLeft: 20 }} name="arrow-left" color="black" size={26} />
                        ),
                    }}
                    name="Comentários"
                    component={BookPageComments}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book" color={color} size={26} />,
                        tabBarButton: () => null,
                        headerLeft: () => (
                            <MaterialCommunityIcons onPress={() => navigation.navigate("Pagina do Livro")} style={{ marginTop: 5, marginLeft: 20 }} name="arrow-left" color="black" size={26} />
                        ),
                    }}
                    name="Emprestimo"
                    component={BookLoan}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Sair",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="logout" color={color} size={26} />,
                        tabBarStyle: { display: "none" },
                        headerLeft: () => null,
                        headerShown: false,
                    }}
                    name="logout"
                    component={Login}
                    listeners={({ navigation }) => ({
                        tabPress: e => logout(),
                    })}
                />
            </Tab.Navigator>
        </>
    );
}

export default function App(navigation) {
    const [logged, setLogged] = useState(false);

    useEffect(async () => {
        const token = await AsyncStorage.getItem("@token");

        token === "false" ? setLogged(false) : setLogged(true);
    }, []);

    return (
        <BookProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {!logged && <Stack.Screen name="login" component={Login} />}
                    <Stack.Screen name="book" component={MyTabs} />
                </Stack.Navigator>
            </NavigationContainer>
        </BookProvider>
    );
}
