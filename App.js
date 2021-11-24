import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./Home/index";
import Camera from "./Camera/index";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home" activeColor="#f0edf6" inactiveColor="#3e2465" barStyle={{ backgroundColor: "#694fad" }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Camera" component={Camera} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
