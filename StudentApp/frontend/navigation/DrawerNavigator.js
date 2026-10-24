import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { FontAwesome } from "@expo/vector-icons";

import BottomTabNavigator from "./BottomTabNavigator";
import ContactScreen from "../screens/ContactScreen";


const Drawer = createDrawerNavigator();


export default function DrawerNavigator() {

    return (

        <Drawer.Navigator

            screenOptions={({ route }) => ({

                headerShown: true, 

                headerTitleStyle: {
                    fontFamily: "Poppins-SemiBold",
                },

                drawerActiveTintColor: "#4F46E5",

                drawerLabelStyle: {
                    fontFamily: "Poppins-Regular",
                    fontSize: 15,
                },

                drawerIcon: ({ color, size }) => {

                    let iconName;

                    if (route.name === "Main") {
                        iconName = "home";
                    }

                    else if (route.name === "Contact") {
                        iconName = "envelope";
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

            {/* MAIN contains the Bottom Tab Navigator */}

            <Drawer.Screen
                name="Main"
                component={BottomTabNavigator}
                options={{
                    title: "Student App",
                }}
            />


            {/* Contact is directly inside the Drawer */}

            <Drawer.Screen
                name="Contact"
                component={ContactScreen}
            />

        </Drawer.Navigator>

    );
}