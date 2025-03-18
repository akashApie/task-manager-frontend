import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const AuthLayout = ({ children, title }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
            <View style={styles.topSection}></View>
                <View style={styles.bottomSection}>
                    <Text style={styles.title}>{title}</Text>
                    {children}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topSection: {
        flex: 1,
        width: "100%",
        alignItems: "start",
        justifyContent: "start",
    },
    backgroundImage: {
        width: "100%",
        height: "100%"
    },
    logoContainer: {
        position: "absolute",
        top: 45,
        left: 18,
    },
    logo: {
        width: 120, 
        height: 120,
    },
    bottomSection: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        alignSelf: "stretch",
        // justifyContent: "flex-end"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        // textAlign: 'center',
    },
});

export default AuthLayout;
