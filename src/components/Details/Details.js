import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const API_KEY = '93fd35194ebf341775cf170e1f8c7d0a';

const MovieDetailsScreen = ({ route }) => {
  const { id, type } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`);
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, type]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Details not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{details.title || details.name}</Text>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
          style={styles.posterImage}
          resizeMode="cover"
        />
        <Text style={styles.overview}>{details.overview}</Text>
        <Text>Popularity: {details.popularity} | Release Date: {details.release_date || details.first_air_date}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  posterImage: {
    width: '100%',
    height: 400,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieDetailsScreen;
