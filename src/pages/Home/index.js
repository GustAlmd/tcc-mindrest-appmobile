import React from 'react';
import { View, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
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
  return (
    <View style={styles.container}>
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
    height: hp('100%')
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Slide;