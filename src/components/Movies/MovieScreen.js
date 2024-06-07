import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import MediaItem from '../Details/MediaItem';

const API_KEY = '93fd35194ebf341775cf170e1f8c7d0a';
const ENDPOINTS = {
  'Now Playing': 'now_playing',
  'Popular': 'popular',
  'Top Rated': 'top_rated',
  'Upcoming': 'upcoming',
};

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('Now Playing');
  const [movieLoading, isMovieLoading] = useState(false);

  useEffect(() => {
    isMovieLoading(true);
    fetchMovies();
    isMovieLoading(false);
  }, [category]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${ENDPOINTS[category]}?api_key=${API_KEY}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        {Object.keys(ENDPOINTS).map((key) => (
          <Picker.Item label={key} value={key} key={key} />
        ))}
      </Picker>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MediaItem item={item} type="movie" />}
      />
    </View>
  );
};

export default MoviesScreen;
