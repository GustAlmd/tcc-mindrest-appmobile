import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const data = [
  { image: 'https://helloamazinglife.com.br/wp-content/uploads/2019/11/wallpapers-frases-motivadoras-voce-e-incrivel.jpg' },
  { image: 'https://i.pinimg.com/originals/22/4c/de/224cde242fe74949cb6cdaa91108e75e.jpg' },
  { image: 'https://asasdeeuforia.files.wordpress.com/2018/02/ca407a6e37a8921ea497848c00f64232.jpg?w=720' },
  { image: 'https://helloamazinglife.com.br/wp-content/uploads/2020/10/wallpapers-com-frases-positivas-pense-positivo.jpg' },
  { image: 'https://static.vecteezy.com/ti/vetor-gratis/p3/5317919-frase-motivacional-em-traducao-portugues-brasileiro-acorde-todo-dia-com-um-motivo-para-fazer-seu-dia-incrivel-vetor.jpg' },
];

const SlideItem = ({ item }) => {
  return (
    <Image
      source={{ uri: item.image }}
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