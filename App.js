import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "./Login/index";
import Home from "./Pages/Home/index";
import Camera from "./Pages/Camera/index";
import Book from "./Pages/Books";

//const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs({ navigation }) {
    const logout = async () => {
        await AsyncStorage.setItem("@token", JSON.stringify(false));
    };

    return (
        <>
            <Tab.Navigator shifting={true} sceneAnimationEnabled={false}>
                <Tab.Screen
                    options={{
                        tabBarLabel: "Início",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                        showLabel: false,
                    }}
                    name="Início"
                    component={Home}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Código de Barras",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="barcode" color={color} size={26} />,
                    }}
                    name="Código de Barras"
                    component={Camera}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Cadastro de Livro",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book" color={color} size={26} />,
                    }}
                    name="Cadastro de Livro"
                    component={Book}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Sair",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="logout" color={color} size={26} />,
                        tabBarStyle: { display: "none" },
                        tabBarVisible: false,
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
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!logged && <Stack.Screen name="login" component={Login} />}
                <Stack.Screen name="book" component={MyTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
