import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    ScrollView,
} from "react-native";

import { GlobalStyles } from "../styles/GlobalStyles";


export default function ProfileScreen({ navigation }) {

    // These are NORMAL STATE variables.
    // Keep them active.

    const [name, setName] = useState("");
    const [Sapid, setSapid] = useState("");
    const [uni, setUni] = useState("");
    const [depart, setDepart] = useState("");


    return (

        <ImageBackground
            source={require("../../assets/images/backGroundpic.jpg")}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >

            <View style={styles.overlay}>

                <ScrollView
                    contentContainerStyle={GlobalStyles.container}
                >

                    <Text style={styles.heading}>
                        Student Profile
                    </Text>


                    <Image
                        source={require("../../assets/images/Profilepic.jpg")}
                        style={GlobalStyles.image}
                    />


                    <View style={GlobalStyles.card}>

                        <Text style={GlobalStyles.subHeading}>
                            Enter Your Information
                        </Text>


                        <TextInput
                            placeholder="Enter Your Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={GlobalStyles.input}
                        />


                        <TextInput
                            placeholder="Enter Your SAPID"
                            value={Sapid}
                            onChangeText={(text) => setSapid(text)}
                            inputMode="numeric"
                            keyboardType="number-pad"
                            style={GlobalStyles.input}
                        />


                        <TextInput
                            placeholder="Enter Your University Name"
                            value={uni}
                            onChangeText={(text) => setUni(text)}
                            style={GlobalStyles.input}
                        />


                        <TextInput
                            placeholder="Enter Your Department Name"
                            value={depart}
                            onChangeText={(text) => setDepart(text)}
                            style={GlobalStyles.input}
                        />


                        {/* LIVE ENTERED DATA */}

                        <Text style={GlobalStyles.text}>
                            Name: {name}
                        </Text>

                        <Text style={GlobalStyles.text}>
                            SAPID: {Sapid}
                        </Text>

                        <Text style={GlobalStyles.text}>
                            University: {uni}
                        </Text>

                        <Text style={GlobalStyles.text}>
                            Department: {depart}
                        </Text>

                    </View>


                    <TouchableOpacity
                        style={GlobalStyles.button}

                        // REACT NAVIGATION
                        onPress={() => navigation.navigate("Home")}


                        // OLD STATE NAVIGATION

                        //onPress={() => setScreen("home")}

                    >

                        <Text style={GlobalStyles.buttonText}>
                            Back to Home
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

    heading: {
        fontFamily: "Poppins-Bold",
        fontSize: 28,
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 20,
    },

});