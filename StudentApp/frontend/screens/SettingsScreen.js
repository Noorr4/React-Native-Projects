import React, { useState } from "react";

import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    ImageBackground,
} from "react-native";

import { GlobalStyles } from "../styles/GlobalStyles";


export default function SettingsScreen({ navigation }) {

    // NORMAL APPLICATION STATE
    // Keep these active.

    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState(false);


    return (

        <ImageBackground
            source={require("../../assets/images/backGroundpic.jpg")}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >

            <View style={styles.overlay}>

                <View
                    style={[
                        GlobalStyles.container,
                        {
                            backgroundColor: darkMode
                                ? "rgba(15,23,42,0.72)"
                                : "transparent",
                        },
                    ]}
                >

                    <StatusBar
                        barStyle="light-content"
                    />


                    <Text style={styles.heading}>
                        Settings
                    </Text>


                    {/* DARK MODE CARD */}

                    <View
                        style={[
                            GlobalStyles.card,
                            {
                                backgroundColor: darkMode
                                    ? "rgba(31,41,55,0.95)"
                                    : "rgba(255,255,255,0.94)",
                            },
                        ]}
                    >

                        <View style={styles.settingRow}>

                            <View style={styles.settingText}>

                                <Text
                                    style={[
                                        GlobalStyles.subHeading,
                                        {
                                            color: darkMode
                                                ? "#FFFFFF"
                                                : "#243B53",
                                        },
                                    ]}
                                >
                                    Dark Mode
                                </Text>


                                <Text
                                    style={[
                                        GlobalStyles.text,
                                        {
                                            color: darkMode
                                                ? "#E5E7EB"
                                                : "#333333",
                                        },
                                    ]}
                                >
                                    {darkMode
                                        ? "Dark mode is ON"
                                        : "Light mode is ON"}
                                </Text>

                            </View>


                            <Switch
                                value={darkMode}
                                onValueChange={(value) =>
                                    setDarkMode(value)
                                }
                            />

                        </View>

                    </View>



                    {/* LANGUAGE CARD */}

                    <View
                        style={[
                            GlobalStyles.card,
                            {
                                backgroundColor: darkMode
                                    ? "rgba(31,41,55,0.95)"
                                    : "rgba(255,255,255,0.94)",
                            },
                        ]}
                    >

                        <View style={styles.languageRow}>

                            <View>

                                <Text
                                    style={[
                                        GlobalStyles.subHeading,
                                        {
                                            color: darkMode
                                                ? "#FFFFFF"
                                                : "#243B53",
                                        },
                                    ]}
                                >
                                    Language
                                </Text>


                                <Text
                                    style={[
                                        GlobalStyles.text,
                                        {
                                            color: darkMode
                                                ? "#E5E7EB"
                                                : "#333333",
                                        },
                                    ]}
                                >
                                    {language ? "Urdu" : "English"}
                                </Text>

                            </View>


                            <Switch
                                value={language}
                                onValueChange={(value) =>
                                    setLanguage(value)
                                }
                            />

                        </View>

                    </View>



                    {/* BACK BUTTON */}

                    <TouchableOpacity
                        style={GlobalStyles.button}

                        // REACT NAVIGATION
                        onPress={() => navigation.navigate("Home")}

                        
                        /*OLD STATE NAVIGATION

                        onPress={() => setScreen("home")}*/
                        
                    >

                        <Text style={GlobalStyles.buttonText}>
                            Back To Home
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>

        </ImageBackground>

    );
}


const styles = StyleSheet.create({

    background: {
        flex: 1,
    },

    backgroundImage: {
        resizeMode: "cover",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    heading: {
        fontFamily: "Poppins-Bold",
        fontSize: 28,
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 20,
    },

    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    settingText: {
        flex: 1,
    },

    languageRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

});