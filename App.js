import * as React from "react";
import { Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./Pages/Home/index";
import Camera from "./Pages/Camera/index";
import Login from "./Login/index";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Login" activeColor="#FFF" barStyle={{ backgroundColor: "#400080" }}>
                <Tab.Screen name="Home" component={Login} />
                <Tab.Screen name="Camera" component={Camera} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
