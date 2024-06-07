import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import MediaItem from '../Details/MediaItem';
import { FontAwesome } from '@expo/vector-icons';

const API_KEY = '93fd35194ebf341775cf170e1f8c7d0a';
const ENDPOINTS = {
  'Movie': 'movie',
  'Multi': 'multi',
  'TV': 'tv',
};

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('Movie');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const search = async () => {
    if (query.trim() === '') { 
      setErrorMessage('Enter Movie/TV name');
      return;
    }
    
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/${ENDPOINTS[searchType]}?api_key=${API_KEY}&query=${query}`);
      setResults(response.data.results);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Search Movie/TV Show Name<Text style={styles.asterisk}>*</Text>
      </Text>
      <View style={[styles.searchContainer, errorMessage ? styles.errorBorder : null]}>
        <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={[styles.input, errorMessage ? styles.errorText : null]}
          placeholder="i.e. James Bond, CSI"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <View style={styles.row}>
        <Picker
          selectedValue={searchType}
          onValueChange={(itemValue) => setSearchType(itemValue)}
          style={styles.picker}
        >
          {Object.keys(ENDPOINTS).map((key) => (
            <Picker.Item label={key} value={key} key={key} />
          ))}
        </Picker>
        <Button title="Search" color="aqua" onPress={search} />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MediaItem item={item} type={searchType.toLowerCase()} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    paddingTop: 16,
    fontSize: 18,
  },
  asterisk: {
    color: 'red',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 8,
  },
  errorBorder: {
    borderColor: 'red',
  },
  searchIcon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  errorText: {
    color: 'red',
  },
  errorMessage: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  picker: {
    flex: 1,
  },
});

export default SearchScreen;
