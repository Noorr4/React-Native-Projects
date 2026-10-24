import React from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";

// =========================================================
// STATE NAVIGATION IMPORTS
// =========================================================

import HomeScreen from "./frontend/screens/HomeScreen";
import ProfileScreen from "./frontend/screens/ProfileScreen";
import SettingsScreen from "./frontend/screens/SettingsScreen";
import ContactScreen from "./frontend/screens/ContactScreen";

// =========================================================
// REACT NAVIGATION IMPORTS
// 
// =========================================================

import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./frontend/navigation/DrawerNavigator";


export default function App() {

    const [fontsLoaded] = useFonts({

        "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),

    });


    // =========================================================
    // STATE NAVIGATION
    // =========================================================

    const [screen, setScreen] = React.useState("home");


    if (!fontsLoaded) {
        return null;
    }


    return (
        
        //=========================================================
        //REACT NAVIGATION VERSION
        //USE THIS IN ASSIGNMENT 2
        //=========================================================
        <NavigationContainer>
        <DrawerNavigator />
        </NavigationContainer>

        

        

    );
}
{/*<View style={{ flex: 1 }}>

            {screen === "home" && (
                <HomeScreen setScreen={setScreen} />
            )}

            {screen === "profile" && (
                <ProfileScreen setScreen={setScreen} />
            )}

            {screen === "settings" && (
                <SettingsScreen setScreen={setScreen} />
            )}

            {screen === "contact" && (
                <ContactScreen setScreen={setScreen} />
            )}

        </View>*/}



