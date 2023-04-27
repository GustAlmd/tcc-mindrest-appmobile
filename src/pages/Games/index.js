import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function MusicScreen (){
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(null);
    const [position, setPosition] = useState(null);

    const loadSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/automotivo.mp3'));
            setSound(sound);
            const { duration } = await sound.getStatusAsync();
            setDuration(duration);
        } catch (error) {
            console.warn('Failed to load sound', error);
        }
    };

    const playSound = async () => {
        if (sound) {
            await sound.playAsync();
            setIsPlaying(true);
        }
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const unloadSound = async () => {
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
            setIsPlaying(false);
            setDuration(null);
            setPosition(null);
        }
    };

    useEffect(() => {
        loadSound();

        return () => {
            unloadSound();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (sound) {
                const { position } = await sound.getStatusAsync();
                setPosition(position);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [sound]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = Math.floor(seconds % 60);
        const paddedSeconds = remainderSeconds.toString().padStart(2, '0');
        return `${minutes}:${paddedSeconds}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Track Title</Text>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${(position / duration) * 100}%` }]} />
            </View>
            <View style={styles.controls}>
                {isPlaying ? (
                    <TouchableOpacity onPress={pauseSound} style={styles.controlButton}>
                        <Text style={styles.controlButtonText}>Pause</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={playSound} style={styles.controlButton}>
                        <Text style={styles.controlButtonText}>Play</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.time}>{formatTime(position)} / {formatTime(duration)}</Text>
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
        marginBottom: 20,
    },
    progressContainer: {
        height: 5,
        width: '100%',
        backgroundColor: '#ccc',
    },
    progressBar: {
        height: 5,
        backgroundColor: '#333',
    },
    controls: {
        flexDirection: 'row',
        marginTop: 20,
    },
    controlButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    controlButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    playButton: {
        backgroundColor: '#1db954',
    },
    pauseButton: {
        backgroundColor: '#e71d36',
    },
    skipButton: {
        backgroundColor: '#333',
    },
    skipButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

