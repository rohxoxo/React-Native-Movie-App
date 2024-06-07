import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import MediaItem from '../Details/MediaItem';

const API_KEY = '93fd35194ebf341775cf170e1f8c7d0a';
const ENDPOINTS = {
  'Airing Today': 'airing_today',
  'On The Air': 'on_the_air',
  'Popular': 'popular',
  'Top Rated': 'top_rated',
};

const TVScreen = () => {
  const [tvShows, setTvShows] = useState([]);
  const [category, setCategory] = useState('Airing Today');

  useEffect(() => {
    fetchTvShows();
  }, [category]);

  const fetchTvShows = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${ENDPOINTS[category]}?api_key=${API_KEY}`);
      setTvShows(response.data.results);
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
        data={tvShows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MediaItem item={item} type="tv" />}
      />
    </View>
  );
};

export default TVScreen;
