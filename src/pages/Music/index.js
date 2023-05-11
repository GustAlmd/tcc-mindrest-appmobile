import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image} from 'react-native';
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import songs from "./model/data";
import { Audio } from 'expo-av';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Music() {

    const [sound, setSound] = useState(null);
    const [songIndex, setSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // novo estado para controlar o valor da barra de progresso
    const [currentDuration, setCurrentDuration] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    
    const soundRef = useRef(null); // novo ref para obter uma referência ao objeto de áudio


    useEffect(() => {
        loadAudio();
    }, []);

    
    useEffect(() => {
            const interval = setInterval(async () => {
          const status = await sound.getStatusAsync();
          const currentDuration = status.positionMillis;
          const totalDuration = status.durationMillis;
          const progress = currentDuration / totalDuration;
          setProgress(progress);
          setCurrentDuration(currentDuration);
          setTotalDuration(totalDuration);
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

    function formatDuration(duration) {
        const minutes = Math.floor(duration / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
                        <Text style={styles.progressLabelText}>{formatDuration(currentDuration)}</Text>
                        <Text style={styles.progressLabelText}>{formatDuration(totalDuration)}</Text>
                    </View>
                </View>

                {/* music controls */}
                <View style={styles.musicControlsContainer}>
                    <TouchableOpacity onPress={() => handlePrevious()}>
                        <Ionicons name="play-skip-back-outline" size={45} color="#ffffff" />
                    </TouchableOpacity>

                    {isPlaying ? (
                        <TouchableOpacity style={styles.controlButton} onPress={() => pauseSound()}>
                            <Ionicons name="ios-pause-circle" size={80} color="#fff" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.controlButton} onPress={() => playSound()}>
                            <Ionicons name="ios-play-circle" size={80} color="#fff" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => handleNext()}>
                        <Ionicons name="play-skip-forward-outline" size={45} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8896d7'
    },

    maincontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },

    songContent: {
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'center',
        color: '#EEEEEE',

    },

    artwork: {
        width: wp('85%'),
        height: hp('40%'),
        borderRadius: wp('10%'),
        marginBottom: hp('4%'),
        marginTop: hp('8%')
      },  
    
    songTitle: {
        fontSize: wp('7%'),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#EEEEEE'
    },

    songArtist: {
        fontSize:  wp('4%'),
        textAlign: 'center',
        color: '#EEEEEE'
    },

    progressBar: {
        width: wp('85%'),
        height: hp('2%'),
        marginTop: 25,
        flexDirection: 'row'
    },

    progressLevelDuration: {
        width: wp('85%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    progressLabelText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    musicControlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        width: wp('60%'),
        marginTop: hp('5%'),
        marginBottom: ('8%')

    },

});