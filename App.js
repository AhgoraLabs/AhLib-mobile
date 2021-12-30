import * as React from "react";
import { Text, View, Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./Pages/Home/index";
import Camera from "./Pages/Camera/index";
import Login from "./Login/index";
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
                    name="Home"
                    component={Home}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Código de Barras",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="barcode" color={color} size={26} />,
                    }}
                    name="Camera"
                    component={Camera}
                />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Cadastro de Livro",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book" color={color} size={26} />,
                    }}
                    name="Book"
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
                        title: "Ah-Lib",
                        headerStyle: {
                            backgroundColor: "white",
                        },
                        headerTintColor: "gray",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                    name="Home"
                    component={MyTabs}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
