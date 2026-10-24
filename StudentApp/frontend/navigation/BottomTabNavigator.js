import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";


const Tab = createBottomTabNavigator();


export default function BottomTabNavigator() {

    return (

        <Tab.Navigator

            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarActiveTintColor: "#4F46E5",

                tabBarInactiveTintColor: "#64748B",

                tabBarLabelStyle: {
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 12,
                },

                tabBarIcon: ({ color, size }) => {

                    let iconName;

                    if (route.name === "Home") {
                        iconName = "home";
                    }

                    else if (route.name === "Profile") {
                        iconName = "user";
                    }

                    else if (route.name === "Settings") {
                        iconName = "cog";
                    }

                    return (
                        <FontAwesome
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },

            })}

        >

            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
            />

        </Tab.Navigator>

    );
}