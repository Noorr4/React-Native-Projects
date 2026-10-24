import { StyleSheet } from "react-native";


export const GlobalStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
    },


    heading: {
        fontFamily: "Poppins-Bold",
        fontSize: 28,
        color: "#243B53",
        textAlign: "center",
        marginBottom: 20,
    },


    subHeading: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 20,
        color: "#243B53",
        marginBottom: 12,
    },


    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        color: "#333333",
        marginBottom: 10,
    },


    input: {
        borderWidth: 1,
        borderColor: "#B8C2CC",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: "#FFFFFF",
        fontFamily: "Poppins-Regular",
        fontSize: 15,
    },


    button: {
        backgroundColor: "#4F46E5",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 12,
    },


    buttonText: {
        color: "#FFFFFF",
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
    },


    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: "center",
        marginBottom: 20,
    },


    card: {
        backgroundColor: "rgba(255,255,255,0.94)",
        padding: 18,
        borderRadius: 15,
        marginBottom: 20,
    },


    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 10,
    },


    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#B8C2CC",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        marginBottom: 15,
    },


    iconInput: {
        flex: 1,
        padding: 12,
        fontFamily: "Poppins-Regular",
        fontSize: 15,
    },

});