import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { GlobalStyles } from "./frontend/styles/GlobalStyles";
 

export default function HomeScreen({ navigation }) {

    return (

        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
            }}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >

            <View style={styles.overlay}>

                <View style={styles.content}>

                    <Text style={styles.greeting}>
                        Hello, Noor 👋
                    </Text>

                    <Text style={styles.title}>
                        Student Dashboard
                    </Text>

                    <Text style={styles.subtitle}>
                        Manage your profile and app settings
                    </Text>


                    <View style={styles.menu}>

                        {/* PROFILE */}

                        <TouchableOpacity
                            style={styles.menuCard}

                            // REACT NAVIGATION
                            onPress={() => navigation.navigate("Profile")}

                            
                            /*OLD STATE NAVIGATION

                            onPress={() => setScreen("profile")}
                            */
                        >

                            <View style={styles.iconContainer}>

                                <FontAwesome
                                    name="user"
                                    size={25}
                                    color="#FFFFFF"
                                />

                            </View>


                            <View style={styles.cardText}>

                                <Text style={styles.cardTitle}>
                                    Profile
                                </Text>

                                <Text style={styles.cardSubtitle}>
                                    View your student information
                                </Text>

                            </View>


                            <FontAwesome
                                name="chevron-right"
                                size={15}
                                color="#FFFFFF"
                            />

                        </TouchableOpacity>



                        {/* SETTINGS */}

                        <TouchableOpacity
                            style={styles.menuCard}

                            // REACT NAVIGATION
                            onPress={() => navigation.navigate("Settings")}

                            
                            /*OLD STATE NAVIGATION

                            onPress={() => setScreen("settings")}
                            */
                        >

                            <View style={styles.iconContainer}>

                                <FontAwesome
                                    name="cog"
                                    size={25}
                                    color="#FFFFFF"
                                />

                            </View>


                            <View style={styles.cardText}>

                                <Text style={styles.cardTitle}>
                                    Settings
                                </Text>

                                <Text style={styles.cardSubtitle}>
                                    Customize your application
                                </Text>

                            </View>


                            <FontAwesome
                                name="chevron-right"
                                size={15}
                                color="#FFFFFF"
                            />

                        </TouchableOpacity>



                        {/* CONTACT */}

                        <TouchableOpacity
                            style={styles.menuCard}

                            // Contact belongs to Drawer,
                            // so we go to the parent Drawer navigator.
                            onPress={() =>
                                navigation.getParent()?.navigate("Contact")
                            }
                              
                            /*
                            OLD STATE NAVIGATION

                            onPress={() => setScreen("contact")}
                            */
                        >

                            <View style={styles.iconContainer}>

                                <FontAwesome
                                    name="envelope"
                                    size={23}
                                    color="#FFFFFF"
                                />

                            </View>


                            <View style={styles.cardText}>

                                <Text style={styles.cardTitle}>
                                    Contact
                                </Text>

                                <Text style={styles.cardSubtitle}>
                                    Contact the university
                                </Text>

                            </View>


                            <FontAwesome
                                name="chevron-right"
                                size={15}
                                color="#FFFFFF"
                            />

                        </TouchableOpacity>

                    </View>

                </View>


                <Text style={styles.footer}>
                    Student Management App
                </Text>

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
        backgroundColor: "rgba(0,0,0,0.48)",
        paddingHorizontal: 22,
        paddingVertical: 30,
    },

    content: {
        flex: 1,
        justifyContent: "center",
    },

    greeting: {
        fontFamily: "Poppins-Regular",
        fontSize: 17,
        color: "#E5E7EB",
        marginBottom: 5,
    },

    title: {
        fontFamily: "Poppins-Bold",
        fontSize: 31,
        color: "#FFFFFF",
    },

    subtitle: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "#D1D5DB",
        marginTop: 5,
        marginBottom: 30,
    },

    menu: {
        gap: 15,
    },

    menuCard: {
        backgroundColor: "rgba(255,255,255,0.18)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
        padding: 17,
        borderRadius: 17,
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: "rgba(79,70,229,0.85)",
        justifyContent: "center",
        alignItems: "center",
    },

    cardText: {
        flex: 1,
        marginLeft: 15,
    },

    cardTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: "#FFFFFF",
    },

    cardSubtitle: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        color: "#E5E7EB",
        marginTop: 3,
    },

    footer: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        color: "#D1D5DB",
        textAlign: "center",
    },

});