import React from 'react';
import { View, Image, StyleSheet, Text, Share } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const data = [
  { image: require('../../assets/Frase.png') },
  { image: require('../../assets/Frase2.png') },
  { image: require('../../assets/Frase3.png') },
  { image: require('../../assets/Frase4.png') },
  { image: require('../../assets/Frase5.png') },
  { image: require('../../assets/Frase6.png') },
  { image: require('../../assets/Frase7.png') },
];

const SlideItem = ({ item }) => {
  return (
    <Image
      source={item.image}
      style={styles.slideImage}
    />
  );
};

const Slide = () => {

  const shareImage = async () => {
    try {
      await Share.share({
        message: 'Confira essa imagem incrível!',
        url: data[0].image.uri,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  ''
  return (
    <View style={styles.container}>
      <View
        style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
          MindRest
        </Text>
        <Ionicons name="share-outline"
          onPress={shareImage}
          style={{ fontSize: 25, color: 'white' }}
        />
      </View>
      <Swiper
        showsButtons={false}
        showsPagination={false}
        horizontal={false}
        loop={true}
        autoplay={true}
        autoplayTimeout={3000}
      >
        {data.map((item, index) => (
          <SlideItem key={index} item={item} />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: wp('100%'),
    height: hp('100%'),
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    padding: hp('1%'),
    alignItems: 'center'
  },

  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Slide;