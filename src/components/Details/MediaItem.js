import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MediaItem = ({ item, type }) => {
  const navigation = useNavigation();

  const goToDetails = () => {
    if(type == "multi"){
      navigation.navigate('Details', { id: item.id, type: item.media_type });
    } else {
      navigation.navigate("Details", { id: item.id, type });
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.posterImage}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        <Text>Popularity: {item.popularity} </Text>
        <Text>Release Date: {item.release_date || item.first_air_date}</Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Button title="More Details" color="aqua" onPress={goToDetails} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  posterImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  }, buttonContainer: {
    marginTop: 10,
  },
});

export default MediaItem;
