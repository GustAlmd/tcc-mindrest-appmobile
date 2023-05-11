import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useNavigation } from '@react-navigation/native';
import 'moment/locale/pt-br';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const expressions = [
    { id: 'radiante', symbol: '😀' },
    { id: 'feliz', symbol: '😊' },
    { id: 'normal', symbol: '😐' },
    { id: 'irritado', symbol: '😠' },
    { id: 'triste', symbol: '😥' },
];

const Notepad = () => {
    const navigation = useNavigation();

    const [selectedButton, setSelectedButton] = useState('');

    const handleButtonPress = (emotionId, symbol) => {
        if (emotionId === selectedButton) {
            setSelectedButton('');
        } else {
            setSelectedButton(emotionId);
            navigation.navigate('SelectButtons', { emotionId, symbol });
        }
    };
    const [selectedDate, setSelectedDate] = useState(new Date());
    moment.locale('pt-br');

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
                locale={{
                    name: 'pt-br',
                    config: {
                        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
                        weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
                        weekdays: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_')
                    }
                }}
                selectedDate={selectedDate}
                onDateSelected={(date) => {
                    if (date !== selectedDate) {
                        // Data diferente da atual foi selecionada, não faz nada
                        return;
                    }
                    // Data atual foi selecionada, continua com a lógica
                    // que você deseja executar
                }}
            />

            <View style={styles.buttons}>
                <Text style={styles.textEmoticons}>Como se sente hoje?</Text>
                <View style={styles.emoticons}>
                    {expressions.map(({ id, symbol }) => (
                        <TouchableOpacity
                            key={id}
                            style={[
                                styles.roundButton,
                                selectedButton === id,
                            ]}
                            onPress={() => handleButtonPress(id, symbol)}
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
    buttons: {
        backgroundColor: '#8896d7',
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
    },
    textEmoticons: {
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
        borderWidth: wp('0.2'),
        height: hp('7%'),
        borderRadius: 15,
        backgroundColor: '#556aa9',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.5,
        shadowRadius: 5.65,
        elevation: 9,
        paddingHorizontal: wp('4.5%'),
    },
    buttonText: {
        fontSize: wp('8%'),
    },
});

export default Notepad;
