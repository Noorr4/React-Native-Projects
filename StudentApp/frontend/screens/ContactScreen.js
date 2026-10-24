import React, { useState } from "react";

import {
    View,
    Text,
    TextInput, 
    TouchableOpacity,
    Alert,
    ImageBackground,
    StyleSheet,
    ScrollView,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { GlobalStyles } from "../styles/GlobalStyles";


export default function ContactScreen({ navigation }) {

    // NORMAL APPLICATION STATE
    // Keep these active.

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const handleSubmit = () => {

        if (
            email.trim() === "" ||
            phone.trim() === ""
        ) {

            Alert.alert(
                "Missing Information",
                "Please enter your email and phone number."
            );

            return;
        }


        Alert.alert(
            "Contact Form Submitted",
            `Your email is ${email}\nYour phone number is ${phone}`
        );

    };


    return (

        <ImageBackground
            source={require("../../assets/images/backGroundpic.jpg")}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >

            <View style={styles.overlay}>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                >

                    <Text style={styles.heading}>
                        Contact Us
                    </Text>



                    {/* UNIVERSITY INFORMATION */}

                    <View style={GlobalStyles.card}>

                        <Text style={GlobalStyles.subHeading}>
                            Riphah International University
                        </Text>


                        <View style={GlobalStyles.infoRow}>

                            <FontAwesome
                                name="university"
                                size={20}
                                color="#4F46E5"
                            />

                            <Text style={GlobalStyles.text}>
                                Faculty of Computing
                            </Text>

                        </View>


                        <View style={GlobalStyles.infoRow}>

                            <FontAwesome
                                name="map-marker"
                                size={20}
                                color="#4F46E5"
                            />

                            <Text style={GlobalStyles.text}>
                                Islamabad, Pakistan
                            </Text>

                        </View>


                        <View style={GlobalStyles.infoRow}>

                            <FontAwesome
                                name="phone"
                                size={20}
                                color="#4F46E5"
                            />

                            <Text style={GlobalStyles.text}>
                                +92 XXX XXXXXXX
                            </Text>

                        </View>

                    </View>



                    {/* CONTACT FORM */}

                    <View style={GlobalStyles.card}>

                        <Text style={GlobalStyles.subHeading}>
                            Send Us a Message
                        </Text>


                        <View style={GlobalStyles.inputContainer}>

                            <FontAwesome
                                name="envelope"
                                size={20}
                                color="#4F46E5"
                            />


                            <TextInput
                                placeholder="Enter Your Email"
                                value={email}
                                onChangeText={(text) =>
                                    setEmail(text)
                                }
                                inputMode="email"
                                keyboardType="email-address"
                                style={GlobalStyles.iconInput}
                            />

                        </View>



                        <View style={GlobalStyles.inputContainer}>

                            <FontAwesome
                                name="phone"
                                size={20}
                                color="#4F46E5"
                            />


                            <TextInput
                                placeholder="Enter Your Phone Number"
                                value={phone}
                                onChangeText={(text) =>
                                    setPhone(text)
                                }
                                inputMode="tel"
                                keyboardType="phone-pad"
                                style={GlobalStyles.iconInput}
                            />

                        </View>



                        <TouchableOpacity
                            style={GlobalStyles.button}
                            onPress={handleSubmit}
                        >

                            <Text style={GlobalStyles.buttonText}>
                                Submit
                            </Text>

                        </TouchableOpacity>

                    </View>



                    {/* BACK TO HOME */}

                    <TouchableOpacity
                        style={GlobalStyles.button}

                        // REACT NAVIGATION
                        onPress={() =>
                            navigation.navigate("Main")
                        }

                        
                        OLD STATE NAVIGATION

                        /*onPress={() => setScreen("home")}*/
                        
                    >

                        <Text style={GlobalStyles.buttonText}>
                            Back To Home
                        </Text>

                    </TouchableOpacity>

                </ScrollView>

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

    scrollContent: {
        padding: 20,
        paddingBottom: 30,
    },

    heading: {
        fontFamily: "Poppins-Bold",
        fontSize: 28,
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 20,
    },

});