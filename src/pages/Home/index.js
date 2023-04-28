import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const data = [
  { image: '../../assets/Frase.png' },
  { image: '../../assets/Frase2.png' },
  { image: '../../assets/Frase3.png' },
  { image: '../../assets/Frase4.png' },
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
  },
  slideImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
});

export default Slide;