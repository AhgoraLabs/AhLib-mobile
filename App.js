import * as React from "react";
import { Text, View, Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Login from "./Login/index";
import Home from "./Pages/Home/index";
import Camera from "./Pages/Camera/index";
import Book from "./Pages/Books";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
    return (
        <>
            <Tab.Navigator activeColor="#FFF" barStyle={{ backgroundColor: "#404040" }}>
                <Tab.Screen
                    options={{
                        tabBarLabel: "Inicio",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                    }}
                    name="home"
                    component={Home}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Código de Barras",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="barcode" color={color} size={26} />,
                    }}
                    name="barcode"
                    component={Camera}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Cadastro de Livro",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book" color={color} size={26} />,
                    }}
                    name="book"
                    component={Book}
                />
            </Tab.Navigator>
        </>
    );
}
export default function App(navigation) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        title: "AhgoraLabs",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    options={{
                        title: "AhgoraLabs",
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                    name="home"
                    component={MyTabs}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
