import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import songs from "./model/data";

const { width, height } = Dimensions.get('window');

export default function Music() {

    const [songIndex, setSongIndex] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        scrollX.addListener(({ value }) => {
            // console.log(`ScrollX : ${value} | Devide Width: ${width}`);
            const index = Math.round( value / width);
            setSongIndex(index);
            // console.log(index);
        });
    }, [])

    const renderSongs = ({ item, index }) => {
        return (
            <Animated.View style={styles.mainImageWrapper}>
                <View style={[styles.imageWrapper, styles.elevation]}>
                    <Image source={item.artwork} style={styles.musicImage} />
                </View>
            </Animated.View>

        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.maincontainer}>
                {/* image */}

                <Animated.FlatList
                    renderItem={renderSongs}
                    data={songs}
                    keyExtractor={item => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent:{
                                    contentOffset : {x : scrollX}, 
                                }
                            }
                        ],
                        {useNativeDriver: true},
                    )}
                />

                {/* Song Content */}
                <View>
                    <Text style={[styles.songContent, styles.songTitle]}> {songs[songIndex].title} </Text>
                    <Text style={[styles.songContent, styles.songArtist]}> {songs[songIndex].artist} </Text>
                </View>

                {/* slider */}
                <View>
                    <Slider
                        style={styles.progressBar}
                        value={10}
                        minimumValue={0}
                        maximumValue={100}
                        thumbTintColor="#FFFFFF"
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        onSlidingComplete={() => { }}
                    />
                    { /* music progress durations */}
                    <View style={styles.progressLevelDuration}>
                        <Text style={styles.progressLabelText}>00:00</Text>
                        <Text style={styles.progressLabelText}>00:00</Text>
                    </View>
                </View>

                {/* music controls */}
                <View style={styles.musicControlsContainer}>
                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="play-skip-back-outline" size={35} color="#ffffff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="ios-pause-circle" size={70} color="#888888" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="play-skip-forward-outline" size={35} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.botoomIconWrapper}>
                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="heart-outline" size={30} color="#888888" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="repeat" size={30} color="#888888" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="share-outline" size={30} color="#888888" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="ellipsis-horizontal" size={30} color="#888888" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831'
    },

    maincontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomContainer: {
        width: width,
        alignItems: 'center',
        paddingVertical: 15,
        borderTopColor: '#393E46',
        borderWidth: 1,
    },
    botoomIconWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },

    mainImageWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },

    imageWrapper: {
        width: 300,
        height: 340,
        marginBottom: 25,
        marginTop: 35
    },

    musicImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },

    elevation: {
        elevation: 5,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84
    },

    songContent: {
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'center',
        color: '#EEEEEE'
    },

    songTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EEEEEE'
    },

    songArtist: {
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'center',
        color: '#EEEEEE'
    },

    progressBar: {
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row'
    },

    progressLevelDuration: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    progressLabelText: {
        color: '#fff',
        fontWeight: '500',
    },

    musicControlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        width: '60%',
        marginTop: 30
    },


});