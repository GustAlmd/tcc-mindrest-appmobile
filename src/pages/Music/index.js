import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image, Animated, FlatList } from 'react-native';
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import songs from "./model/data";
import { Audio } from 'expo-av';


const { width, height } = Dimensions.get('window');

export default function Music() {

    //teste para o github

    const [sound, setSound] = useState(null);
    const [songIndex, setSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // novo estado para controlar o valor da barra de progresso

    const soundRef = useRef(null); // novo ref para obter uma referência ao objeto de áudio


    useEffect(() => {
        loadAudio();
    }, []);

    
    useEffect(() => { // novo useEffect para atualizar o valor da barra de progresso
        const interval = setInterval(async () => {
            const status = await sound.getStatusAsync();
            const progress = status.positionMillis / status.durationMillis;
            setProgress(progress);
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    async function loadAudio() {
        try {
            const { sound } = await Audio.Sound.createAsync(songs[songIndex].url);
            setSound(sound);
            soundRef.current = sound; // atribui o objeto de áudio ao ref
        } catch (error) {
            console.log(error);
        }
    }

    async function playSound() {
        try {
            await soundRef.current.playAsync();
            setIsPlaying(true);
        } catch (error) {
            console.log(error);
        }
    }
    
    async function pauseSound() {
        try {
            await soundRef.current.pauseAsync();
            setIsPlaying(false);
        } catch (error) {
            console.log(error);
        }
    }
    
    async function handleNext() {
        if (soundRef.current) {
            await soundRef.current.unloadAsync();
            setIsPlaying(false);
        }
        const nextSongIndex = songIndex + 1 >= songs.length ? 0 : songIndex + 1;
        setSongIndex(nextSongIndex);
        const { sound: nextSound } = await Audio.Sound.createAsync(songs[nextSongIndex].url);
        setSound(nextSound);
        soundRef.current = nextSound; // atribui o objeto de áudio ao ref
        playSound();
    }
    
    async function handlePrevious() {
        if (soundRef.current) {
            await soundRef.current.unloadAsync();
            setIsPlaying(false);
        }
        const previousSongIndex = songIndex - 1 < 0 ? songs.length - 1 : songIndex - 1;
        setSongIndex(previousSongIndex);
        const { sound: nextSound } = await Audio.Sound.createAsync(songs[previousSongIndex].url);
        setSound(nextSound);
        soundRef.current = nextSound; // atribui o objeto de áudio ao ref
        playSound();
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.maincontainer}>

                {/* image */}
                <Image style={styles.artwork} source={songs[songIndex].artwork } />

                {/* Song Content */}
                <View>
                    <Text style={[styles.songContent, styles.songTitle]}> {songs[songIndex].title} </Text>
                    <Text style={[styles.songContent, styles.songArtist]}> {songs[songIndex].artist} </Text>
                </View>

                {/* slider */}
                <View>
                    <Slider
                        style={styles.progressBar}
                        value={progress}
                        minimumValue={0}
                        maximumValue={1}
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
                    <TouchableOpacity onPress={() => handlePrevious()}>
                        <Ionicons name="play-skip-back-outline" size={35} color="#ffffff" />
                    </TouchableOpacity>

                    {isPlaying ? (
                        <TouchableOpacity style={styles.controlButton} onPress={() => pauseSound()}>
                            <Ionicons name="ios-pause-circle" size={70} color="#888888" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.controlButton} onPress={() => playSound()}>
                            <Ionicons name="ios-play-circle" size={70} color="#888888" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => handleNext()}>
                        <Ionicons name="play-skip-forward-outline" size={35} color="#ffffff" />
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
        marginBottom: 10
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
        color: '#EEEEEE',

    },

    artwork: {
        width: 300,
        height: 300,
        borderRadius: 150,
        marginBottom: 25,
        marginTop: 35
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
        marginTop: 30,
        marginBottom: 50
    },


});