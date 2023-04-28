import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import 'moment/locale/pt-br'; // importa o idioma português
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const expressions = [
    { id: 'feliz', symbol: '😀' },
    { id: 'triste', symbol: '😔' },
    { id: 'irritado', symbol: '😠' },
    { id: 'pensativo', symbol: '🤔' },
];

const Notepad = () => {
    const navigation = useNavigation();

    const [selectedButton, setSelectedButton] = useState('');

    const handleButtonPress = (emotionId) => {
        if (emotionId === selectedButton) {
            setSelectedButton('');
        } else {
            setSelectedButton(emotionId);
            navigation.navigate('Write', { emotionId });
        }
    };

    const [selectedDate, setSelectedDate] = useState(new Date());

    const onSelectDate = (date) => {
        setSelectedDate(date);
    };

    // Configuração do calendário para português
    moment.locale('pt-br');
    const daysInWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const months = moment.months();

    return (
        <View style={styles.container}>
            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
                style={{ height: 100, paddingTop: 10, paddingBottom: 5 }}
                calendarHeaderStyle={{ color: 'white' }}
                calendarColor={'#556aa9'}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white' }}
                highlightDateNumberStyle={{ color: 'yellow' }}
                highlightDateNameStyle={{ color: 'yellow' }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
                iconContainer={{ flex: 0.1 }}
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
                markedDates={[
                    { date: '2023-04-27', dots: [{ color: 'white' }] }
                ]}
                locale={{ name: 'pt', config: { days: daysInWeek, monthsShort: months } }} // definindo o locale em português
            />
            <View style={styles.write}>
                <Text style={styles.textEmoticons}>Como se sente hoje?</Text>
                <View style={styles.emoticons}>
                    {expressions.map(({ id, symbol}) => (
                        <TouchableOpacity
                            key={id}
                            style={[
                                styles.roundButton,
                                selectedButton === id,
                            ]}
                            onPress={() => handleButtonPress(id)}
                        >
                            <Text style={styles.buttonText}>{symbol}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    write:{
        backgroundColor: '#8896d7',
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
    },
    textEmoticons:{
        paddingStart: wp('4%'),
        paddingTop: wp('5%'),
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        color: 'white'
    },
    emoticons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        top: '5%'
    },
    roundButton: {
        borderColor: 'white',
        borderWidth: 1,
        height: 60,
        borderRadius: 80,
        backgroundColor: '#556aa9',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8896d7',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        paddingHorizontal: 24,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default Notepad;
