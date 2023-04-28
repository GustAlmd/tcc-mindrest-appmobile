import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default function MusicScreen (){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Em Desenvolvimento</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

